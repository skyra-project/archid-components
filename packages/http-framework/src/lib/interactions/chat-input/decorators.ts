import { container } from '@sapphire/pieces';
import type { Command } from '../../structures/Command.js';
import { ChatInputCommandResolver } from './ChatInputCommandResolver.js';

function ensureChatInputCommandResolver(target: typeof Command<Command.Options>): ChatInputCommandResolver {
	return container.applicationCommandRegistry.ensure(target).makeChatInput();
}

/**
 * Registers a command for the chat input.
 *
 * @template Options - The options type for the command.
 * @param data - The command data.
 * @example
 * ```typescript
 * import { Command, RegisterCommand } from '@skyra/http-framework';
 *
 * (at)RegisterCommand({
 * 	name: 'ping',
 * 	description: 'A simple ping pong command'
 * })
 * export class UserCommand extends Command {
 * 	public async run(interaction: Command.ChatInputInteraction) {
 * 		return interaction.reply('Pong!');
 * 	}
 * }
 * ```
 */
export function RegisterCommand<Options extends Command.Options = Command.Options>(data: ChatInputCommandResolver.CommandData) {
	return function decorate(target: typeof Command<Options>) {
		ensureChatInputCommandResolver(target).setCommand(data);
	};
}

/**
 * Registers a subcommand group for a chat input command.
 *
 * @remarks This decorator must be used in conjunction with {@link RegisterSubcommand}.
 * @template Options - The options type for the command.
 * @param data - The subcommand group data.
 * @example
 * ```typescript
 * import { Command, RegisterCommand, RegisterSubcommand, RegisterSubcommandGroup } from '@skyra/http-framework';
 *
 * (at)RegisterCommand({
 * 	name: 'ping',
 * 	description: 'A simple ping pong command'
 * })
 * export class UserCommand extends Command {
 * 	(at)RegisterSubcommandGroup({
 * 		name: 'subcommand-group',
 * 		description: 'A simple subcommand group'
 * 	})
 * 	(at)RegisterSubcommand(
 * 		{ name: 'subcommand', description: 'A simple subcommand' },
 * 		'subcommand-group'
 * 	)
 * 	public async run(interaction: Command.ChatInputInteraction) {
 * 		return interaction.reply('Pong!');
 * 	}
 * }
 * ```
 */
export function RegisterSubcommandGroup<Options extends Command.Options = Command.Options>(data: ChatInputCommandResolver.SubcommandGroupData) {
	return function decorate(target: Command<Options>, method: string) {
		ensureChatInputCommandResolver(target.constructor as typeof Command).addSubcommandGroup(data, method);
	};
}

/**
 * Registers a subcommand for a chat input command.
 *
 * @remarks This decorator must be used in conjunction with {@link RegisterSubcommand}.
 * @param data - The subcommand data.
 * @param subCommandGroupName - Optional name of the subcommand group.
 * @returns A decorator function that adds the subcommand to the target command.
 * @example
 * ```typescript
 * import { Command, RegisterCommand, RegisterSubcommand, RegisterSubcommandGroup } from '@skyra/http-framework';
 *
 * (at)RegisterCommand({
 * 	name: 'ping',
 * 	description: 'A simple ping pong command'
 * })
 * export class UserCommand extends Command {
 * 	(at)RegisterSubcommand({
 * 		name: 'subcommand',
 * 		description: 'A simple subcommand'
 * 	})
 * 	public async run(interaction: Command.ChatInputInteraction) {
 * 		return interaction.reply('Pong!');
 * 	}
 * }
 * ```
 */
export function RegisterSubcommand<Options extends Command.Options = Command.Options>(
	data: ChatInputCommandResolver.SubcommandData,
	subCommandGroupName?: string | null
) {
	return function decorate(target: Command<Options>, method: string) {
		ensureChatInputCommandResolver(target.constructor as typeof Command).addSubcommand(data, method, subCommandGroupName);
	};
}

import type { Command } from '../../structures/Command';
import type { ChatInputCommandResolver } from '../resolvers/ChatInputCommandResolver';
import { ensureChatInputCommandResolver } from './_shared';

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

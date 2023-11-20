import type { Command } from '../../structures/Command';
import type { ChatInputCommandResolver } from '../resolvers/ChatInputCommandResolver';
import { ensureChatInputCommandResolver } from './_shared';

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

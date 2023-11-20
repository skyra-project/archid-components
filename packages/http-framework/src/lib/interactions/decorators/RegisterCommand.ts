import type { Command } from '../../structures/Command';
import type { ChatInputCommandResolver } from '../resolvers/ChatInputCommandResolver';
import { ensureChatInputCommandResolver } from './_shared';

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

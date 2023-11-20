import { Collection } from '@discordjs/collection';
import type { Command } from '../../structures/Command.js';

export const restrictedGuildIdRegistry = new Collection<typeof Command<Command.Options>, readonly string[]>();

/**
 * Decorator that restricts the guild IDs for a command.
 *
 * @param guildIds An array of guild IDs to restrict the command to.
 * @returns A decorator function.
 * @example
 * ```typescript
 * import { Command, RegisterCommand, RestrictGuildIds } from '@skyra/http-framework';
 *
 * (at)RegisterCommand({
 * 	name: 'ping',
 * 	description: 'A simple ping pong command'
 * })
 * (at)RestrictGuildIds(['123456789012345678', '123456789012345679'])
 * export class UserCommand extends Command {
 * 	public async run(interaction: Command.ChatInputInteraction) {
 * 		return interaction.reply('Pong!');
 * 	}
 * }
 * ```
 */
export function RestrictGuildIds<Options extends Command.Options = Command.Options>(guildIds: readonly string[]) {
	return function decorate(target: typeof Command<Options>) {
		restrictedGuildIdRegistry.set(target, guildIds);
	};
}

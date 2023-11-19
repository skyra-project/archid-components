import { Collection } from '@discordjs/collection';
import type { Command } from '../../structures/Command.js';

export const restrictedGuildIdRegistry = new Collection<typeof Command<Command.Options>, readonly string[]>();

export function RestrictGuildIds<Options extends Command.Options = Command.Options>(guildIds: readonly string[]) {
	return function decorate(target: typeof Command<Options>) {
		restrictedGuildIdRegistry.set(target, guildIds);
	};
}

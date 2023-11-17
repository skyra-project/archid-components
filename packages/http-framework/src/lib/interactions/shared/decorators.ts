import { Collection } from '@discordjs/collection';
import type { Command } from '../../structures/Command.js';

export const restrictedGuildIdRegistry = new Collection<typeof Command<Command.Options>, readonly string[]>();

export function RestrictGuildIds(guildIds: readonly string[]) {
	return function decorate(target: typeof Command) {
		restrictedGuildIdRegistry.set(target, guildIds);
	};
}

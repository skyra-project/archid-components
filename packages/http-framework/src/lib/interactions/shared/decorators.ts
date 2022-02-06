import { Collection } from '@discordjs/collection';
import type { Command } from '../../structures/Command';

export const restrictedGuildIdRegistry = new Collection<typeof Command, readonly [string, ...string[]]>();

export function RestrictGuildIds(guildIds: readonly [string, ...string[]]) {
	return function decorate(target: typeof Command) {
		restrictedGuildIdRegistry.set(target, guildIds);
	};
}

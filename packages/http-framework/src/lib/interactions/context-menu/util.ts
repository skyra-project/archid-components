import type { ContextMenuOptions } from './shared';

export function makeContextMenuCommand<T extends ContextMenuOptions>(data: T): T {
	return { ...data };
}

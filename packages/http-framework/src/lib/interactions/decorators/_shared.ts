import { container } from '@sapphire/pieces';
import type { Command } from '../../structures/Command.js';
import type { ChatInputCommandResolver } from '../resolvers/ChatInputCommandResolver';
import type { ContextMenuCommandResolver } from '../resolvers/ContextMenuCommandResolver.js';

export function ensureChatInputCommandResolver<Options extends Command.Options>(target: typeof Command<Options>): ChatInputCommandResolver {
	return container.applicationCommandRegistry.ensure(target).makeChatInput();
}

export function ensureContextMenuCommandResolver<Options extends Command.Options>(target: typeof Command<Options>): ContextMenuCommandResolver {
	return container.applicationCommandRegistry.ensure(target).makeContextMenu();
}

import { LoaderStrategy } from '@sapphire/pieces';
import type { Command } from './Command.js';
import type { CommandStore } from './CommandStore.js';

/**
 * Represents a strategy for loading and unloading commands.
 *
 * @since 2.0.0
 */
export class CommandLoaderStrategy extends LoaderStrategy<Command> {
	/**
	 * Called when a command is loaded.
	 *
	 * @since 2.0.0
	 * @param store - The command store.
	 * @param piece - The command being loaded.
	 * @returns The loaded command.
	 */
	public override onLoad(store: CommandStore, piece: Command) {
		if (piece.router.chatInputName) {
			store.router.addChatInputMapping(piece.router.chatInputName, piece);
		}

		for (const name of piece.router.contextMenuNames) {
			store.router.addContextMenuMapping(name, piece);
		}

		return piece;
	}

	/**
	 * Called when a command is unloaded.
	 *
	 * @since 2.0.0
	 * @param store - The command store.
	 * @param piece - The command being unloaded.
	 * @returns The unloaded command.
	 */
	public override onUnload(store: CommandStore, piece: Command) {
		if (piece.router.chatInputName) {
			store.router.removeChatInputMapping(piece.router.chatInputName);
		}

		for (const name of piece.router.contextMenuNames) {
			store.router.removeContextMenuMapping(name);
		}

		return piece;
	}
}

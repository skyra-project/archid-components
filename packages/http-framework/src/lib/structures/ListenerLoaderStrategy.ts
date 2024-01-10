// Copyright © 2020 - The Sapphire Community and its contributors | MIT
// Source: https://github.com/sapphiredev/framework/blob/e9a7966f0bad532deb1a7da617b57db902ae06a6/src/lib/structures/ListenerLoaderStrategy.ts

import { LoaderStrategy } from '@sapphire/pieces';
import type { Listener } from './Listener.js';
import type { ListenerStore } from './ListenerStore.js';

/**
 * Represents a strategy for loading and unloading listeners.
 *
 * @since 2.1.0
 */
export class ListenerLoaderStrategy extends LoaderStrategy<Listener> {
	/**
	 * Called when a listener is loaded.
	 *
	 * @since 2.1.0
	 * @param store - The listener store.
	 * @param piece - The listener being loaded.
	 * @returns The loaded listener.
	 */
	public override onLoad(_store: ListenerStore, piece: Listener) {
		const emitter = piece.emitter!;

		// Increment the maximum amount of listeners by one:
		const maxListeners = emitter.getMaxListeners();
		if (maxListeners !== 0) emitter.setMaxListeners(maxListeners + 1);

		// eslint-disable-next-line @typescript-eslint/dot-notation
		emitter.on(piece.event, piece['_listener']);
	}

	/**
	 * Called when a listener is unloaded.
	 *
	 * @since 2.1.0
	 * @param store - The listener store.
	 * @param piece - The listener being unloaded.
	 * @returns The unloaded listener.
	 */
	public override onUnload(_store: ListenerStore, piece: Listener) {
		const emitter = piece.emitter!;

		// Increment the maximum amount of listeners by one:
		const maxListeners = emitter.getMaxListeners();
		if (maxListeners !== 0) emitter.setMaxListeners(maxListeners - 1);

		// eslint-disable-next-line @typescript-eslint/dot-notation
		emitter.off(piece.event, piece['_listener']);
	}
}

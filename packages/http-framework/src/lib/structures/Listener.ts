// Copyright © 2020 - The Sapphire Community and its contributors | MIT
// Source: https://github.com/sapphiredev/framework/blob/effcede3c54e0f0335369137a9b76060729df32c/src/lib/structures/Listener.ts

import { Piece, type Container } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';

export abstract class Listener<Options extends Listener.Options = Listener.Options> extends Piece<Options, 'listeners'> {
	public emitter: Listener.Emitter;
	public event: string;
	protected _listener: (...args: readonly any[]) => unknown;

	public constructor(context: Listener.LoaderContext, options: Options) {
		super(context, options);

		this.emitter = typeof options.emitter === 'string' ? this.container[options.emitter] : options.emitter ?? this.container.client;
		this.event = options.event ?? this.name;
		this._listener = this.run.bind(this);
	}

	public abstract run(...args: readonly any[]): Awaitable<unknown>;
}

export namespace Listener {
	/** @deprecated Use {@linkcode LoaderContext} instead. */
	export type Context = LoaderContext;
	export type LoaderContext = Piece.LoaderContext<'listeners'>;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
	export interface Options extends Piece.Options {
		emitter: Emitter | { [K in keyof Container]: Container[K] extends Emitter ? K : never }[keyof Container];
		event?: string;
	}

	export interface Emitter {
		on(eventName: string, listener: (...args: any[]) => void): this;
		once(eventName: string, listener: (...args: any[]) => void): this;
		off(eventName: string, listener: (...args: any[]) => void): this;
		setMaxListeners(n: number): this;
		getMaxListeners(): number;
		emit(eventName: string, ...args: any[]): boolean;
	}
}

// Copyright © 2020 - The Sapphire Community and its contributors | MIT
// Source: https://github.com/sapphiredev/framework/blob/effcede3c54e0f0335369137a9b76060729df32c/src/lib/structures/Listener.ts

import { Piece, type Container } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';

export abstract class Listener extends Piece<Listener.Options> {
	public emitter: Listener.Emitter;
	public event: string;
	private _listener: (...args: readonly any[]) => unknown;

	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, options);

		this.emitter = typeof options.emitter === 'string' ? this.container[options.emitter] : options.emitter ?? 'client';
		this.event = options.event ?? this.name;
		this._listener = this.run.bind(this);
	}

	public abstract run(...args: readonly any[]): Awaitable<unknown>;

	public override onLoad() {
		const count = this.emitter.getMaxListeners();
		if (count !== 0) this.emitter.setMaxListeners(count + 1);

		this.emitter.on(this.event, this._listener);
		return super.onLoad();
	}

	public override onUnload() {
		const count = this.emitter.getMaxListeners();
		if (count !== 0) this.emitter.setMaxListeners(count - 1);

		this.emitter.off(this.event, this._listener);
		return super.onUnload();
	}
}

export namespace Listener {
	export interface Options extends Piece.Options {
		emitter: Emitter | { [K in keyof Container]: Container[K] extends Emitter ? K : never }[keyof Container];
		event?: string;
	}
	export type Context = Piece.Context;

	export interface Emitter {
		on(eventName: string, listener: (...args: any[]) => void): this;
		once(eventName: string, listener: (...args: any[]) => void): this;
		off(eventName: string, listener: (...args: any[]) => void): this;
		setMaxListeners(n: number): this;
		getMaxListeners(): number;
		emit(eventName: string, ...args: any[]): boolean;
	}
}

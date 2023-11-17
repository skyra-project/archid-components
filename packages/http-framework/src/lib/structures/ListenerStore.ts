// Copyright © 2020 - The Sapphire Community and its contributors | MIT
// Source: https://github.com/sapphiredev/framework/blob/effcede3c54e0f0335369137a9b76060729df32c/src/lib/structures/ListenerStore.ts

import { Store } from '@sapphire/pieces';
import { Listener } from './Listener.js';

export class ListenerStore extends Store<Listener, 'listeners'> {
	public constructor() {
		super(Listener, { name: 'listeners' });
	}
}

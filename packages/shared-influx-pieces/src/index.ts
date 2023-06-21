// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

import { container } from '@skyra/http-framework';
import { Client } from '@skyra/influx-utilities';

export function isInfluxInitialized() {
	return container.analytics ? true : false;
}

export function initializeInflux(options: Client.Options = {}) {
	if (!process.env.INFLUX_URL) return;

	container.analytics = new Client(options);
}

declare module '@sapphire/pieces' {
	export interface Container {
		analytics?: Client;
	}
}

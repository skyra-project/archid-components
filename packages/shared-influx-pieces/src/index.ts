// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

import type { BooleanString } from '@skyra/env-utilities';
import { container } from '@skyra/http-framework';
import { Client } from '@skyra/influx-utilities';

let interactionCount: number;

export function isInfluxInitialized() {
	return container.analytics ? true : false;
}

export function initializeInflux(options: Client.Options = {}) {
	if (!process.env.INFLUX_URL) return;

	container.analytics = new Client(options);
}

export const getInteractionCount = () => interactionCount;
export const setInteractionCount = (count: number) => (interactionCount = count);
export const incrementInteractionCount = () => interactionCount++;

declare module '@sapphire/pieces' {
	export interface Container {
		analytics?: Client;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		CLIENT_ID: string;
		DISCORD_TOKEN: string;
		INFLUX_ENABLED: BooleanString;
	}
}

declare module '@skyra/http-framework' {
	interface ClientEvents {
		analyticsSync: [guild: number];
		resourceAnalyticsSync: [];
	}
}

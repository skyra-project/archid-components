import { envParseBoolean, envParseString, type BooleanString } from '@skyra/env-utilities';
import { container } from '@skyra/http-framework';
import { Client, type ConnectionOptions } from '@skyra/influx-utilities';

let interactionCount: number;
let initialized = false;

export function isInfluxInitialized() {
	return initialized;
}

export function initializeInflux(options: ConnectionOptions = {}) {
	if (!envParseBoolean('INFLUX_ENABLED', true) || !envParseString('INFLUX_URL')) return;
	container.analytics = new Client(options);
	initialized = true;
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

import { envParseBoolean, envParseString, type BooleanString } from '@skyra/env-utilities';
import { container } from '@skyra/http-framework';
import { Client } from '@skyra/influx-utilities';

let interactionCount: number;
let initialized = false;

export function isInfluxInitialized() {
	return initialized;
}

export function initializeInflux() {
	if (!envParseBoolean('INFLUX_ENABLED', true) || !envParseString('INFLUX_TOKEN')) return;

	container.analytics = new Client({
		url: 'https://influx.skyra.pw',
		org: 'Skyra-Project',
		writeBucket: envParseString('INFLUX_BUCKET', process.env.CLIENT_NAME)
	});
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
		CLIENT_NAME: string;
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

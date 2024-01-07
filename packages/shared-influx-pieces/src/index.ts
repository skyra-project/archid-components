import { envIsNullish, envParseString, type BooleanString } from '@skyra/env-utilities';
import { container } from '@skyra/http-framework';
import { Client, areInfluxCredentialsSet, getInfluxConnectionOptions } from '@skyra/influx-utilities';

let interactionCount: number;
let initialized = false;

export function isInfluxInitialized() {
	return initialized;
}

export function initializeInflux() {
	if (envIsNullish('INFLUX_ENABLED') || !areInfluxCredentialsSet()) return;

	container.analytics = new Client({
		...getInfluxConnectionOptions(),
		writeBucket: envParseString('INFLUX_BUCKET', process.env.CLIENT_NAME)
	});

	initialized = true;
}

export const getInteractionCount = () => interactionCount;
export const setInteractionCount = (count: number) => (interactionCount = count);
export const incrementInteractionCount = () => interactionCount++;

export { getAnalyticsSyncInterval, getResourceAnalyticsSyncInterval, stopIntervals } from './lib/utils/schedule.js';

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

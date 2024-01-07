import { envIsNullish, type BooleanString } from '@skyra/env-utilities';
import { container } from '@skyra/http-framework';
import { Client, areInfluxCredentialsSet, getInfluxConnectionOptions } from '@skyra/influx-utilities';

let interactionCount: number;
let initialized = false;

export function isInfluxInitialized() {
	return initialized;
}

export function initializeInflux() {
	if (envIsNullish('INFLUX_ENABLED') || !areInfluxCredentialsSet()) return;

	container.analytics = new Client(getInfluxConnectionOptions());

	initialized = true;
}

export const getInteractionCount = () => interactionCount;
export const setInteractionCount = (count: number) => (interactionCount = count);
export const incrementInteractionCount = () => interactionCount++;

export { getAnalyticsSyncInterval, getResourceAnalyticsSyncInterval, destroyIntervals } from './lib/schedule.js';

declare module '@sapphire/pieces' {
	export interface Container {
		analytics?: Client;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		INFLUX_ENABLED: BooleanString;
	}
}

declare module '@skyra/http-framework' {
	interface ClientEvents {
		analyticsSync: [guild: number];
		resourceAnalyticsSync: [];
	}
}

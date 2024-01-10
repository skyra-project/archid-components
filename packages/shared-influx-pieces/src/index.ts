import { type BooleanString } from '@skyra/env-utilities';
import type { InfluxClient } from './lib/structures/InfluxClient.js';

export { InfluxListener } from './lib/structures/InfluxListener.js';
export { initializeInflux, isInfluxInitialized } from './lib/functions.js';

declare module '@sapphire/pieces' {
	export interface Container {
		analytics?: InfluxClient;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		INFLUX_ENABLED: BooleanString;
	}
}

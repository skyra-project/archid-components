import { type BooleanString } from '@skyra/env-utilities';
import type { InfluxClient } from './lib/InfluxClient.js';

export { InfluxClient } from './lib/InfluxClient.js';
export { initializeInflux, isInfluxInitialized } from './lib/functions.js';
export { InfluxListener } from './lib/structures/InfluxListener.js';
export { loadInfluxListeners } from './listeners/_load.js';

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

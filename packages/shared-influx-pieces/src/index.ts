import type { BooleanString } from '@skyra/env-utilities';
import type { InfluxClient } from './lib/InfluxClient.js';

export * from './lib/InfluxClient.js';
export * from './lib/structures/InfluxListener.js';
export * from './lib/util/functions.js';
export * from './listeners/_load.js';

declare module '@sapphire/pieces' {
	export interface Container {
		influx?: InfluxClient;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		INFLUX_ENABLED: BooleanString;
	}
}

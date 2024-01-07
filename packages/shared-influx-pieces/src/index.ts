import { type BooleanString } from '@skyra/env-utilities';
import { Client } from '@skyra/influx-utilities';

export { InfluxListener } from './lib/InfluxListener.js';
export { initializeInflux, getInteractionCount, setInteractionCount, incrementInteractionCount } from './lib/functions.js';

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

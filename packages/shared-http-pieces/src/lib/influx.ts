import { container } from '@skyra/http-framework';
import { Client } from '@skyra/influx-utilities';

export function isInfluxInitialized() {
	return [container.analytics, container.analytics?.writeApi, container.analytics?.queryApi].every(Boolean);
}

export function initializeInflux(options: Client.Options = {}) {
	if (!process.env.INFLUX_URL) return;

	const influx = new Client(options);

	if (!influx.writeApi || !influx.queryApi) return;

	container.analytics = influx;
}

declare module '@sapphire/pieces' {
	export interface Container {
		analytics?: Client;
	}
}

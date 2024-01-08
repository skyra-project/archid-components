import { envParseBoolean } from '@skyra/env-utilities';
import { container } from '@skyra/http-framework';
import { Client, areInfluxCredentialsSet, getInfluxConnectionOptions } from '@skyra/influx-utilities';

export function isInfluxInitialized() {
	return container.analytics && envParseBoolean('INFLUX_ENABLED', true);
}

export function initializeInflux() {
	if (!envParseBoolean('INFLUX_ENABLED', true) || !areInfluxCredentialsSet()) return;

	container.analytics = new Client(getInfluxConnectionOptions());
}

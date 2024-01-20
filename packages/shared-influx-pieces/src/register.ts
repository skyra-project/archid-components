import { envParseBoolean } from '@skyra/env-utilities';
import { container } from '@skyra/http-framework';
import { areInfluxCredentialsSet } from '@skyra/influx-utilities';
import { InfluxClient } from './index.js';

if (envParseBoolean('INFLUX_ENABLED', true) && areInfluxCredentialsSet()) {
	container.influx = new InfluxClient();
}

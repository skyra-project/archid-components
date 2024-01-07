export type { InfluxDB, Point, QueryApi, WriteApi, WritePrecisionType } from '@influxdata/influxdb-client';
export * from './lib/Client.js';
export { type ConnectionOptions } from './lib/types.js';
export { areInfluxCredentialsSet, getInfluxConnectionOptions, setInfluxVariables } from './lib/variables.js';

declare module '@skyra/env-utilities' {
	interface Env {
		INFLUX_URL?: string;
		INFLUX_ORG?: string;
		INFLUX_TOKEN?: string;
		INFLUX_BUCKET?: string;
	}
}

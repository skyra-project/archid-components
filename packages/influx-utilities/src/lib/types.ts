import type { ClientOptions, WritePrecisionType } from '@influxdata/influxdb-client';

export interface ConnectionOptions extends Partial<ClientOptions> {
	/**
	 * The URL to connect to.
	 * @default process.env.INFLUX_ORG
	 */
	org?: string;

	/**
	 * The bucket to write to.
	 * @default process.env.INFLUX_BUCKET
	 */
	writeBucket?: string;

	/**
	 * The precision of the timestamp.
	 * @default 's'
	 */
	writePrecision?: WritePrecisionType;
}

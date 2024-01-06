import type { ClientOptions, WritePrecisionType } from '@influxdata/influxdb-client';

export interface ConnectionOptions extends Partial<ClientOptions> {
	org: string;
	writeBucket: string;
	writePrecision: WritePrecisionType;
}

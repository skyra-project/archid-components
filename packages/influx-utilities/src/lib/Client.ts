import { InfluxDB, type Point, type QueryApi, type WriteApi } from '@influxdata/influxdb-client';
import { envParseString } from '@skyra/env-utilities';
import type { ConnectionOptions } from './types';

export class Client {
	public readonly influx: InfluxDB;
	public readonly queryApi: QueryApi;
	public readonly writeApi: WriteApi;

	private readonly injectedTags: [name: string, value: string][] = [];

	public constructor(options: ConnectionOptions) {
		const url = envParseString('INFLUX_URL', options.url);
		const token = envParseString('INFLUX_TOKEN', options.token);
		const bucket = envParseString('INFLUX_BUCKET', options.writeBucket);
		const org = envParseString('INFLUX_ORG', options.org);

		this.influx = new InfluxDB({ url, token, ...options });
		this.queryApi = this.influx.getQueryApi(org);
		this.writeApi = this.influx.getWriteApi(org, bucket, options.writePrecision ?? 's');
	}

	/**
	 * Adds a tag that will be injected in all points.
	 * @param name The name of the tag to inject.
	 * @param value The value of the tag to inject.
	 */
	public addInjectTag(name: string, value: string) {
		this.injectedTags.push([name, value]);
	}

	/**
	 * Writes a point into the write buffer.
	 * @param point The point to write.
	 */
	public writePoint(point: Point) {
		this.writeApi.writePoint(this.inject(point));
	}

	/**
	 * Writes multiple points into the write buffer.
	 * @param points The points to write.
	 */
	public writePoints(points: readonly Point[]) {
		this.writeApi.writePoints(points.map((point) => this.inject(point)));
	}

	/**
	 * Flushes the pending writes to the server.
	 * @param withRetryBuffer Whether or not it should flush the scheduled retries
	 */
	public async flush(withRetryBuffer?: boolean) {
		await this.writeApi.flush(withRetryBuffer);
	}

	private inject(point: Point) {
		for (const [name, value] of this.injectedTags) {
			point.tag(name, value);
		}

		return point;
	}
}

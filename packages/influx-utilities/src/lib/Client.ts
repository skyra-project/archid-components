import { InfluxDB, type Point, type QueryApi, type WriteApi } from '@influxdata/influxdb-client';
import type { ConnectionOptions } from './types';
import { getRequiredBucket, getRequiredOrg, getRequiredToken, getRequiredUrl } from './variables';

export class Client {
	public readonly influx: InfluxDB;
	public readonly queryApi: QueryApi;
	public readonly writeApi: WriteApi;

	private readonly injectedTags: [name: string, value: string][] = [];

	public constructor(options: ConnectionOptions) {
		const url = options.url ?? getRequiredUrl();
		const token = options.token ?? getRequiredToken();
		const bucket = options.writeBucket ?? getRequiredBucket();
		const org = options.org ?? getRequiredOrg();

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

import type { Point } from '@influxdata/influxdb-client';
import { envParseBoolean, envParseString } from '@skyra/env-utilities';
import { Listener, type PieceContext } from '@skyra/http-framework';
import { Tags } from './AnalyticsSchema.js';

export abstract class AnalyticsListener extends Listener {
	public tags: [Tags, string][] = [];

	public constructor(context: PieceContext, options: AnalyticsListener.Options) {
		super(context, { ...options, enabled: envParseBoolean('INFLUX_ENABLED') });
	}

	public override onLoad() {
		void this.initTags();
		return super.onLoad();
	}

	public writePoint(point: Point) {
		return this.container.analytics!.writeApi.writePoint(this.injectTags(point));
	}

	public writePoints(points: Point[]) {
		points = points.map((point) => this.injectTags(point));
		return this.container.analytics!.writeApi.writePoints(points);
	}

	public flush() {
		return this.container.analytics!.writeApi.flush();
	}

	protected injectTags(point: Point) {
		for (const tag of this.tags) {
			point.tag(tag[0], tag[1]);
		}
		return point;
	}

	protected initTags() {
		this.tags.push(
			[Tags.Client, envParseString('CLIENT_ID', Buffer.from(envParseString('DISCORD_TOKEN').split('.')[0], 'base64').toString())],
			[Tags.OriginEvent, this.event]
		);
	}
}

export namespace AnalyticsListener {
	export type Options = Omit<Listener.Options, 'enabled'>;
}

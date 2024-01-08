import type { Point } from '@influxdata/influxdb-client';
import { Listener, container } from '@skyra/http-framework';
import { Tags } from './enum.js';
import { isInfluxInitialized } from './functions.js';

export abstract class InfluxListener extends Listener {
	public tags: [Tags, string][] = [];

	public constructor(context: Listener.LoaderContext, options: InfluxListener.Options) {
		super(context, { enabled: isInfluxInitialized(), ...options });
	}

	public override onLoad() {
		this.initTags();
		return super.onLoad();
	}

	public writePoint(point: Point) {
		return this.container.analytics!.writeApi.writePoint(this.injectTags(point));
	}

	public writePoints(points: readonly Point[]) {
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
		this.tags.push([Tags.Client, container.client.id]);
		this.tags.push([Tags.OriginEvent, this.event]);
	}
}

export namespace InfluxListener {
	export type Options = Listener.Options;
	export type LoaderContext = Listener.LoaderContext;
	export type JSON = Listener.JSON;
	export type LocationJSON = Listener.LocationJSON;
}

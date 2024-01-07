import type { Point } from '@influxdata/influxdb-client';
import { Listener } from '@skyra/http-framework';
import { isInfluxInitialized } from '../index.js';
import { getClientId } from './api.js';
import { Tags } from './enum.js';

export abstract class InfluxListener extends Listener {
	public tags: [Tags, string][] = [];

	public constructor(context: Listener.LoaderContext, options: InfluxListener.Options) {
		super(context, { enabled: isInfluxInitialized(), ...options });
	}

	public override async onLoad() {
		await this.initTags();
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

	protected async initTags() {
		const clientID = await getClientId();
		if (clientID) this.tags.push([Tags.Client, clientID]);
		this.tags.push([Tags.OriginEvent, this.event]);
	}
}

export namespace InfluxListener {
	export type Options = Listener.Options;
	export type LoaderContext = Listener.LoaderContext;
}

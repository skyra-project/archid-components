import { container } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { getApproximateGuildCount } from '../lib/api.js';
import { Actions, Points, Tags } from '../lib/enum.js';
import { InfluxListener } from '../lib/structures/InfluxListener.js';

const Minute = 60_000;

export class SharedListener extends InfluxListener {
	public interval: NodeJS.Timeout | null = null;

	public run(guilds: number) {
		this.writeGuildCountPoint(guilds);
		this.writeInteractionCountPoint();
		void this.flush();
	}

	public override onLoad() {
		this.interval = setInterval(() => void this.onIntervalTick(), Minute * 10);
		return super.onLoad();
	}

	public override onUnload() {
		clearInterval(this.interval!);
		return super.onUnload();
	}

	private async onIntervalTick() {
		if (!this.enabled) return;

		const guilds = await getApproximateGuildCount();
		if (guilds) this.run(guilds);
	}

	private writeGuildCountPoint(value: number) {
		const point = new Point(Points.ApproximateGuilds) //
			.tag(Tags.Action, Actions.Sync)
			.intField('value', value);

		this.writePoint(point);
	}

	private writeInteractionCountPoint() {
		const value = container.analytics!.interactionCount;
		container.analytics!.interactionCount = 0;

		const point = new Point(Points.InteractionCount) //
			.tag(Tags.Action, Actions.Sync)
			.intField('value', value);

		this.writePoint(point);
	}
}

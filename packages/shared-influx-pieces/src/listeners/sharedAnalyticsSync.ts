import { container } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { InteractionType } from 'discord-api-types/v10';
import { getApproximateGuildCount } from '../lib/api.js';
import { Actions, Points, Tags } from '../lib/enum.js';
import { InfluxListener } from '../lib/structures/InfluxListener.js';
import type { InteractionCounts } from 'lib/InfluxClient.js';

const Minute = 60_000;

export class SharedListener extends InfluxListener {
	public interval: NodeJS.Timeout | null = null;

	private readonly InteractionTypes: readonly (keyof InteractionCounts)[] = [InteractionType.MessageComponent, InteractionType.ModalSubmit];

	public run(guilds: number) {
		this.writeGuildCountPoint(guilds);
		this.writeInteractionCountPoints();
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

	private writeInteractionCountPoints() {
		const counts = container.analytics!.interactionCounts;
		const points = this.InteractionTypes.map((type) => {
			const point = new Point(Points.InteractionCount) //
				.tag(Tags.Action, Actions.Sync)
				.tag(Tags.InteractionType, InteractionType[type])
				.intField('value', counts[type]);

			// Reset back to 0
			counts[type] = 0;

			return point;
		});

		this.writePoints(points);
	}
}

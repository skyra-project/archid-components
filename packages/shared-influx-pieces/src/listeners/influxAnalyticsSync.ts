import { Point } from '@skyra/influx-utilities';
import { getInteractionCount, setInteractionCount } from 'index.js';
import { AnalyticsListener } from 'lib/AnalyticsListener.js';
import { Actions, Points, Tags } from 'lib/AnalyticsSchema.js';

export class UserAnalyticsEvent extends AnalyticsListener {
	public run(guilds: number) {
		this.writeGuildCountPoint(guilds);
		this.writeInteractionCountPoint();
		this.flush();
	}

	private writeGuildCountPoint(value: number) {
		const point = new Point(Points.ApproximateGuilds) //
			.tag(Tags.Action, Actions.Sync)
			.intField('value', value);

		this.writePoint(point);
	}

	private writeInteractionCountPoint() {
		const value = getInteractionCount();
		setInteractionCount(0);

		const point = new Point(Points.InteractionCount) //
			.tag(Tags.Action, Actions.Sync)
			.intField('value', value);

		this.writePoint(point);
	}
}

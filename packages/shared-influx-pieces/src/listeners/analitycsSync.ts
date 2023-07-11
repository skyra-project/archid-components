import type { PieceContext } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { getInteractionCount, setInteractionCount } from 'index.js';
import { AnalyticsListener } from 'lib/AnalyticsListener.js';
import { Actions, Points, Tags } from 'lib/AnalyticsSchema.js';

export class UserAnalyticsEvent extends AnalyticsListener {
	public constructor(context: PieceContext, options: AnalyticsListener.Options) {
		super(context, { ...options, event: 'analyticsSync' });
	}

	public run(guilds: number) {
		this.writePoints([this.syncGuilds(guilds), this.syncInteractionCount()]);

		return this.flush();
	}

	private syncGuilds(value: number) {
		return new Point(Points.ApproximateGuilds) //
			.tag(Tags.Action, Actions.Sync)
			.intField('value', value);
	}

	private syncInteractionCount() {
		const value = getInteractionCount();
		setInteractionCount(0);

		return new Point(Points.InteractionCount) //
			.tag(Tags.Action, Actions.Sync)
			.intField('value', value);
	}
}

import { container, type ClientEvents } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { getInteractionCount, setInteractionCount } from '..';
import { AnalyticsListener } from '../lib/AnalyticsListener';
import { Actions, Points, Tags } from '../lib/AnalyticsSchema';

export class SharedListener extends AnalyticsListener {
	public constructor(context: AnalyticsListener.LoaderContext, options: AnalyticsListener.Options) {
		super(context, { ...options, event: 'analyticsSync' satisfies keyof ClientEvents });
	}

	public run(guilds: number) {
		this.writeGuildCountPoint(guilds);
		this.writeInteractionCountPoint();
		void this.flush();
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

void container.stores.loadPiece({ name: 'SharedAnalyticsSync', piece: SharedListener, store: 'listeners' });

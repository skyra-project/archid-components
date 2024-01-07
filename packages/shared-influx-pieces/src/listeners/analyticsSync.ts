import { container } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { getInteractionCount, setInteractionCount } from '../index';
import { InfluxListener } from '../lib/InfluxListener';
import { Actions, Points, Tags } from '../lib/enum';

export class SharedListener extends InfluxListener {
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

void container.stores.loadPiece({ name: 'influxAnalyticsSync', piece: SharedListener, store: 'listeners' });

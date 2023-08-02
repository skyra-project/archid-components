import { Point } from '@skyra/influx-utilities';
import { Piece, type ClientEventCommandContext } from '@skyra/http-framework';
import { AnalyticsListener } from 'lib/AnalyticsListener.js';
import { Points, Tags, Actions } from 'lib/AnalyticsSchema.js';

export class UserAnalyticsEvent extends AnalyticsListener {
	public constructor(context: Piece.Context, options: AnalyticsListener.Options) {
		super(context, { ...options, event: 'commandSuccess' });
	}

	public run({ command }: ClientEventCommandContext) {
		const point = new Point(Points.Commands) //
			.tag(Tags.Action, Actions.Addition)
			.intField(command.name, 1);

		this.writePoint(point);
	}
}

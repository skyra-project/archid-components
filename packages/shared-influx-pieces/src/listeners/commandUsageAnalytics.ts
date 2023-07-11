import { Point } from '@skyra/influx-utilities';
import { Piece, type ClientEvents, type ClientEventCommandContext } from '@skyra/http-framework';
import { AnalyticsListener } from 'lib/AnalyticsListener.js';
import { Points, Tags, Actions } from 'lib/AnalyticsSchema.js';

export class UserAnalyticsEvent extends AnalyticsListener {
	public constructor(context: Piece.Context, options: AnalyticsListener.Options) {
		super(context, { ...options, event: 'commandSuccess' satisfies keyof ClientEvents });
	}

	public run({ command: { name: commandName } }: ClientEventCommandContext) {
		const command = new Point(Points.Commands) //
			.tag(Tags.Action, Actions.Addition)
			.intField(commandName, 1);

		return this.writePoint(command);
	}
}

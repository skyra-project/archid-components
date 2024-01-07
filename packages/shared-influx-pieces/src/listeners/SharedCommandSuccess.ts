import { container, type ClientEventCommandContext, type ClientEvents } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { AnalyticsListener } from '../lib/AnalyticsListener';
import { Actions, Points, Tags } from '../lib/AnalyticsSchema';

export class SharedListener extends AnalyticsListener {
	public constructor(context: AnalyticsListener.LoaderContext, options: AnalyticsListener.Options) {
		super(context, { ...options, event: 'commandSuccess' satisfies keyof ClientEvents });
	}

	public run({ command }: ClientEventCommandContext) {
		const point = new Point(Points.Commands) //
			.tag(Tags.Action, Actions.Addition)
			.intField(command.name, 1);

		this.writePoint(point);
	}
}

void container.stores.loadPiece({ name: 'SharedCommandSuccess', piece: SharedListener, store: 'listeners' });

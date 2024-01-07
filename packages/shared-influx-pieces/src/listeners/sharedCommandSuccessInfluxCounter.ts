import { container, type ClientEventCommandContext } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { InfluxListener } from '../lib/InfluxListener';
import { Actions, Points, Tags } from '../lib/enum';

export class SharedListener extends InfluxListener {
	public constructor(context: InfluxListener.LoaderContext, options: InfluxListener.Options) {
		super(context, { ...options, event: 'commandSuccess' });
	}

	public run({ command }: ClientEventCommandContext) {
		const point = new Point(Points.Commands) //
			.tag(Tags.Action, Actions.Addition)
			.intField(command.name, 1);

		this.writePoint(point);
	}
}

void container.stores.loadPiece({ name: 'sharedCommandSuccessInfluxCounter', piece: SharedListener, store: 'listeners' });

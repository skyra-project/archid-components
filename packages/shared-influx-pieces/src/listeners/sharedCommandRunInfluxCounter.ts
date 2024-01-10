import { type ClientEventCommandContext } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { Actions, Points, Tags } from '../lib/enum.js';
import { InfluxListener } from '../lib/structures/InfluxListener.js';

export class SharedListener extends InfluxListener {
	public constructor(context: InfluxListener.LoaderContext, options: InfluxListener.Options) {
		super(context, { ...options, event: 'commandRun' });
	}

	public run({ command }: ClientEventCommandContext) {
		const point = new Point(Points.Commands) //
			.tag(Tags.Action, Actions.Addition)
			.intField(command.name, 1);

		this.writePoint(point);
	}
}

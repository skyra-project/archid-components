import { container } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { cpus } from 'os';
import { AnalyticsListener } from '../lib/AnalyticsListener';
import { Actions, Points, Tags } from '../lib/AnalyticsSchema';

export class SharedListener extends AnalyticsListener {
	public constructor(context: AnalyticsListener.LoaderContext, options: AnalyticsListener.Options) {
		super(context, { ...options, event: 'resourceAnalyticsSync' });
	}

	public run() {
		this.writeCoreUsagePoint();
		this.writeMemoryUsagePoint();
		void this.flush();
	}

	private writeCoreUsagePoint() {
		const point = new Point(Points.PerCoreCPULoad) //
			.tag(Tags.Action, Actions.Sync);

		for (const [index, { times }] of cpus().entries()) {
			point.floatField(`cpu_${index}`, (times.user + times.nice + times.sys + times.irq) / times.idle);
		}

		this.writePoint(point);
	}

	private writeMemoryUsagePoint() {
		const usage = process.memoryUsage();
		const point = new Point(Points.Memory) //
			.tag(Tags.Action, Actions.Sync)
			.floatField('total', usage.heapTotal)
			.floatField('used', usage.heapUsed);

		this.writePoint(point);
	}
}

void container.stores.loadPiece({ name: 'SharedResourceAnalyticsSync', piece: SharedListener, store: 'listeners' });

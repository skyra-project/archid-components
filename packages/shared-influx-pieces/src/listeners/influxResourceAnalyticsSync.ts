import type { PieceContext } from '@skyra/http-framework';
import { Point } from '@skyra/influx-utilities';
import { AnalyticsListener } from 'lib/AnalyticsListener.js';
import { Points, Tags, Actions } from 'lib/AnalyticsSchema.js';
import { cpus } from 'os';

export class UserAnalyticsEvent extends AnalyticsListener {
	public constructor(context: PieceContext, options: AnalyticsListener) {
		super(context, { ...options, event: 'resourceAnalyticsSync' });
	}

	public run() {
		this.writeCoreUsagePoint();
		this.writeMemoryUsagePoint();
		this.flush();
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

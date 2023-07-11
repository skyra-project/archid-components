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
		this.writePoints([
			this.syncPerCoreLoad(), //
			this.syncMem()
		]);

		return this.flush();
	}

	private syncPerCoreLoad() {
		const point = new Point(Points.PerCoreCPULoad) //
			.tag(Tags.Action, Actions.Sync);

		let index = 0;
		for (const { times } of cpus()) point.floatField(`cpu_${index++}`, (times.user + times.nice + times.sys + times.irq) / times.idle);

		return point;
	}

	private syncMem() {
		const usage = process.memoryUsage();
		return new Point(Points.Memory) //
			.tag(Tags.Action, Actions.Sync)
			.floatField('total', usage.heapTotal)
			.floatField('used', usage.heapUsed);
	}
}

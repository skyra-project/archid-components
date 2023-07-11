import { type PieceContext, type ClientEvents } from '@skyra/http-framework';
import { incrementInteractionCount } from 'index.js';
import { AnalyticsListener } from 'lib/AnalyticsListener.js';

export class UserAnalyticsEvent extends AnalyticsListener {
	public constructor(context: PieceContext, options: AnalyticsListener) {
		super(context, { ...options, event: 'interactionHandlerRun' satisfies keyof ClientEvents });
	}

	public run(): void {
		void incrementInteractionCount();
	}
}

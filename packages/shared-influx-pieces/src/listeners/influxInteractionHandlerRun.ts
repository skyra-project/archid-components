import { type PieceContext } from '@skyra/http-framework';
import { incrementInteractionCount } from 'index.js';
import { AnalyticsListener } from 'lib/AnalyticsListener.js';

export class UserAnalyticsEvent extends AnalyticsListener {
	public constructor(context: PieceContext, options: AnalyticsListener) {
		super(context, { ...options, event: 'interactionHandlerRun' });
	}

	public run() {
		incrementInteractionCount();
	}
}

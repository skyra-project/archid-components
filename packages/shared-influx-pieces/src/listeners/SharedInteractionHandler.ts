import { container, type ClientEvents } from '@skyra/http-framework';
import { incrementInteractionCount } from '../index';
import { AnalyticsListener } from '../lib/AnalyticsListener';

export class SharedListener extends AnalyticsListener {
	public constructor(context: AnalyticsListener.LoaderContext, options: AnalyticsListener) {
		super(context, { ...options, event: 'interactionHandlerRun' satisfies keyof ClientEvents });
	}

	public run() {
		incrementInteractionCount();
	}
}

void container.stores.loadPiece({ name: 'SharedInteractionHandler', piece: SharedListener, store: 'listeners' });

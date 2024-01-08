import { container } from '@skyra/http-framework';
import { InfluxListener } from '../lib/InfluxListener.js';

export class SharedListener extends InfluxListener {
	public constructor(context: InfluxListener.LoaderContext, options: InfluxListener) {
		super(context, { ...options, event: 'interactionHandlerRun' });
	}

	public run() {
		SharedListener.incrementInteractionCount();
	}

	public static interactionCount = 0;

	private static incrementInteractionCount() {
		SharedListener.interactionCount++;
	}
}

void container.stores.loadPiece({ name: 'sharedInteractionHandlerRunInfluxCounter', piece: SharedListener, store: 'listeners' });

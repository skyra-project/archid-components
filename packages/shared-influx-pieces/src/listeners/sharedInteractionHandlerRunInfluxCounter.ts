import { container } from '@skyra/http-framework';
import { incrementInteractionCount } from '../index.js';
import { InfluxListener } from '../lib/InfluxListener.js';

export class SharedListener extends InfluxListener {
	public constructor(context: InfluxListener.LoaderContext, options: InfluxListener) {
		super(context, { ...options, event: 'interactionHandlerRun' });
	}

	public run() {
		incrementInteractionCount();
	}
}

void container.stores.loadPiece({ name: 'sharedInteractionHandlerRunInfluxCounter', piece: SharedListener, store: 'listeners' });

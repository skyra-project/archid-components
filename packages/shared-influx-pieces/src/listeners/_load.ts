import { SharedListener as sharedAnalyticsSync } from './sharedAnalyticsSync.js';
import { SharedListener as sharedCommandSuccessInfluxCounter } from './sharedCommandSuccessInfluxCounter.js';
import { SharedListener as sharedInteractionHandlerRunInfluxCounter } from './sharedInteractionHandlerRunInfluxCounter.js';
import { container } from '@skyra/http-framework';

export function loadInfluxListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'sharedAnalyticsSync', piece: sharedAnalyticsSync, store });
	void container.stores.loadPiece({ name: 'sharedCommandSuccessInfluxCounter', piece: sharedCommandSuccessInfluxCounter, store });
	void container.stores.loadPiece({ name: 'sharedInteractionHandlerRunInfluxCounter', piece: sharedInteractionHandlerRunInfluxCounter, store });
}

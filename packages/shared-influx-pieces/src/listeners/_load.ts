import { SharedListener as sharedAnalyticsSync } from './sharedAnalyticsSync.js';
import { SharedListener as sharedCommandRunInfluxCounter } from './sharedCommandRunInfluxCounter.js';
import { SharedListener as sharedInteractionHandlerRunInfluxCounter } from './sharedInteractionHandlerRunInfluxCounter.js';
import { container } from '@skyra/http-framework';

export function loadInfluxListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'sharedAnalyticsSync', piece: sharedAnalyticsSync, store });
	void container.stores.loadPiece({ name: 'sharedCommandRunInfluxCounter', piece: sharedCommandRunInfluxCounter, store });
	void container.stores.loadPiece({ name: 'sharedInteractionHandlerRunInfluxCounter', piece: sharedInteractionHandlerRunInfluxCounter, store });
}

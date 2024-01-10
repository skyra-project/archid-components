import { container } from '@skyra/http-framework';
import { SharedListener as SharedAnalyticsSync } from './SharedAnalyticsSync.js';
import { SharedListener as SharedCommandAutocompleteRunInfluxCounter } from './SharedCommandAutocompleteRunInfluxCounter.js';
import { SharedListener as SharedCommandRunInfluxCounter } from './SharedCommandRunInfluxCounter.js';
import { SharedListener as SharedInteractionHandlerRunInfluxCounter } from './SharedInteractionHandlerRunInfluxCounter.js';

export function loadInfluxListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'SharedAnalyticsSync', piece: SharedAnalyticsSync, store });
	void container.stores.loadPiece({ name: 'SharedCommandAutocompleteRunInfluxCounter', piece: SharedCommandAutocompleteRunInfluxCounter, store });
	void container.stores.loadPiece({ name: 'SharedCommandRunInfluxCounter', piece: SharedCommandRunInfluxCounter, store });
	void container.stores.loadPiece({ name: 'SharedInteractionHandlerRunInfluxCounter', piece: SharedInteractionHandlerRunInfluxCounter, store });
}

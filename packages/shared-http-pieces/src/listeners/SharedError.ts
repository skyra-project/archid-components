import { captureException } from '@sentry/node';
import { Listener, container, type ClientEvents } from '@skyra/http-framework';
import { isSentryInitialized } from '../lib/sentry.js';

export class SharedListener extends Listener {
	public constructor(context: Listener.LoaderContext, options: Listener.Options) {
		super(context, { ...options, event: 'error' satisfies keyof ClientEvents, enabled: isSentryInitialized() });
	}

	public run(error: unknown) {
		captureException(error, (scope) => scope.setLevel('error').setTag('event', this.name));
	}
}

void container.stores.loadPiece({ name: 'SharedError', piece: SharedListener, store: 'listeners' });

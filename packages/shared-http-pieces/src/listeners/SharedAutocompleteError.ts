import { captureException } from '@sentry/node';
import { Listener, container, type ClientEventAutocompleteContext, type ClientEvents } from '@skyra/http-framework';
import { isSentryInitialized } from '../lib/sentry.js';

export class SharedListener extends Listener {
	public constructor(context: Listener.LoaderContext, options: Listener.Options) {
		super(context, { ...options, event: 'autocompleteError' satisfies keyof ClientEvents, enabled: isSentryInitialized() });
	}

	public run(error: unknown, context: ClientEventAutocompleteContext) {
		captureException(error, (scope) => scope.setLevel('error').setTag('event', this.name).setExtra('command', context.command.name));
	}
}

void container.stores.loadPiece({ name: 'SharedAutocompleteError', piece: SharedListener, store: 'listeners' });

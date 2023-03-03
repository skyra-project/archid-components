import * as Sentry from '@sentry/node';
import { Listener, type ClientEventAutocompleteContext, type ClientEvents } from '@skyra/http-framework';

export class SharedListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, { ...options, event: 'autocompleteError' satisfies keyof ClientEvents, enabled: 'SENTRY_DSN' in process.env });
	}

	public run(error: unknown, context: ClientEventAutocompleteContext) {
		Sentry.captureException(error, (scope) => scope.setLevel('error').setTag('event', 'error').setExtra('command', context.command.name));
	}
}

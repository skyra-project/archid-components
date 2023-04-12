import * as Sentry from '@sentry/node';
import { Listener, type ClientEventInteractionHandlerContext, type ClientEvents } from '@skyra/http-framework';
import { isSentryInitialized } from '../lib/sentry.js';

export class SharedListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, { ...options, event: 'interactionHandlerError' satisfies keyof ClientEvents, enabled: isSentryInitialized() });
	}

	public run(error: unknown, context: ClientEventInteractionHandlerContext) {
		Sentry.captureException(error, (scope) => scope.setLevel('error').setTag('event', this.name).setExtra('handler', context.handler.name));
	}
}

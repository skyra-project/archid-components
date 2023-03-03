import * as Sentry from '@sentry/node';
import { ClientEvents, Listener, type ClientEventInteractionHandlerContext } from '@skyra/http-framework';

export class SharedListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, { ...options, event: 'interactionHandlerError' satisfies keyof ClientEvents, enabled: 'SENTRY_DSN' in process.env });
	}

	public run(error: unknown, context: ClientEventInteractionHandlerContext) {
		Sentry.captureException(error, (scope) => scope.setLevel('error').setTag('event', 'error').setExtra('handler', context.handler.name));
	}
}

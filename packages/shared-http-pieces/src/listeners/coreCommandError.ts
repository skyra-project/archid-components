import * as Sentry from '@sentry/node';
import { Listener, type ClientEventCommandContext, type ClientEvents } from '@skyra/http-framework';

export class SharedListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, { ...options, event: 'commandError' satisfies keyof ClientEvents, enabled: 'SENTRY_DSN' in process.env });
	}

	public run(error: unknown, context: ClientEventCommandContext) {
		Sentry.captureException(error, (scope) => scope.setLevel('error').setTag('event', 'error').setExtra('command', context.command.name));
	}
}

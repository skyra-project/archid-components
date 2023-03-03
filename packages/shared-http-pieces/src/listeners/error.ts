import * as Sentry from '@sentry/node';
import { Listener } from '@skyra/http-framework';

export class SharedListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, { ...options, enabled: 'SENTRY_DSN' in process.env });
	}

	public run(error: unknown) {
		Sentry.captureException(error, (scope) => scope.setLevel('error').setTag('event', 'error'));
	}
}

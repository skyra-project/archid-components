import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { fileURLToPath } from 'node:url';

let initialized = false;
export function isSentryInitialized() {
	return initialized;
}

export function initializeSentry(options: SentryOptions = {}) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		integrations: [
			new Sentry.Integrations.Console(),
			new Sentry.Integrations.FunctionToString(),
			new Sentry.Integrations.LinkedErrors(),
			new Sentry.Integrations.Modules(),
			new Sentry.Integrations.Modules(),
			new Sentry.Integrations.OnUncaughtException(),
			new Sentry.Integrations.OnUnhandledRejection(),
			new RewriteFrames({
				root: options.root ? (typeof options.root === 'string' ? options.root : fileURLToPath(options.root)) : process.cwd()
			})
		],
		...options
	});

	initialized = true;
}

export interface SentryOptions extends Sentry.NodeOptions {
	root?: URL | string;
}

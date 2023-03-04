import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { fileURLToPath } from 'node:url';

let initialized = false;
export function isSentryInitialized() {
	return initialized;
}

export function initializeSentry(options: SentryOptions = {}) {
	if (process.env.SENTRY_DSN) {
		const extractedIntegrations = options.integrations ?? [];

		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			...options,
			integrations: (integration) => [
				new Sentry.Integrations.Console(),
				new Sentry.Integrations.FunctionToString(),
				new Sentry.Integrations.LinkedErrors(),
				new Sentry.Integrations.Modules(),
				new Sentry.Integrations.Modules(),
				new Sentry.Integrations.OnUncaughtException(),
				new Sentry.Integrations.OnUnhandledRejection(),
				new RewriteFrames({
					root: options.root ? (typeof options.root === 'string' ? options.root : fileURLToPath(options.root)) : process.cwd()
				}),
				...(typeof extractedIntegrations === 'function' ? extractedIntegrations(integration) : extractedIntegrations)
			]
		});

		initialized = true;
	}
}

export interface SentryOptions extends Omit<Sentry.NodeOptions, 'dsn'> {
	root?: URL | string;
}

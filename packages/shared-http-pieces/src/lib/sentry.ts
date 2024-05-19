import * as Sentry from '@sentry/node';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

let initialized = false;
export function isSentryInitialized() {
	return initialized;
}

export function initializeSentry(options: SentryOptions = {}) {
	if (!process.env.SENTRY_DSN) return;

	const extractedIntegrations = options.integrations ?? [];
	const root = options.root ? (typeof options.root === 'string' ? options.root : fileURLToPath(options.root)) : process.cwd();
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		...options,
		integrations: (integrations) => [
			Sentry.consoleIntegration(),
			Sentry.functionToStringIntegration(),
			Sentry.linkedErrorsIntegration(),
			Sentry.modulesIntegration(),
			Sentry.onUncaughtExceptionIntegration(),
			Sentry.onUnhandledRejectionIntegration(),
			Sentry.rewriteFramesIntegration({ root }),
			...(typeof extractedIntegrations === 'function' ? extractedIntegrations(integrations) : extractedIntegrations)
		]
	});

	const context = getAppContext();
	if (context) Sentry.setContext('app', context);

	initialized = true;
}

function getAppContext() {
	if (process.env.npm_package_name && process.env.npm_package_version) {
		return { app_name: process.env.npm_package_name, app_version: process.env.npm_package_version };
	}

	try {
		const path = process.env.npm_package_json ?? resolve('package.json');
		const { name, version } = JSON.parse(readFileSync(path, 'utf8')) as { name: string; version: string };
		return { app_name: name, app_version: version };
	} catch {
		return null;
	}
}

export interface SentryOptions extends Omit<Sentry.NodeOptions, 'dsn'> {
	root?: URL | string;
}

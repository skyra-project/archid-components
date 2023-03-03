import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { container } from '@skyra/http-framework';
import { load } from '@skyra/http-framework-i18n';

container.stores.registerPath(new URL('.', import.meta.url));
await load(new URL('../src/locales', import.meta.url));

if (process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		sampleRate: 1.0,
		integrations: [
			new Sentry.Integrations.Console(),
			new Sentry.Integrations.FunctionToString(),
			new Sentry.Integrations.LinkedErrors(),
			new Sentry.Integrations.Modules(),
			new Sentry.Integrations.Modules(),
			new Sentry.Integrations.OnUncaughtException(),
			new Sentry.Integrations.OnUnhandledRejection(),
			new RewriteFrames({ root: process.env.SENTRY_ROOT ?? process.cwd() })
		]
	});
}

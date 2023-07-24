import { container } from '@skyra/http-framework';
import { load } from '@skyra/http-framework-i18n';

container.stores.registerPath(new URL('.', import.meta.url));
await load(new URL('../src/locales', import.meta.url));

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: {
			'commands/shared': {
				infoName: 'info';
				infoDescription: 'Provides information about me, and links for adding the bot and joining the support server';
				infoEmbedDescription: string;
				infoFieldUptimeTitle: 'Uptime';
				infoFieldUptimeValue: '• **Host**: {{host}}\n• **Client**: {{client}}';
				infoFieldServerUsageTitle: 'Server Usage';
				infoFieldServerUsageValue: '• **CPU Usage**: {{cpu}}\n• **Memory**: {{heapUsed}}MB (Total: {{heapTotal}}MB)';
				infoButtonInvite: 'Add me to your server!';
				infoButtonSupport: 'Support server';
				infoButtonGitHub: 'GitHub Repository';
				infoButtonDonate: 'Donate';
			};
		};
	}
}

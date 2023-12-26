import { envIsDefined, envParseString } from '@skyra/env-utilities';
import { container } from '@skyra/http-framework';

export async function registerCommands() {
	if (envIsDefined('REGISTRY_GUILD_ID')) {
		await container.applicationCommandRegistry.pushAllCommandsInGuild(envParseString('REGISTRY_GUILD_ID'));
	} else {
		await container.applicationCommandRegistry.pushGlobalCommands();
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		REGISTRY_GUILD_ID: string;
	}
}

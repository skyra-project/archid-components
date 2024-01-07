import { Result } from '@sapphire/result';
import { container } from '@skyra/http-framework';
import type { APIApplication } from 'discord-api-types/v10';

export async function getApproximateGuildCount() {
	const result = await Result.fromAsync(() => container.rest.get('/applications/@me') as Promise<Application>);

	return result.match({
		ok: (value) => value.approximate_guild_count ?? null,
		err: () => null
	});
}

export async function getClientId() {
	const result = await Result.fromAsync(() => container.rest.get('/applications/@me') as Promise<Application>);

	return result.match({
		ok: (value) => value.id ?? null,
		err: () => null
	});
}

interface Application extends APIApplication {
	approximate_guild_count?: number;
}

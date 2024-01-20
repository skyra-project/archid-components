import { Result } from '@sapphire/result';
import { container } from '@skyra/http-framework';
import { Routes, type APIApplication } from 'discord-api-types/v10';

export async function getApproximateGuildCount() {
	const result = await Result.fromAsync(() => container.rest.get(Routes.currentApplication()) as Promise<APIApplication>);

	return result.match({
		ok: (value) => value.approximate_guild_count ?? null,
		err: () => null
	});
}

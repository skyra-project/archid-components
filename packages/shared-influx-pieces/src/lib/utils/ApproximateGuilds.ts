import { Result } from '@sapphire/result';
import { container } from '@skyra/http-framework';

export async function getApproximateGuildCount() {
	const result = await Result.fromAsync(() => container.rest.get('/applications/@me') as Promise<Application>);

	return result.match({
		ok: (value) => value.approximate_guild_count,
		err: () => null
	});
}

interface Application {
	id: string;
	name: string;
	icon: string;
	description: string;
	type: unknown;
	bot: Bot;
	summary: string;
	bot_public: boolean;
	bot_require_code_grant: boolean;
	verify_key: string;
	flags: number;
	hook: boolean;
	redirect_uris: string[];
	interactions_endpoint_url: string;
	role_connections_verification_url: string | null;
	owner: Bot;
	approximate_guild_count: number;
	interactions_event_types: unknown[];
	interactions_version: number;
	explicit_content_filter: number;
	rpc_application_state: number;
	store_application_state: number;
	creator_monetization_state: number;
	verification_state: number;
	integration_public: boolean;
	integration_require_code_grant: boolean;
	discoverability_state: number;
	discovery_eligibility_flags: number;
}

interface Bot {
	id: string;
	username: string;
	avatar: string | null;
	discriminator: string;
	public_flags: number;
	flags: number;
	bot?: boolean;
	banner: string | null;
	accent_color: string | null;
	global_name: string | null;
	avatar_decoration: string | null;
	display_name: string | null;
	banner_color: string | null;
}

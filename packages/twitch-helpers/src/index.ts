export * from './lib/constants.js';
export * from './lib/enums.js';
export * from './lib/twitch.js';
export type {
	TwitchEventSubEvent,
	TwitchEventSubOnlineEvent,
	TwitchEventSubResult,
	TwitchEventSubVerificationMessage,
	TwitchFetchUsersParameters,
	TwitchHelixBearerToken,
	TwitchHelixGameSearchResult,
	TwitchHelixOauth2Result,
	TwitchHelixResponse,
	TwitchHelixStreamsResult,
	TwitchHelixUserFollowsResult,
	TwitchHelixUsersSearchResult,
	TwitchOnlineEmbedData
} from './lib/types.js';

declare module '@skyra/env-utilities' {
	interface Env {
		TWITCH_CALLBACK: string;
		TWITCH_CLIENT_ID: string;
		TWITCH_EVENTSUB_SECRET: string;
		TWITCH_TOKEN: string;
	}
}

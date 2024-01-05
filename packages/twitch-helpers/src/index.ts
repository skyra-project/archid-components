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
export { areTwitchClientCredentialsSet, areTwitchEventSubCredentialsSet, setVariables, type TwitchVariables } from './lib/variables.js';

declare module '@skyra/env-utilities' {
	interface Env {
		TWITCH_CLIENT_ID: string;
		TWITCH_CLIENT_SECRET: string;
		TWITCH_EVENT_SUB_SECRET: string;
		TWITCH_EVENT_SUB_CALLBACK: string;
	}
}

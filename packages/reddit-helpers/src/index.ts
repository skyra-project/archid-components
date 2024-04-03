export * from './lib/RedditParseException.js';
export * from './lib/constants.js';
export { ForbiddenType } from './lib/enums.js';
export * from './lib/reddit.js';
export type { CacheEntry, CacheHit, RedditError } from './lib/types.js';
export { areRedditCredentialsSet, setVariables, type RedditVariables } from './lib/variables.js';

declare module '@skyra/env-utilities' {
	interface Env {
		REDDIT_CLIENT_ID: string;
		REDDIT_DEVICE_ID: string;
	}
}

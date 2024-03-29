import { spoiler } from '@discordjs/formatters';
import { none, ok, some, type Option } from '@sapphire/result';
import { isNullish, isNullishOrEmpty } from '@sapphire/utilities';
import { Json, safeFetch, type FetchResult } from '@skyra/safe-fetch';
import he from 'he';
import { RedditParseException } from './RedditParseException.js';
import { BaseUrl } from './constants.js';
import { Kind } from './enums.js';
import type { CacheEntry, CacheHit, RedditBearerToken, RedditOauth2TokenResult, RedditResponse } from './types.js';
import { areRedditCredentialsSet, getRedditBearerTokenUrl, getRedditFormData, getRedditRequestHeaders, type Headers } from './variables.js';

let BearerToken: Option<RedditBearerToken> = none;

/**
 * A cache of already queried entries.
 *
 * - For subreddits the key is the name of the subreddit.
 * - For posts the key is the subreddit name and the post key separated by a `/`.
 */
const cache = new Map<string, CacheHit>();

const SubRedditTitleBlockList = /nsfl/i;
/**
 * @see {@link https://github.com/reddit-archive/reddit/blob/753b17407e9a9dca09558526805922de24133d53/r2/r2/models/subreddit.py#L392-L408}
 * @see {@link https://github.com/reddit-archive/reddit/blob/753b17407e9a9dca09558526805922de24133d53/r2/r2/models/subreddit.py#L114}
 */
const Invalid = { hasNsfw: false, hasNsfl: false, posts: [] } satisfies CacheHit;
const FiveMinutes = 1000 * 60 * 5;

/**
 * Fetches Reddit posts from a specified subreddit.
 * @param subreddit - The name of the subreddit to fetch posts from.
 * @param limit - The amount of posts to fetch, defaults to `30`
 * @returns A promise that resolves to the RedditResponse object containing the fetched posts.
 */
export async function fetchRedditPosts(subreddit: string, limit = 30) {
	const existing = cache.get(subreddit);
	if (!isNullish(existing)) return ok(existing);

	const result = await getRequest<RedditResponse>(`r/${subreddit}/.json?limit=${limit}`);
	return result.map((response) => handleResponse(subreddit, response));
}

export async function fetchRedditPost(link: string) {
	const redditData = extractRedditDataFromLink(link);
	if (!redditData) throw new RedditParseException('Unable to find a post key for provided link', link);

	const cacheKey = `${redditData.subreddit}/${redditData.key}`;

	const existing = cache.get(cacheKey);
	if (!isNullish(existing)) return ok(existing);

	const result = await getRequest<RedditResponse>(`r/${redditData.subreddit}/comments/${redditData.key}/.json`);

	return result.map((response) => handleResponse(cacheKey, response));
}

/**
 * A tiny wrapper around {@link Json}({@link safeFetch}) that implements {@link fetchBearer} to set the proper headers
 * and adds the {@link BaseUrl} for the base path.
 * @param path The Reddit Path to fetch
 * @returns The response to the request
 */
export async function getRequest<T extends object>(path: string): Promise<FetchResult<T>> {
	return Json<T>(safeFetch(`${BaseUrl}/${path}`, { headers: await getHeaders() }));
}

/**
 * Retrieves the headers for a Reddit request
 *
 * @returns The headers for a Reddit request
 */
export async function getHeaders(): Promise<Headers> {
	return { ...getRedditRequestHeaders(), Authorization: `Bearer ${await fetchBearer()}` };
}

/**
 * Fetches a Bearer token from the Reddit API.
 *
 * @returns The bearer token
 */
export async function fetchBearer() {
	if (!areRedditCredentialsSet()) {
		throw new Error('Environment variable REDDIT_CLIENT_ID or REDDIT_DEVICE_ID was not set');
	}

	return BearerToken.match({
		some: (value) => (value.expiresAt < Date.now() ? generateBearerToken() : value.token),
		none: generateBearerToken
	});
}

/**
 * Parses a Reddit response into a cache hit.
 * @param name The subreddit name
 * @param response The response from the API
 * @returns A parsed response
 *
 * @interal
 */
function handleResponse(name: string, response: RedditResponse): CacheHit {
	if (isNullishOrEmpty(response.kind) || isNullish(response.data)) return Invalid;
	if (isNullishOrEmpty(response.data.children)) return Invalid;

	const posts = [] as CacheEntry[];
	let hasNsfl = false;
	let hasNsfw = false;
	for (const child of response.data.children) {
		if (child.kind !== Kind.Post || child.data.hidden || child.data.quarantine) continue;
		if (SubRedditTitleBlockList.test(child.data.title)) {
			hasNsfl = true;
			continue;
		}
		if (child.data.over_18) hasNsfw = true;

		const url = child.data.secure_media?.reddit_video?.fallback_url.replace('?source=fallback', '') ?? child.data.url;
		posts.push({
			title: he.decode(child.data.title),
			author: child.data.author,
			url: child.data.spoiler ? spoiler(`${url} `) : url,
			nsfw: child.data.over_18
		});
	}

	const entry = { hasNsfw, hasNsfl, posts } satisfies CacheHit;
	cache.set(name, entry);
	setTimeout(() => cache.delete(name), FiveMinutes).unref();
	return entry;
}

/**
 * Generates a Reddit bearer token.
 *
 * @returns The bearer token, or an error if the request failed.
 * @internal
 */
async function generateBearerToken() {
	const data = await Json<RedditOauth2TokenResult>(
		safeFetch(getRedditBearerTokenUrl(), {
			method: 'POST',
			headers: getRedditRequestHeaders(),
			body: getRedditFormData()
		})
	);

	const unwrapped = data.unwrap();
	const expires = Date.now() + unwrapped.expires_in * 1000;

	BearerToken = some({ token: unwrapped.access_token, expiresAt: expires });
	return unwrapped.access_token;
}

const DataExtractRegex = /\/r\/(?<subreddit>[^\s/]+)\/comments\/(?<key>[a-z0-9]{6,})\//;
/**
 * Attempts to extract the subreddit name and unique post key from a Reddit post link.
 * @param link The link to extract the post key from
 * @returns The subreddit name and post key if they were both found, or null if one or both could not be found.
 *
 * @internal
 */
function extractRedditDataFromLink(link: string) {
	const match = DataExtractRegex.exec(link);

	const key = match?.groups?.key;
	const subreddit = match?.groups?.subreddit;

	if (key && subreddit) return { key, subreddit };

	return null;
}

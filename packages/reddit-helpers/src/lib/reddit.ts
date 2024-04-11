import { spoiler } from '@discordjs/formatters';
import { Option, err, none, ok, some } from '@sapphire/result';
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
 * @returns A promise that resolves to the {@link RedditResponse} object containing the fetched posts.
 */
export async function fetchRedditPosts(subreddit: string, limit = 30) {
	const existing = cache.get(subreddit);
	if (!isNullish(existing)) return ok(existing);

	const result = await getRequest<RedditResponse>(`r/${subreddit}/.json?limit=${limit}`);
	return result.map((response) => handleResponse(subreddit, response));
}

/**
 * Gets the proper URL of a reddit post in case an URL was provided that redirects to a post.
 * This happens when the shortlink is provided from the official Reddit app.
 * @param path - The shortlink path to get the redirect for.
 * @returns The proper URL of the post from `headers.get('Location')`
 */
export async function getRedditRedirectPostUrl(path: string) {
	const response = await fetch(path, { redirect: 'manual', headers: await getHeaders() });
	return response.headers.get('Location');
}

/**
 * Fetches a Reddit post from a specified subreddit.
 * @param subreddit - The name of the subreddit this post belongs to.
 * @param key - The key of the post to fetch.
 * @returns A promise that resolves to the {@link RedditResponse} object contained the fetched post.
 */
export async function fetchRedditPost(subreddit: string, key: string) {
	const cacheKey = `${subreddit}/${key}`;

	const existing = cache.get(cacheKey);
	if (!isNullish(existing)) return ok(existing);

	const result = await getRequest<RedditResponse[]>(`r/${subreddit}/comments/${key}.json`);

	return result
		.mapInto((value) =>
			parsePostResponse(value).match({
				some: (parsed) => ok(parsed),
				none: () => err(new RedditParseException('Failed to find a post in the response', subreddit, key))
			})
		)
		.map((response) => handleResponse(cacheKey, response));
}

function parsePostResponse(response: RedditResponse[]): Option<RedditResponse> {
	return Option.from(response.find((item) => item.data.children.some((child) => child.kind === 't3')));
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

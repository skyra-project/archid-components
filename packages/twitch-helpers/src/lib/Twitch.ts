import { none, some, type Option } from '@sapphire/result';
import { envParseString } from '@skyra/env-utilities';
import { Json, safeFetch, type FetchResult } from '@skyra/safe-fetch';
import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import os from 'node:os';
import { URL } from 'node:url';
import { BaseUrlHelix } from './constants';
import { TwitchEventSubTypes } from './enums';
import type {
	TwitchEventSubResult,
	TwitchFetchUsersParameters,
	TwitchHelixBearerToken,
	TwitchHelixGameSearchResult,
	TwitchHelixOauth2Result,
	TwitchHelixResponse,
	TwitchHelixStreamsResult,
	TwitchHelixUserFollowsResult,
	TwitchHelixUsersSearchResult
} from './types';

const packageVersion = (
	JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), { encoding: 'utf-8' })) as Record<'version', 'string'>
).version;

const ClientId = envParseString('TWITCH_CLIENT_ID');
const ClientSecret = envParseString('TWITCH_TOKEN');
const EventSubSecret = envParseString('TWITCH_EVENTSUB_SECRET');

/**
 * The default Twitch Request headers that we sent to the API
 */
const TwitchRequestHeaders = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Client-ID': ClientId,
	'User-Agent': `@skyra/twitch-helpers/${packageVersion} (NodeJS) ${os.platform()}/${os.release()} (https://github.com/skyra-project/archid-components/tree/main/packages/twitch-helpers)`
};

let BearerToken: Option<TwitchHelixBearerToken> = none;

/**
 * Fetches a Bearer token from the Twitch API.
 *
 * This requires `process.env.TWITCH_CLIENT_ID`, `process.env.TWITCH_EVENTSUB_SECRET`,
 * and `process.env.TWITCH_TOKEN` to be set
 *
 * @returns The bearer token
 */
export function fetchBearer() {
	return BearerToken.match({
		some: (value) => (value.expiresAt < Date.now() ? generateBearerToken() : value.token),
		none: generateBearerToken
	});
}

/**
 * Fetches the user data for lists of User IDs and/or login names.
 *
 * This requires `process.env.TWITCH_CLIENT_ID`, `process.env.TWITCH_EVENTSUB_SECRET`,
 * and `process.env.TWITCH_TOKEN` to be set
 *
 * @param params An object with lists of Twitch User IDs and/or Twitch User Logins.
 * @returns The Twitch user data for every provided ID and/or login that matches a valid user.
 */
export async function fetchUsers({ ids = [], logins = [] }: TwitchFetchUsersParameters = { ids: [], logins: [] }) {
	const search: string[] = [];
	for (const id of ids) search.push(`id=${encodeURIComponent(id)}`);
	for (const login of logins) search.push(`login=${encodeURIComponent(login)}`);
	return getRequest<TwitchHelixResponse<TwitchHelixUsersSearchResult>>(`users?${search.join('&')}`);
}

/**
 * Retrieves the data of the current stream of a channel.
 *
 * This requires `process.env.TWITCH_CLIENT_ID`, `process.env.TWITCH_EVENTSUB_SECRET`,
 * and `process.env.TWITCH_TOKEN` to be set
 *
 * @param streamerId The Twitch User ID of the streamer.
 * @returns Either hte data of the current stream if online, or `null` if the streamer is offline.
 */
export async function fetchStream(streamerId: string): Promise<TwitchHelixStreamsResult | null> {
	const search = `user_id=${encodeURIComponent(streamerId)}`;
	const streamResult = await getRequest<TwitchHelixResponse<TwitchHelixStreamsResult>>(`streams?${search}`);

	return streamResult.match({
		err: () => null,
		ok: async (value) => {
			const streamData = value.data?.[0];

			if (streamData) {
				const gameSearch = `id=${encodeURIComponent(streamData.game_id)}`;
				const gameResult = await getRequest<TwitchHelixResponse<TwitchHelixGameSearchResult>>(`games?${gameSearch}`);

				if (gameResult.isOk()) {
					const gameData = gameResult.unwrap().data?.[0];

					if (gameData) {
						return {
							...streamData,
							game_box_art_url: gameData.box_art_url
						};
					}
				}
			}

			return streamData ?? null;
		}
	});
}

/**
 * Check if {@link followerId} follows {@link streamerId} and returns the followage data.
 *
 * This requires `process.env.TWITCH_CLIENT_ID`, `process.env.TWITCH_EVENTSUB_SECRET`,
 * and `process.env.TWITCH_TOKEN` to be set
 *
 * @param followerId The Twitch User ID of the user of whom you want to check if they are following {@link streamerId}.
 * @param streamerId The Twitch User ID of the user of whom you want to check if they are followed by {@link followerId}.
 * @returns A {@link FetchResult} that contains the object with details of whether {@link followerId} follows {@link streamerId}
 */
export async function fetchUserFollowage(followerId: string, streamerId: string) {
	return getRequest<TwitchHelixResponse<TwitchHelixUserFollowsResult> & { total: number }>(
		`users/follows?from_id=${followerId}&to_id=${streamerId}`
	);
}

/**
 * This method can be used to verify the Twitch signature when receiving an event sub request.
 * @param algorithm The algorithm to use
 * @param signature
 * @param data
 * @returns
 *
 * @example
 * ```typescript
 * // Grab the headers that we need to use for verification
 * const twitchEventSubMessageSignature = request.headers['twitch-eventsub-message-signature'];
 * const twitchEventSubMessageId = request.headers['twitch-eventsub-message-id'];
 * const twitchEventSubMessageTimestamp = request.headers['twitch-eventsub-message-timestamp'];
 *
 * // If there is no body then tell Twitch they are sending malformed data
 * if (!isObject(request.body)) return response.badRequest('Malformed data received');
 *
 * // If any of the headers is missing tell Twitch they are sending invalid data
 * if (!twitchEventSubMessageSignature || !twitchEventSubMessageId || !twitchEventSubMessageTimestamp) {
 *  return response.badRequest('Missing required Twitch Eventsub headers');
 * }
 *
 * // Construct the verification signature
 * const twitchEventSubMessage = twitchEventSubMessageId + twitchEventSubMessageTimestamp + JSON.stringify(request.body);
 *
 * // Split the algorithm from the signature
 * const [algorithm, signature] = twitchEventSubMessageSignature.toString().split('=', 2);
 *
 * // Verify the signature
 * if (!twitch.checkSignature(algorithm, signature, twitchEventSubMessage)) {
 * 	return response.forbidden('Invalid Hub signature');
 * }
 * ```
 */
export function checkSignature(algorithm: string, signature: string, data: any) {
	const hash = createHmac(algorithm, EventSubSecret).update(data).digest('hex');

	return hash === signature;
}

/**
 * Adds a new Twitch subscription
 *
 * This requires `process.env.TWITCH_CALLBACK`, `process.env.TWITCH_CLIENT_ID`,
 * `process.env.TWITCH_EVENTSUB_SECRET`, and `process.env.TWITCH_TOKEN`
 * to be set
 *
 * @param streamerId The Twitch ID of the streamer to subscribe to.
 * You can use {@link fetchUsers} to get the ID.
 * @param subscriptionType	The type of subscription to add.
 * @returns If successful the result of the Twitch subscription,
 * this contains the `id` that can be stored in a database for reference.
 * If not successful then an {@link HttpError} is thrown.
 */
export async function addEventSubscription(
	streamerId: string,
	subscriptionType: TwitchEventSubTypes = TwitchEventSubTypes.StreamOnline
): Promise<TwitchEventSubResult> {
	const result = await Json<TwitchHelixResponse<TwitchEventSubResult>>(
		safeFetch(`${BaseUrlHelix}/eventsub/subscriptions`, {
			body: JSON.stringify({
				type: subscriptionType,
				version: '1',
				condition: {
					broadcaster_user_id: streamerId
				},
				transport: {
					method: 'webhook',
					callback: envParseString('TWITCH_CALLBACK'),
					secret: EventSubSecret
				}
			}),
			headers: {
				...TwitchRequestHeaders,
				Authorization: `Bearer ${await fetchBearer()}`
			},
			method: 'POST'
		})
	);

	return result.match({
		err: (error) => {
			throw error;
		},
		ok: (value) => value.data[0]
	});
}

/**
 * Removes a Twitch subscription based on its ID
 *
 * This requires `process.env.TWITCH_CLIENT_ID`, `process.env.TWITCH_EVENTSUB_SECRET`,
 * and `process.env.TWITCH_TOKEN` to be set
 *
 * @param subscriptionId the ID to remove. This ID should be saved from {@link addEventSubscription}
 */
export async function removeEventSubscription(subscriptionId: string): Promise<void> {
	const url = new URL(`${BaseUrlHelix}/eventsub/subscriptions`);
	url.searchParams.append('id', subscriptionId);

	await safeFetch(url, {
		headers: {
			...TwitchRequestHeaders,
			Authorization: `Bearer ${await fetchBearer()}`
		},
		method: 'DELETE'
	});
}

/**
 * Retrieves the current Twitch subscriptions from the API.
 * @returns The current subscriptions
 */
export async function getCurrentTwitchSubscriptions(): Promise<FetchResult<TwitchHelixResponse<TwitchEventSubResult>>> {
	return getRequest<TwitchHelixResponse<TwitchEventSubResult>>('eventsub/subscriptions');
}

/**
 * A tiny wrapper around {@link Json}({@link safeFetch}) that implements
 * {@link fetchBearer} to set the proper headers and adds the {@link BaseUrlHelix} for the base path
 * @param path The Twitch Path to fetch
 * @returns The response to the request
 */
export async function getRequest<T extends object>(path: string): Promise<FetchResult<T>> {
	return Json<T>(
		safeFetch(`${BaseUrlHelix}/${path}`, {
			headers: {
				...TwitchRequestHeaders,
				Authorization: `Bearer ${await fetchBearer()}`
			}
		})
	);
}

const bearerTokenUrl = new URL('https://id.twitch.tv/oauth2/token');
bearerTokenUrl.searchParams.append('client_secret', ClientSecret);
bearerTokenUrl.searchParams.append('client_id', ClientId);
bearerTokenUrl.searchParams.append('grant_type', 'client_credentials');
/**
 * Generates a Twitch bearer token
 *
 * This requires `process.env.TWITCH_CLIENT_ID`, `process.env.TWITCH_EVENTSUB_SECRET`,
 * and `process.env.TWITCH_TOKEN` to be set
 *
 * @returns The bearer token, or an error if the request failed.
 */
async function generateBearerToken() {
	const data = (await Json<TwitchHelixOauth2Result>(safeFetch(bearerTokenUrl.href, { method: 'POST' }))).unwrap();
	const expires = Date.now() + data.expires_in * 1000;

	BearerToken = some({ token: data.access_token, expiresAt: expires });
	return data.access_token;
}

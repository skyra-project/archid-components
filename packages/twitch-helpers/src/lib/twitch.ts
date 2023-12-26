import { none, some, type Option } from '@sapphire/result';
import { Json, safeFetch, type FetchResult } from '@skyra/safe-fetch';
import { createHmac, type BinaryLike } from 'node:crypto';
import { URL } from 'node:url';
import { BaseUrlHelix } from './constants.js';
import { TwitchEventSubTypes } from './enums.js';
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
} from './types.js';
import {
	getClientId,
	getClientSecret,
	getRequiredEventSubCallback,
	getRequiredEventSubSecret,
	getTwitchBearerTokenUrl,
	getTwitchRequestHeaders,
	type Headers
} from './variables.js';

let BearerToken: Option<TwitchHelixBearerToken> = none;

/**
 * Checks if the Twitch credentials are set in the environment variables `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET`
 *
 * @returns If the Twitch credentials are set
 */
export function areTwitchCredentialsSet() {
	return getClientId() !== null && getClientSecret() !== null;
}

/**
 * Fetches the user data for lists of User IDs and/or login names.
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
 * @param streamerId The Twitch User ID of the streamer.
 * @returns Either the data of the current stream if online, or `null` if the streamer is offline.
 */
export async function fetchStream(streamerId: string): Promise<TwitchHelixStreamsResult | null> {
	const search = `user_id=${encodeURIComponent(streamerId)}`;
	const streamResult = await getRequest<TwitchHelixResponse<TwitchHelixStreamsResult>>(`streams?${search}`);

	return streamResult.match({
		err: () => null,
		ok: async (value) => {
			const streamData = value.data?.[0];

			if (!streamData) {
				return null;
			}

			const gameSearch = `id=${encodeURIComponent(streamData.game_id)}`;
			const gameResult = await getRequest<TwitchHelixResponse<TwitchHelixGameSearchResult>>(`games?${gameSearch}`);

			const gameData = gameResult.map((value) => value.data?.[0]).unwrapOr(null);
			return gameData ? { ...streamData, game_box_art_url: gameData.box_art_url } : null;
		}
	});
}

/**
 * Check if {@link followerId} follows {@link streamerId} and returns the followage data.
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
 * @param signature The signature to verify
 * @param data The data to verify
 * @returns Whether or not the signature is valid
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
export function checkSignature(algorithm: string, signature: string, data: BinaryLike) {
	const hash = createHmac(algorithm, getRequiredEventSubSecret()).update(data).digest('hex');
	return hash === signature;
}

/**
 * Adds a new Twitch subscription.
 *
 * @remarks This requires `process.env.TWITCH_EVENTSUB_CALLBACK` and `process.env.TWITCH_EVENTSUB_SECRET` to be set.
 * @param streamerId The Twitch ID of the streamer to subscribe to. You can use {@link fetchUsers} to get the user information.
 * @param subscriptionType The type of subscription to add.
 * @returns If successful the result of the Twitch subscription, this contains the `id` that can be stored in a database
 * for reference. Otherwise an {@link HttpError} is thrown.
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
					callback: getRequiredEventSubCallback(),
					secret: getRequiredEventSubSecret()
				}
			}),
			method: 'POST',
			headers: await getHeaders()
		})
	);

	return result.map((value) => value.data?.[0]).unwrapRaw();
}

/**
 * Removes a Twitch subscription based on its ID.
 *
 * @remarks This requires `process.env.TWITCH_EVENTSUB_SECRET` to be set.
 * @param subscriptionId the ID to remove. This ID should be saved from {@link addEventSubscription}
 */
export async function removeEventSubscription(subscriptionId: string): Promise<void> {
	const url = new URL(`${BaseUrlHelix}/eventsub/subscriptions`);
	url.searchParams.append('id', subscriptionId);

	await safeFetch(url, { method: 'DELETE', headers: await getHeaders() });
}

/**
 * Retrieves the current Twitch subscriptions from the API.
 *
 * @returns The current subscriptions
 */
export async function getCurrentTwitchSubscriptions(): Promise<FetchResult<TwitchHelixResponse<TwitchEventSubResult>>> {
	return getRequest<TwitchHelixResponse<TwitchEventSubResult>>('eventsub/subscriptions');
}

/**
 * A tiny wrapper around {@link Json}({@link safeFetch}) that implements {@link fetchBearer} to set the proper headers
 * and adds the {@link BaseUrlHelix} for the base path.
 * @param path The Twitch Path to fetch
 * @returns The response to the request
 */
export async function getRequest<T extends object>(path: string): Promise<FetchResult<T>> {
	return Json<T>(safeFetch(`${BaseUrlHelix}/${path}`, { headers: await getHeaders() }));
}

/**
 * Retrieves the headers for a Twitch request
 *
 * @returns The headers for a Twitch request
 */
export async function getHeaders(): Promise<Headers> {
	return { ...getTwitchRequestHeaders(), Authorization: `Bearer ${await fetchBearer()}` };
}

/**
 * Fetches a Bearer token from the Twitch API.
 *
 * @returns The bearer token
 */
export async function fetchBearer() {
	if (!areTwitchCredentialsSet()) {
		throw new Error('Environment variable TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET was not set');
	}

	return BearerToken.match({
		some: (value) => (value.expiresAt < Date.now() ? generateBearerToken() : value.token),
		none: generateBearerToken
	});
}

/**
 * Generates a Twitch bearer token.
 *
 * @returns The bearer token, or an error if the request failed.
 * @internal
 */
async function generateBearerToken() {
	const data = (await Json<TwitchHelixOauth2Result>(safeFetch(getTwitchBearerTokenUrl(), { method: 'POST' }))).unwrap();
	const expires = Date.now() + data.expires_in * 1000;

	BearerToken = some({ token: data.access_token, expiresAt: expires });
	return data.access_token;
}

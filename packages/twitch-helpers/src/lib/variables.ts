import { envIsNullish, envParseString, type EnvString } from '@skyra/env-utilities';
import { platform, release } from 'node:os';
import { version } from './constants.js';

let ClientId: string | null | undefined = undefined;
let ClientSecret: string | null | undefined = undefined;
let EventSubSecret: string | null | undefined = undefined;
let EventSubCallback: string | null | undefined = undefined;

/**
 * Sets the variables required to interact with the Twitch API.
 *
 * @param variables The variables to set
 */
export function setVariables(variables: Readonly<TwitchVariables>) {
	if (variables.clientId !== undefined) setClientId(variables.clientId);
	if (variables.clientSecret !== undefined) setClientSecret(variables.clientSecret);
	if (variables.eventSubSecret) EventSubSecret = variables.eventSubSecret;
	if (variables.eventSubCallback) EventSubCallback = variables.eventSubCallback;
}

export interface TwitchVariables {
	/**
	 * The Twitch Client ID, otherwise set in the environment variable `TWITCH_CLIENT_ID`
	 */
	clientId?: string | undefined;

	/**
	 * The Twitch Client Secret, otherwise set in the environment variable `TWITCH_CLIENT_SECRET`
	 */
	clientSecret?: string | undefined;

	/**
	 * The Twitch EventSub Secret, otherwise set in the environment variable `TWITCH_EVENT_SUB_SECRET`
	 */
	eventSubSecret?: string | undefined;

	/**
	 * The Twitch EventSub Callback, otherwise set in the environment variable `TWITCH_EVENT_SUB_CALLBACK`
	 */
	eventSubCallback?: string | undefined;
}

export type Headers = Record<string, string>;

/**
 * The default Twitch Request headers that we sent to the API
 */
const TwitchRequestHeaders: Headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'User-Agent': `@skyra/twitch-helpers/${version} (NodeJS) ${platform()}/${release()} (https://github.com/skyra-project/archid-components/tree/main/packages/twitch-helpers)`
};

export function getTwitchRequestHeaders(): Readonly<Headers> {
	getRequiredClientId();
	return TwitchRequestHeaders;
}

const TwitchBearerTokenUrl = new URL('https://id.twitch.tv/oauth2/token');
TwitchBearerTokenUrl.searchParams.append('grant_type', 'client_credentials');

export function getTwitchBearerTokenUrl() {
	getRequiredClientId();
	getRequiredClientSecret();
	return TwitchBearerTokenUrl;
}

const CLIENT_ID_KEY = 'TWITCH_CLIENT_ID' satisfies EnvString;
export function getClientId() {
	return ClientId === undefined ? setClientId(getVariable(CLIENT_ID_KEY)) : ClientId;
}
export const getRequiredClientId = makeRequiredCallback(CLIENT_ID_KEY, getClientId);

function setClientId(value: string | null) {
	ClientId = value;
	if (value !== null) {
		TwitchRequestHeaders['Client-ID'] = value;
		TwitchBearerTokenUrl.searchParams.set('client_id', value);
	}

	return ClientId;
}

const CLIENT_SECRET_KEY = 'TWITCH_CLIENT_SECRET' satisfies EnvString;
export function getClientSecret() {
	return ClientSecret === undefined ? setClientSecret(getVariable(CLIENT_SECRET_KEY)) : ClientSecret;
}
export const getRequiredClientSecret = makeRequiredCallback(CLIENT_SECRET_KEY, getClientSecret);

function setClientSecret(value: string | null) {
	ClientSecret = value;
	if (value !== null) {
		TwitchBearerTokenUrl.searchParams.set('client_secret', value);
	}

	return ClientSecret;
}

const EVENT_SUB_SECRET = 'TWITCH_EVENT_SUB_SECRET' satisfies EnvString;
export function getEventSubSecret() {
	return EventSubCallback === undefined ? (EventSubCallback = getVariable(EVENT_SUB_SECRET)) : EventSubCallback;
}
export const getRequiredEventSubSecret = makeRequiredCallback(EVENT_SUB_SECRET, getEventSubSecret);

const EVENT_SUB_CALLBACK = 'TWITCH_EVENT_SUB_CALLBACK' satisfies EnvString;
export function getEventSubCallback() {
	return EventSubSecret === undefined ? (EventSubSecret = getVariable(EVENT_SUB_CALLBACK)) : EventSubSecret;
}
export const getRequiredEventSubCallback = makeRequiredCallback(EVENT_SUB_CALLBACK, getEventSubCallback);

function getVariable(key: EnvString) {
	if (envIsNullish(key)) return null;
	return envParseString(key);
}

function makeRequiredCallback(name: string, cb: () => string | null): () => string {
	return () => {
		const value = cb();
		if (value !== null) return value;

		throw new ReferenceError(
			`Environment variable "${name}" is not defined. Please set it in the environment variables or in the \`setVariables\` and try again.`
		);
	};
}

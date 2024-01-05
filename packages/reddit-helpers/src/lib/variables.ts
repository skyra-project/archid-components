import { envIsNullish, envParseString, type EnvString } from '@skyra/env-utilities';
import { platform, release } from 'node:os';
import { version } from './constants.js';

let ClientId: string | null | undefined = undefined;
let DeviceId: string | null | undefined = undefined;

/**
 * Sets the variables required to interact with the Reddit API.
 *
 * @param variables The variables to set
 */
export function setVariables(variables: Readonly<RedditVariables>) {
	if (variables.clientId !== undefined) setClientId(variables.clientId);
	if (variables.deviceId !== undefined) setDeviceId(variables.deviceId);
}

/**
 * Represents the variables used for Reddit integration.
 */
export interface RedditVariables {
	/**
	 * The Reddit Client ID, otherwise set in the environment variable `REDDIT_CLIENT_ID`
	 */
	clientId?: string | undefined;

	/**
	 * The Reddit Device Id, otherwise set in the environment variable `REDDIT_DEVICE_ID` or randomly generated
	 */
	deviceId?: string | undefined;
}

/**
 * Checks if the Reddit client credentials are set in the environment variables `REDDIT_CLIENT_ID` and
 * `REDDIT_DEVICE_ID` or in the variables set by `setVariables`.
 *
 * @returns If the Reddit client credentials are set
 */
export function areRedditCredentialsSet() {
	return getClientId() !== null && getDeviceId() !== null;
}

/**
 * Represents a collection of headers.
 */
export type Headers = Record<string, string>;

/**
 * The default Reddit Request headers that we sent to the API
 */
const RedditRequestHeaders: Headers = {
	Accept: 'application/json',
	'User-Agent': `@skyra/reddit-helpers/${version} (NodeJS) ${platform()}/${release()} (https://github.com/skyra-project/archid-components/tree/main/packages/reddit-helpers)`
};

/**
 * The default Reddit form data that we sent to the API when getting a token
 */
const RedditFormData = new FormData();
RedditFormData.set('grant_type', 'https://oauth.reddit.com/grants/installed_client');
RedditFormData.set('scope', 'read');

export function getRedditFormData(): Readonly<FormData> {
	getRequiredDeviceId();
	return RedditFormData;
}

/**
 * Retrieves the Reddit request headers.
 * @returns The Reddit request headers.
 */
export function getRedditRequestHeaders(): Readonly<Headers> {
	getRequiredClientId();
	return RedditRequestHeaders;
}

/**
 * The URL for retrieving the Reddit bearer token.
 */
const RedditBearerTokenUrl = new URL('https://www.reddit.com/api/v1/access_token');

/**
 * Retrieves the URL for obtaining the Reddit bearer token.
 * @returns The URL for obtaining the Reddit bearer token.
 */
export function getRedditBearerTokenUrl() {
	getRequiredClientId();
	getRequiredDeviceId();
	return RedditBearerTokenUrl;
}

const CLIENT_ID_KEY = 'REDDIT_CLIENT_ID' satisfies EnvString;
/**
 * Retrieves the client ID.
 * If the client ID is undefined, it will be set using the value of the CLIENT_ID_KEY variable.
 * @returns The client ID.
 */
export function getClientId() {
	return ClientId === undefined ? setClientId(getVariable(CLIENT_ID_KEY)) : ClientId;
}
/**
 * Retrieves the required client ID using the provided callback function.
 * @returns The required client ID.
 */
export const getRequiredClientId = makeRequiredCallback(CLIENT_ID_KEY, getClientId);

function setClientId(value: string | null) {
	ClientId = value;
	if (value !== null) {
		const auth = Buffer.from(`${value}:`).toString('base64');
		RedditRequestHeaders['Authorization'] = `Basic ${auth}`;
	}

	return ClientId;
}

const DEVICE_ID_KEY = 'REDDIT_DEVICE_ID' satisfies EnvString;
/**
 * Retrieves the device ID.
 * If the device ID is undefined, it sets the device ID using the value from the DEVICE_ID_KEY variable.
 * @returns The device ID.
 */
export function getDeviceId() {
	return DeviceId === undefined ? setDeviceId(getVariable(DEVICE_ID_KEY)) : DeviceId;
}
/**
 * Retrieves the required device ID.
 * @returns The required device ID.
 */
export const getRequiredDeviceId = makeRequiredCallback(DEVICE_ID_KEY, getDeviceId);

function setDeviceId(value: string | null) {
	DeviceId = value;

	if (value !== null) {
		RedditFormData.set('device_id', value);
	}

	return (DeviceId = value);
}

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

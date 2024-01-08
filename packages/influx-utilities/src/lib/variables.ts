import { envIsNullish, envParseString, type EnvString } from '@skyra/env-utilities';
import type { ConnectionOptions } from './types.js';

let Url: string | null | undefined = undefined;
let Org: string | null | undefined = undefined;
let Token: string | null | undefined = undefined;
let Bucket: string | null | undefined = undefined;

/**
 * Sets the variables required to interact with the Influx API.
 *
 * @param variables The variables to set
 */
export function setInfluxVariables(variables: Readonly<InfluxVariables>) {
	if (variables.influxUrl !== undefined) setInfluxUrl(variables.influxUrl);
	if (variables.influxOrg !== undefined) setInfluxOrg(variables.influxOrg);
	if (variables.influxToken !== undefined) setInfluxToken(variables.influxToken);
	if (variables.influxBucket !== undefined) setInfluxBucket(variables.influxBucket);
}

export interface InfluxVariables {
	/**
	 * The Influx Url, otherwise set in the environment variable `INFLUX_URL`
	 */
	influxUrl?: string | undefined;

	/**
	 * The Influx Org, otherwise set in the environment variable `INFLUX_ORG`
	 */
	influxOrg?: string | undefined;

	/**
	 * The Influx Token, otherwise set in the environment variable `INFLUX_TOKEN`
	 */
	influxToken?: string | undefined;

	/**
	 * The Influx Bucket, otherwise set in the environment variable `INFLUX_BUCKET`
	 */
	influxBucket?: string | undefined;
}

/**
 * Checks if the Influx credentials are set in the environment variables or in the variables set by `setVariables`.
 *
 * @returns If the Influx credentials are set
 */
export function areInfluxCredentialsSet() {
	return getUrl() !== null && getOrg() !== null && getToken() !== null && getBucket() !== null;
}

const URL_KEY = 'INFLUX_URL' satisfies EnvString;
export function getUrl() {
	return Url === undefined ? setInfluxUrl(getVariable(URL_KEY)) : Url;
}
export const getRequiredUrl = makeRequiredCallback(URL_KEY, getUrl);

function setInfluxUrl(value: string | null) {
	Url = value;
	return Url;
}

const ORG_KEY = 'INFLUX_ORG' satisfies EnvString;
export function getOrg() {
	return Org === undefined ? setInfluxOrg(getVariable(ORG_KEY)) : Org;
}
export const getRequiredOrg = makeRequiredCallback(ORG_KEY, getOrg);
function setInfluxOrg(value: string | null) {
	Org = value;
	return Org;
}

const TOKEN_KEY = 'INFLUX_TOKEN' satisfies EnvString;
export function getToken() {
	return Token === undefined ? setInfluxToken(getVariable(TOKEN_KEY)) : Token;
}
export const getRequiredToken = makeRequiredCallback(TOKEN_KEY, getToken);
function setInfluxToken(value: string | null) {
	Token = value;

	return Token;
}

const BUCKET_KEY = 'INFLUX_BUCKET' satisfies EnvString;
export function getBucket() {
	return Bucket === undefined ? setInfluxBucket(getVariable(BUCKET_KEY)) : Bucket;
}
export const getRequiredBucket = makeRequiredCallback(BUCKET_KEY, getBucket);
function setInfluxBucket(value: string | null) {
	Bucket = value;

	return Bucket;
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

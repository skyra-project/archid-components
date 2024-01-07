import { platform, release } from 'node:os';

/**
 * The Base URL for the Weather API
 */
export const BaseUrl = 'https://wttr.in/';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';

/**
 * Represents a collection of headers.
 */
type Headers = Record<string, string>;

const WeatherRequestHeaders: Headers = {
	Accept: 'application/json',
	'User-Agent': `@skyra/weather-helpers/${version} (NodeJS) ${platform()}/${release()} (https://github.com/skyra-project/archid-components/tree/main/packages/weather-helpers)`
};

/**
 * Retrieves the Weather request headers.
 * @returns The Weather request headers.
 */
export function getWeatherRequestHeaders(): Readonly<Headers> {
	return WeatherRequestHeaders;
}

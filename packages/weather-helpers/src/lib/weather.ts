import { Result, err } from '@sapphire/result';
import { Text, isAbortError, safeTimedFetch, type FetchError } from '@skyra/safe-fetch';
import { BaseUrl } from './constants';
import { Identifiers, WeatherCode } from './enums';
import { type Weather, type WeatherName } from './types';

const getWeatherNameMap = new Map<WeatherCode, WeatherName>([
	[WeatherCode.ClearOrSunny, 'Sunny'],
	[WeatherCode.PartlyCloudy, 'PartlyCloudy'],
	[WeatherCode.Cloudy, 'Cloudy'],
	[WeatherCode.Overcast, 'VeryCloudy'],
	[WeatherCode.Mist, 'Fog'],
	[WeatherCode.PatchyRainNearby, 'LightShowers'],
	[WeatherCode.PatchySnowNearby, 'LightSleetShowers'],
	[WeatherCode.PatchySleetNearby, 'LightSleet'],
	[WeatherCode.PatchyFreezingDrizzleNearby, 'LightSleet'],
	[WeatherCode.ThunderyOutbreaksInNearby, 'ThunderyShowers'],
	[WeatherCode.BlowingSnow, 'LightSnow'],
	[WeatherCode.Blizzard, 'HeavySnow'],
	[WeatherCode.Fog, 'Fog'],
	[WeatherCode.FreezingFog, 'Fog'],
	[WeatherCode.PatchyLightDrizzle, 'LightShowers'],
	[WeatherCode.LightDrizzle, 'LightRain'],
	[WeatherCode.FreezingDrizzle, 'LightSleet'],
	[WeatherCode.HeavyFreezingDrizzle, 'LightSleet'],
	[WeatherCode.PatchyLightRain, 'LightRain'],
	[WeatherCode.LightRain, 'LightRain'],
	[WeatherCode.ModerateRainAtTimes, 'HeavyShowers'],
	[WeatherCode.ModerateRain, 'HeavyRain'],
	[WeatherCode.HeavyRainAtTimes, 'HeavyShowers'],
	[WeatherCode.HeavyRain, 'HeavyRain'],
	[WeatherCode.LightFreezingRain, 'LightSleet'],
	[WeatherCode.ModerateOrHeavyFreezingRain, 'LightSleet'],
	[WeatherCode.LightSleet, 'LightSleet'],
	[WeatherCode.ModerateOrHeavySleet, 'LightSnow'],
	[WeatherCode.PatchyLightSnow, 'LightSnowShowers'],
	[WeatherCode.LightSnow, 'LightSnowShowers'],
	[WeatherCode.PatchyModerateSnow, 'HeavySnow'],
	[WeatherCode.ModerateSnow, 'HeavySnow'],
	[WeatherCode.PatchyHeavySnow, 'HeavySnowShowers'],
	[WeatherCode.HeavySnow, 'HeavySnow'],
	[WeatherCode.IcePellets, 'LightSleet'],
	[WeatherCode.LightRainShower, 'LightShowers'],
	[WeatherCode.ModerateOrHeavyRainShower, 'HeavyShowers'],
	[WeatherCode.TorrentialRainShower, 'HeavyShowers'],
	[WeatherCode.LightSleetShowers, 'LightSleetShowers'],
	[WeatherCode.ModerateOrHeavySleetShowers, 'LightSleetShowers'],
	[WeatherCode.LightSnowShowers, 'LightSnowShowers'],
	[WeatherCode.ModerateOrHeavySnowShowers, 'LightSnowShowers'],
	[WeatherCode.LightShowersOfIcePellets, 'LightSleetShowers'],
	[WeatherCode.ModerateOrHeavyShowersOfIcePellets, 'LightSleet'],
	[WeatherCode.PatchyLightRainInAreaWithThunder, 'ThunderyShowers'],
	[WeatherCode.ModerateOrHeavyRainInAreaWithThunder, 'ThunderyHeavyRain'],
	[WeatherCode.PatchyLightSnowInAreaWithThunder, 'ThunderySnowShowers'],
	[WeatherCode.ModerateOrHeavySnowInAreaWithThunder, 'ThunderySnowShowers']
]);

/**
 * Retrieves the name of the weather based on the provided weather code.
 * @param code The weather code.
 * @returns The name of the weather.
 * @throws Error if the provided code is not available.
 */
export function getWeatherName(code: WeatherCode): WeatherName {
	const name = getWeatherNameMap.get(code);
	if (name === undefined) throw new Error(`The code '${code}' is not available.`);
	return name;
}

/**
 * Retrieves weather data for a given query and language.
 * @param query - The query string for the weather data.
 * @param lang - The language code for the weather data.
 * @returns A promise that resolves to a Result object containing either the weather data or an error identifier.
 */
export async function getWeatherData(query: string, lang: string): Promise<Result<Weather, Identifiers>> {
	const url = new URL(`${BaseUrl}~${encodeURIComponent(query)}`);
	url.searchParams.append('format', 'j1');
	url.searchParams.append('lang', lang);

	const result = await Text(safeTimedFetch(url, 2000));
	return result.match({
		ok: (value) => getDataOk(value),
		err: (error) => getDataErr(error)
	});
}

function getDataOk(value: string) {
	// JSON object:
	if (value.startsWith('{')) {
		return Result.from(() => JSON.parse(value) as Weather).mapErr(() => Identifiers.InvalidJsonBody);
	}

	// Yes, wttr.in returns 200 OK on errors (ref: https://github.com/chubin/wttr.in/issues/591).
	// "Unknown location; ..." message:
	if (value.startsWith('Unknown location')) {
		return err(Identifiers.UnknownLocation);
	}

	return err(Identifiers.UnknownError);
}

function getDataErr(error: FetchError) {
	if (isAbortError(error)) return err(Identifiers.AbortError);
	if (error.code === 403) return err(Identifiers.BlockedLocation);
	if (error.code === 429) return err(Identifiers.RateLimited);
	if (error.code === 500) return err(Identifiers.RemoteServerError);
	if (error.code === 503) return err(Identifiers.ServiceUnavailable);

	return err(Identifiers.UnknownError);
}

/**
 * Enum representing weather codes.
 * Each weather condition is associated with a specific code.
 */
export const enum WeatherCode {
	ClearOrSunny = '113',
	PartlyCloudy = '116',
	Cloudy = '119',
	Overcast = '122',
	Mist = '143',
	PatchyRainNearby = '176',
	PatchySnowNearby = '179',
	PatchySleetNearby = '182',
	PatchyFreezingDrizzleNearby = '185',
	ThunderyOutbreaksInNearby = '200',
	BlowingSnow = '227',
	Blizzard = '230',
	Fog = '248',
	FreezingFog = '260',
	PatchyLightDrizzle = '263',
	LightDrizzle = '266',
	FreezingDrizzle = '281',
	HeavyFreezingDrizzle = '284',
	PatchyLightRain = '293',
	LightRain = '296',
	ModerateRainAtTimes = '299',
	ModerateRain = '302',
	HeavyRainAtTimes = '305',
	HeavyRain = '308',
	LightFreezingRain = '311',
	ModerateOrHeavyFreezingRain = '314',
	LightSleet = '317',
	ModerateOrHeavySleet = '320',
	PatchyLightSnow = '323',
	LightSnow = '326',
	PatchyModerateSnow = '329',
	ModerateSnow = '332',
	PatchyHeavySnow = '335',
	HeavySnow = '338',
	IcePellets = '350',
	LightRainShower = '353',
	ModerateOrHeavyRainShower = '356',
	TorrentialRainShower = '359',
	LightSleetShowers = '362',
	ModerateOrHeavySleetShowers = '365',
	LightSnowShowers = '368',
	ModerateOrHeavySnowShowers = '371',
	LightShowersOfIcePellets = '374',
	ModerateOrHeavyShowersOfIcePellets = '377',
	PatchyLightRainInAreaWithThunder = '386',
	ModerateOrHeavyRainInAreaWithThunder = '389',
	PatchyLightSnowInAreaWithThunder = '392',
	ModerateOrHeavySnowInAreaWithThunder = '395'
}

/**
 * Enum representing different types of identifiers.
 * These identifiers are used to categorize different types of errors or events.
 */
export enum Identifiers {
	AbortError = 'AbortError',
	BlockedLocation = 'BlockedLocation',
	RateLimited = 'RateLimited',
	RemoteServerError = 'RemoteServerError',
	ServiceUnavailable = 'ServiceUnavailable',
	UnknownError = 'UnknownError',
	InvalidJsonBody = 'InvalidJsonBody',
	UnknownLocation = 'UnknownLocation'
}

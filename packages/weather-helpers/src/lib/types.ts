import type { WeatherCode } from './enums';

/** Represents a stringified bigint */
export type IntegerString = `${bigint}`;

/** Represents a stringified number */
export type FloatString = `${number}`;

/** Represents a weather object */
export interface Weather {
	current_condition: CurrentCondition[];
	nearest_area: NearestArea[];
	request: Request[];
	weather: WeatherElement[];
}

/** Represents the current weather conditions */
export interface CurrentCondition {
	FeelsLikeC: IntegerString;
	FeelsLikeF: IntegerString;
	cloudcover: IntegerString;
	humidity: IntegerString;
	localObsDateTime: Date;
	observation_time: Hour;
	precipInches: FloatString;
	precipMM: FloatString;
	pressure: IntegerString;
	pressureInches: IntegerString;
	temp_C: IntegerString;
	temp_F: IntegerString;
	uvIndex: IntegerString;
	visibility: IntegerString;
	visibilityMiles: IntegerString;
	weatherCode: WeatherCode;
	weatherDesc: WeatherDescription[];
	weatherIconUrl: Url[];
	winddir16Point: WindDirection;
	winddirDegree: IntegerString;
	windspeedKmph: IntegerString;
	windspeedMiles: IntegerString;
}

/** Represents a weather description */
export interface WeatherDescription {
	value: WeatherName;
}

/** Represents different possible weather conditions */
export type WeatherName =
	| 'Cloudy'
	| 'Fog'
	| 'HeavyRain'
	| 'HeavyShowers'
	| 'HeavySnow'
	| 'HeavySnowShowers'
	| 'LightRain'
	| 'LightShowers'
	| 'LightSleet'
	| 'LightSleetShowers'
	| 'LightSnow'
	| 'LightSnowShowers'
	| 'PartlyCloudy'
	| 'Sunny'
	| 'ThunderyHeavyRain'
	| 'ThunderyShowers'
	| 'ThunderySnowShowers'
	| 'VeryCloudy';

/** Represents the nearest area */
export interface NearestArea {
	areaName: ValueWrapper[];
	country: ValueWrapper[];
	latitude: FloatString;
	longitude: FloatString;
	population: IntegerString;
	region: ValueWrapper[];
	weatherUrl: Url[];
}

/** Represents a value wrapper */
export interface ValueWrapper {
	value: string;
}

/** Represents a URL */
export interface Url {
	value: string;
}

/** Represents a request */
export interface Request {
	query: string;
	type: 'LatLon';
}

/** Represents a weather element */
export interface WeatherElement {
	astronomy: Astronomy[];
	avgtempC: IntegerString;
	avgtempF: IntegerString;
	date: Date;
	hourly: Hourly[];
	maxtempC: IntegerString;
	maxtempF: IntegerString;
	mintempC: IntegerString;
	mintempF: IntegerString;
	sunHour: FloatString;
	totalSnow_cm: FloatString;
	uvIndex: IntegerString;
}

/** Represents astronomy data */
export interface Astronomy {
	moon_illumination: IntegerString;
	moon_phase: MoonPhase;
	moonrise: Hour;
	moonset: Hour;
	sunrise: Hour;
	sunset: Hour;
}

/** Represents different moon phases */
export type MoonPhase =
	| 'New Moon'
	| 'Waxing Crescent'
	| 'First Quarter'
	| 'Waxing Gibbous'
	| 'Full Moon'
	| 'Waning Gibbous'
	| 'Last Quarter'
	| 'Waning Crescent';

/** Represents a time in the format of hours and minutes */
export type Hour = `${bigint}:${bigint} ${'AM' | 'PM'}`;

/** Represents hourly weather data */
export interface Hourly {
	DewPointC: IntegerString;
	DewPointF: IntegerString;
	FeelsLikeC: IntegerString;
	FeelsLikeF: IntegerString;
	HeatIndexC: IntegerString;
	HeatIndexF: IntegerString;
	WindChillC: IntegerString;
	WindChillF: IntegerString;
	WindGustKmph: IntegerString;
	WindGustMiles: IntegerString;
	chanceoffog: IntegerString;
	chanceoffrost: IntegerString;
	chanceofhightemp: IntegerString;
	chanceofovercast: IntegerString;
	chanceofrain: IntegerString;
	chanceofremdry: IntegerString;
	chanceofsnow: IntegerString;
	chanceofsunshine: IntegerString;
	chanceofthunder: IntegerString;
	chanceofwindy: IntegerString;
	cloudcover: IntegerString;
	humidity: IntegerString;
	precipInches: FloatString;
	precipMM: FloatString;
	pressure: IntegerString;
	pressureInches: FloatString;
	tempC: IntegerString;
	tempF: IntegerString;
	time: IntegerString;
	uvIndex: IntegerString;
	visibility: IntegerString;
	visibilityMiles: IntegerString;
	weatherCode: WeatherCode;
	weatherDesc: WeatherDescription[];
	weatherIconUrl: Url[];
	winddir16Point: WindDirection;
	winddirDegree: IntegerString;
	windspeedKmph: IntegerString;
	windspeedMiles: IntegerString;
}

/** Represents wind direction from the north */
export type WindDirectionNorth = 'N' | 'NNE';

/** Represents wind direction from the northeast */
export type WindDirectionNorthEast = 'NE' | 'ENE';

/** Represents wind direction from the east */
export type WindDirectionEast = 'E' | 'ESE';

/** Represents wind direction from the southeast */
export type WindDirectionSouthEast = 'SE' | 'SSE';

/** Represents wind direction from the south */
export type WindDirectionSouth = 'S' | 'SSW';

/** Represents wind direction from the southwest */
export type WindDirectionSouthWest = 'SW' | 'WSW';

/** Represents wind direction from the west */
export type WindDirectionWest = 'W' | 'WNW';

/** Represents wind direction from the northwest */
export type WindDirectionNorthWest = 'NW' | 'NNW';

/** Represents all possible wind directions */
export type WindDirection =
	| WindDirectionNorth
	| WindDirectionNorthEast
	| WindDirectionEast
	| WindDirectionSouthEast
	| WindDirectionSouth
	| WindDirectionSouthWest
	| WindDirectionWest
	| WindDirectionNorthWest;

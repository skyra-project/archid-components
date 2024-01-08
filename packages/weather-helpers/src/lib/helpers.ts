/**
 * Converts kilometers per hour to meters per second.
 *
 * @param kmh The speed in kilometers per hour.
 * @returns The speed in meters per second.
 */
export function kilometersPerHourToMetersPerSecond(kmh: number): number {
	return kmh / 3.6;
}

/**
 * Converts Celsius temperature to Kelvin.
 * @param celsius The temperature in Celsius.
 * @returns The temperature in Kelvin.
 */
export function celsiusToKelvin(celsius: number): number {
	return celsius + 273.15;
}

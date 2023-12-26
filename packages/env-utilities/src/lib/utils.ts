import type { Env, EnvAny, EnvArray, EnvBoolean, EnvInteger, EnvNumber, EnvString } from './types';

export function envParseInteger(key: EnvInteger, defaultValue?: number): number;
export function envParseInteger(key: EnvInteger, defaultValue: number | null): number | null;
export function envParseInteger(key: EnvInteger, defaultValue?: number | null): number | null {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be an integer, but is empty or undefined.`);
		return defaultValue;
	}

	const integer = Number(value);
	if (Number.isInteger(integer)) return integer;
	throw new TypeError(`[ENV] ${key} - The key must be an integer, but received '${value}'.`);
}

export function envParseNumber(key: EnvNumber, defaultValue?: number): number;
export function envParseNumber(key: EnvNumber, defaultValue: number | null): number | null;
export function envParseNumber(key: EnvNumber, defaultValue?: number | null): number | null {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be a number, but is empty or undefined.`);
		return defaultValue;
	}

	const integer = Number(value);
	if (!Number.isNaN(integer)) return integer;
	throw new TypeError(`[ENV] ${key} - The key must be a number, but received '${value}'.`);
}

export function envParseBoolean(key: EnvBoolean, defaultValue?: boolean): boolean;
export function envParseBoolean(key: EnvBoolean, defaultValue: boolean | null): boolean | null;
export function envParseBoolean(key: EnvBoolean, defaultValue?: boolean | null): boolean | null {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be a boolean, but is empty or undefined.`);
		return defaultValue;
	}

	if (value.length === 4 && value.toLowerCase() === 'true') return true;
	if (value.length === 5 && value.toLowerCase() === 'false') return false;
	throw new TypeError(`[ENV] ${key} - The key must be a boolean, but received '${value}'.`);
}

export function envParseString<K extends EnvString>(key: K, defaultValue?: Env[K]): NonNullable<Env[K]>;
export function envParseString<K extends EnvString>(key: K, defaultValue: Env[K] | null): NonNullable<Env[K]> | null;
export function envParseString<K extends EnvString>(key: K, defaultValue?: Env[K] | null): NonNullable<Env[K]> | null {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be a string, but is empty or undefined.`);
		return defaultValue!;
	}

	return value!;
}

export function envParseArray(key: EnvArray, defaultValue?: string[]): string[];
export function envParseArray(key: EnvArray, defaultValue: string[] | null): string[] | null;
export function envParseArray(key: EnvArray, defaultValue?: string[] | null): string[] | null {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be an array, but is empty or undefined.`);
		return defaultValue;
	}

	return value.split(' ');
}

/**
 * Checks if the value of the specified environment variable is null.
 * @param key - The name of the environment variable.
 * @returns Whether the value of the specified environment variable is:
 * - The string `"0"`
 * - The string `"null"`, case insensitive
 */
export function envIsNull(key: EnvAny): boolean {
	const value = process.env[key];
	return typeof value === 'string' && (value === '0' || (value.length === 4 && value.toLowerCase() === 'null'));
}

/**
 * Checks if the value of the specified environment variable is undefined.
 * @param key - The name of the environment variable.
 * @returns Whether the value of the specified environment variable is:
 * - `undefined`
 * - An empty string (`""`)
 */
export function envIsUndefined(key: EnvAny): boolean {
	const value = process.env[key];
	return value === undefined || value.length === 0;
}

/**
 * Checks if the value of the specified environment variable is nullish.
 * @param key - The name of the environment variable.
 * @returns Whether the value of the specified environment variable is:
 * - `undefined`
 * - An empty string (`""`)
 * - The string `"0"`
 * - The string `"null"`, case insensitive
 */
export function envIsNullish(key: EnvAny): boolean {
	return envIsUndefined(key) || envIsNull(key);
}

/**
 * Checks if any of the specified environment variables is defined.
 * @param key - The name of the environment variable.
 * @returns Whether the value of any of the specified environment variables is a non-empty string
 */
export function envIsDefined(...keys: readonly EnvAny[]): boolean {
	return keys.every((key) => !envIsUndefined(key));
}

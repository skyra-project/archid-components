import type { Env, EnvAny, EnvBoolean, EnvInteger, EnvNumber, EnvString } from './types';

export function envParseInteger(key: EnvInteger, defaultValue?: number): number {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be an integer, but is empty or undefined.`);
		return defaultValue;
	}

	const integer = Number(value);
	if (Number.isInteger(integer)) return integer;
	throw new TypeError(`[ENV] ${key} - The key must be an integer, but received '${value}'.`);
}

export function envParseNumber(key: EnvNumber, defaultValue?: number): number {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be a number, but is empty or undefined.`);
		return defaultValue;
	}

	const integer = Number(value);
	if (!Number.isNaN(integer)) return integer;
	throw new TypeError(`[ENV] ${key} - The key must be a number, but received '${value}'.`);
}

export function envParseBoolean(key: EnvBoolean, defaultValue?: boolean): boolean {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be a boolean, but is empty or undefined.`);
		return defaultValue;
	}

	if (value === 'true') return true;
	if (value === 'false') return false;
	throw new TypeError(`[ENV] ${key} - The key must be a boolean, but received '${value}'.`);
}

export function envParseString<K extends EnvString>(key: K, defaultValue?: Env[K]): Env[K] {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be a string, but is empty or undefined.`);
		return defaultValue;
	}

	return value;
}

export function envParseArray(key: EnvString, defaultValue?: string[]): string[] {
	const value = process.env[key];
	if (!value) {
		if (defaultValue === undefined) throw new ReferenceError(`[ENV] ${key} - The key must be an array, but is empty or undefined.`);
		return defaultValue;
	}

	return value.split(' ');
}

export function envIsDefined(...keys: readonly EnvAny[]): boolean {
	return keys.every((key) => {
		const value = process.env[key];
		return value !== undefined && value.length !== 0;
	});
}

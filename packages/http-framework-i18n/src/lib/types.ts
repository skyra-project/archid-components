import type { NonNullObject } from '@sapphire/utilities';

export type TypedT<TCustom = string> = string & { __type__: TCustom };

export type TypedFT<TArgs extends NonNullObject = NonNullObject, TReturn = string> = string & { __args__: TArgs; __return__: TReturn };

export interface Value<T = string> {
	value: T;
}

export interface Values<T = string> {
	values: readonly T[];
	count: number;
}

export interface Difference<T = string> {
	previous: T;
	next: T;
}

export type LocalePrefixKey = `commands/${string}:${string}`;

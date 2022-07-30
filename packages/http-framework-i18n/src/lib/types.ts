import type { NonNullObject } from '@sapphire/utilities';
import type { LocalizationMap } from 'discord-api-types/v10';

export type TypedT<TCustom = string> = string & { __type__: TCustom };

export function T<TCustom = string>(k: string): TypedT<TCustom> {
	return k as TypedT<TCustom>;
}

export type TypedFT<TArgs extends NonNullObject = NonNullObject, TReturn = string> = string & { __args__: TArgs; __return__: TReturn };

export function FT<TArgs extends NonNullObject = NonNullObject, TReturn = string>(k: string): TypedFT<TArgs, TReturn> {
	return k as TypedFT<TArgs, TReturn>;
}

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

export interface BuilderWithNameAndDescription {
	setName(name: string): this;
	setNameLocalizations(localizedNames: LocalizationMap | null): this;
	setDescription(description: string): this;
	setDescriptionLocalizations(localizedDescriptions: LocalizationMap | null): this;
}

export type LocalePrefixKey = `commands/${string}:${string}`;

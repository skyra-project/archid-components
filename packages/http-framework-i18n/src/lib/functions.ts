import type { NonNullObject } from '@sapphire/utilities';
import type { TypedFT, TypedT } from './types.js';

export function T<TCustom = string>(k: string): TypedT<TCustom> {
	return k as TypedT<TCustom>;
}

export function FT<TArgs extends NonNullObject = NonNullObject, TReturn = string>(k: string): TypedFT<TArgs, TReturn> {
	return k as TypedFT<TArgs, TReturn>;
}

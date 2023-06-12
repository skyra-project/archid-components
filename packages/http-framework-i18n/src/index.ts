export { default as i18next, type InitOptions, type TFunction, type TOptions, type TOptionsBase } from 'i18next';
export * from './lib/functions.js';
export * from './lib/registry.js';
export type * from './lib/types.js';
export * from './lib/utils.js';

import type { NonNullObject } from '@sapphire/utilities';
import type { TypedFT, TypedT } from './lib/types.js';

declare module 'i18next' {
	export interface TFunction {
		lng: string;
		ns?: string;

		<TReturn>(key: TypedT<TReturn>, options?: TOptionsBase | string): TReturn;
		<TReturn>(key: TypedT<TReturn>, defaultValue: TReturn, options?: TOptionsBase | string): TReturn;
		<TArgs extends NonNullObject, TReturn>(key: TypedFT<TArgs, TReturn>, options?: TOptions<TArgs>): TReturn;
		<TArgs extends NonNullObject, TReturn>(key: TypedFT<TArgs, TReturn>, defaultValue: TReturn, options?: TOptions<TArgs>): TReturn;
	}
}

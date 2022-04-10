export { default as i18next, type InitOptions, type TFunction, type TOptions, type TOptionsBase } from 'i18next';
export * from './lib/registry';
export * from './lib/types';
export * from './lib/utils';

import type { NonNullObject } from '@sapphire/utilities';
import type { CustomFunctionGet, CustomGet } from './lib/types';

declare module 'i18next' {
	export interface TFunction {
		lng: string;
		ns?: string;

		<K extends string, TReturn>(key: CustomGet<K, TReturn>, options?: TOptionsBase | string): TReturn;
		<K extends string, TReturn>(key: CustomGet<K, TReturn>, defaultValue: TReturn, options?: TOptionsBase | string): TReturn;
		<K extends string, TArgs extends NonNullObject, TReturn>(key: CustomFunctionGet<K, TArgs, TReturn>, options?: TOptions<TArgs>): TReturn;
		<K extends string, TArgs extends NonNullObject, TReturn>(
			key: CustomFunctionGet<K, TArgs, TReturn>,
			defaultValue: TReturn,
			options?: TOptions<TArgs>
		): TReturn;
	}
}

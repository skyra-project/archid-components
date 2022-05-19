import type { NonNullObject } from '@sapphire/utilities';
import type { APIInteraction, APIPingInteraction, LocaleString } from 'discord-api-types/v10';
import type { TFunction, TOptions, TOptionsBase } from 'i18next';
import { getT, loadedLocales } from './registry';
import type { TypedFT, TypedT } from './types';

export type Interaction = Exclude<APIInteraction, APIPingInteraction>;

export function getSupportedUserLanguageName(interaction: Interaction): LocaleString {
	if (loadedLocales.has(interaction.locale)) return interaction.locale;
	if (interaction.guild_locale && loadedLocales.has(interaction.guild_locale)) return interaction.guild_locale;
	return 'en-US';
}

export function getSupportedUserLanguageT(interaction: Interaction): TFunction {
	return getT(getSupportedUserLanguageName(interaction));
}

export function getSupportedLanguageName(interaction: Interaction): LocaleString {
	if (interaction.guild_id) {
		if (interaction.guild_locale && loadedLocales.has(interaction.guild_locale)) return interaction.guild_locale;
	} else if (loadedLocales.has(interaction.locale)) {
		return interaction.locale;
	}
	return 'en-US';
}

export function getSupportedLanguageT(interaction: Interaction): TFunction {
	return getT(getSupportedLanguageName(interaction));
}

export function resolveUserKey<TReturn>(interaction: Interaction, key: TypedT<TReturn>, options?: TOptionsBase | string): TReturn;
export function resolveUserKey<TReturn>(
	interaction: Interaction,
	key: TypedT<TReturn>,
	defaultValue: TReturn,
	options?: TOptionsBase | string
): TReturn;
export function resolveUserKey<TArgs extends NonNullObject, TReturn>(
	interaction: Interaction,
	key: TypedFT<TArgs, TReturn>,
	options?: TOptions<TArgs>
): TReturn;
export function resolveUserKey<TArgs extends NonNullObject, TReturn>(
	interaction: Interaction,
	key: TypedFT<TArgs, TReturn>,
	defaultValue: TReturn,
	options?: TOptions<TArgs>
): TReturn;
export function resolveUserKey(interaction: Interaction, ...args: [any, any, any?]) {
	return getSupportedUserLanguageT(interaction)(...args);
}

export function resolveKey<TReturn>(interaction: Interaction, key: TypedT<TReturn>, options?: TOptionsBase | string): TReturn;
export function resolveKey<TReturn>(interaction: Interaction, key: TypedT<TReturn>, defaultValue: TReturn, options?: TOptionsBase | string): TReturn;
export function resolveKey<TArgs extends NonNullObject, TReturn>(
	interaction: Interaction,
	key: TypedFT<TArgs, TReturn>,
	options?: TOptions<TArgs>
): TReturn;
export function resolveKey<TArgs extends NonNullObject, TReturn>(
	interaction: Interaction,
	key: TypedFT<TArgs, TReturn>,
	defaultValue: TReturn,
	options?: TOptions<TArgs>
): TReturn;
export function resolveKey(interaction: Interaction, ...args: [any, any, any?]) {
	return getSupportedLanguageT(interaction)(...args);
}

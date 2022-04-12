import type { NonNullObject } from '@sapphire/utilities';
import type { APIApplicationCommandInteraction, LocaleString } from 'discord-api-types/v10';
import type { TOptions, TOptionsBase } from 'i18next';
import { getT, loadedLocales } from './registry';
import type { TypedFT, TypedT } from './types';

export function getSupportedUserLanguageName(interaction: APIApplicationCommandInteraction): LocaleString {
	if (loadedLocales.has(interaction.locale)) return interaction.locale;
	if (interaction.guild_locale && loadedLocales.has(interaction.guild_locale)) return interaction.guild_locale;
	return 'en-US';
}

export function getSupportedLanguageName(interaction: APIApplicationCommandInteraction): LocaleString {
	if (interaction.guild_id) {
		if (interaction.guild_locale && loadedLocales.has(interaction.guild_locale)) return interaction.guild_locale;
	} else if (loadedLocales.has(interaction.locale)) {
		return interaction.locale;
	}
	return 'en-US';
}

export function resolveUserKey<TReturn>(
	interaction: APIApplicationCommandInteraction,
	key: TypedT<TReturn>,
	options?: TOptionsBase | string
): TReturn;
export function resolveUserKey<TReturn>(
	interaction: APIApplicationCommandInteraction,
	key: TypedT<TReturn>,
	defaultValue: TReturn,
	options?: TOptionsBase | string
): TReturn;
export function resolveUserKey<TArgs extends NonNullObject, TReturn>(
	interaction: APIApplicationCommandInteraction,
	key: TypedFT<TArgs, TReturn>,
	options?: TOptions<TArgs>
): TReturn;
export function resolveUserKey<TArgs extends NonNullObject, TReturn>(
	interaction: APIApplicationCommandInteraction,
	key: TypedFT<TArgs, TReturn>,
	defaultValue: TReturn,
	options?: TOptions<TArgs>
): TReturn;
export function resolveUserKey(interaction: APIApplicationCommandInteraction, ...args: [any, any, any?]) {
	return getT(getSupportedUserLanguageName(interaction))(...args);
}

export function resolveKey<TReturn>(interaction: APIApplicationCommandInteraction, key: TypedT<TReturn>, options?: TOptionsBase | string): TReturn;
export function resolveKey<TReturn>(
	interaction: APIApplicationCommandInteraction,
	key: TypedT<TReturn>,
	defaultValue: TReturn,
	options?: TOptionsBase | string
): TReturn;
export function resolveKey<TArgs extends NonNullObject, TReturn>(
	interaction: APIApplicationCommandInteraction,
	key: TypedFT<TArgs, TReturn>,
	options?: TOptions<TArgs>
): TReturn;
export function resolveKey<TArgs extends NonNullObject, TReturn>(
	interaction: APIApplicationCommandInteraction,
	key: TypedFT<TArgs, TReturn>,
	defaultValue: TReturn,
	options?: TOptions<TArgs>
): TReturn;
export function resolveKey(interaction: APIApplicationCommandInteraction, ...args: [any, any, any?]) {
	return getT(getSupportedLanguageName(interaction))(...args);
}

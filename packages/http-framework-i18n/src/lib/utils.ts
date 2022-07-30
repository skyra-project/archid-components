import { Collection } from '@discordjs/collection';
import type { NonNullObject } from '@sapphire/utilities';
import { lazy } from '@sapphire/utilities';
import type { APIInteraction, APIPingInteraction, LocaleString, LocalizationMap } from 'discord-api-types/v10';
import type { TFunction, TOptions, TOptionsBase } from 'i18next';
import { getT, loadedLocales } from './registry';
import type { BuilderWithNameAndDescription, LocalePrefixKey, TypedFT, TypedT } from './types';

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

const getLocales = lazy(() => new Collection([...loadedLocales].map((locale) => [locale, getT(locale)])));

function getDefaultT() {
	const defaultT = getLocales().get('en-US');
	if (defaultT) return defaultT;
	throw new TypeError('Could not find en-US');
}

export function applyLocalizedBuilder<T extends BuilderWithNameAndDescription>(
	builder: T,
	...params: [root: LocalePrefixKey] | [name: TypedT, description: TypedT]
): T {
	const locales = getLocales();
	const defaultT = getDefaultT();

	const [localeName, localeDescription] = params.length === 1 ? [`${params[0]}Name` as TypedT, `${params[0]}Description` as TypedT] : params;

	return builder
		.setName(defaultT(localeName))
		.setNameLocalizations(Object.fromEntries(locales.map((t, locale) => [locale, t(localeName)])))
		.setDescription(defaultT(localeDescription))
		.setDescriptionLocalizations(Object.fromEntries(locales.map((t, locale) => [locale, t(localeDescription)])));
}

export function createSelectMenuChoiceName<V extends NonNullObject>(nameKey: TypedT, value?: V): createSelectMenuChoiceName.Result<V> {
	const locales = getLocales();
	const defaultT = getDefaultT();

	return {
		...value,
		name: defaultT(nameKey),
		name_localizations: Object.fromEntries(locales.map((t, locale) => [locale, t(nameKey)]))
	} as createSelectMenuChoiceName.Result<V>;
}

export namespace createSelectMenuChoiceName {
	export type Result<V> = V & {
		name: string;
		name_localizations: LocalizationMap;
	};
}

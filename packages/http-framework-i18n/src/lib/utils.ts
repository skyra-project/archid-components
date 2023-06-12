import { Collection } from '@discordjs/collection';
import type { NonNullObject } from '@sapphire/utilities';
import { lazy } from '@sapphire/utilities';
import type { APIInteraction, APIPingInteraction, LocaleString, LocalizationMap } from 'discord-api-types/v10';
import type { TFunction, TOptions, TOptionsBase } from 'i18next';
import { getT, loadedLocales } from './registry.js';
import type { LocalePrefixKey, TypedFT, TypedT } from './types.js';

export type Interaction = Pick<Exclude<APIInteraction, APIPingInteraction>, 'locale' | 'guild_locale' | 'guild_id'>;

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
const getDefaultT = lazy(() => {
	const defaultT = getLocales().get('en-US');
	if (defaultT) return defaultT;
	throw new TypeError('Could not find en-US');
});

/**
 * Gets the value and the localizations from a language key.
 * @param key The key to get the localizations from.
 * @returns The retrieved data.
 * @remarks This should be called **strictly** after loading the locales.
 */
export function getLocalizedData(key: TypedT): LocalizedData {
	const locales = getLocales();
	const defaultT = getDefaultT();

	return {
		value: defaultT(key),
		localizations: Object.fromEntries(locales.map((t, locale) => [locale, t(key)]))
	};
}

/**
 * Applies the localized names on the builder, calling `setName` and `setNameLocalizations`.
 * @param builder The builder to apply the localizations to.
 * @param key The key to get the localizations from.
 * @returns The updated builder.
 */
export function applyNameLocalizedBuilder<T extends BuilderWithName>(builder: T, key: TypedT) {
	const result = getLocalizedData(key);
	return builder.setName(result.value).setNameLocalizations(result.localizations);
}

/**
 * Applies the localized descriptions on the builder, calling `setDescription` and `setDescriptionLocalizations`.
 * @param builder The builder to apply the localizations to.
 * @param key The key to get the localizations from.
 * @returns The updated builder.
 */
export function applyDescriptionLocalizedBuilder<T extends BuilderWithDescription>(builder: T, key: TypedT) {
	const result = getLocalizedData(key);
	return builder.setDescription(result.value).setDescriptionLocalizations(result.localizations);
}

/**
 * Applies the localized names and descriptions on the builder, calling {@link applyNameLocalizedBuilder} and
 * {@link applyDescriptionLocalizedBuilder}.
 * @param builder The builder to apply the localizations to.
 * @param params The root key or the key for the name and description keys.
 * @returns The updated builder.
 * @remarks If only 2 parameters were passed, `name` will be defined as `${root}Name` and `description` as
 * `${root}Description`, being `root` the second parameter in the function, after `builder`.
 */
export function applyLocalizedBuilder<T extends BuilderWithNameAndDescription>(
	builder: T,
	...params: [root: LocalePrefixKey] | [name: TypedT, description: TypedT]
): T {
	const [localeName, localeDescription] = params.length === 1 ? [`${params[0]}Name` as TypedT, `${params[0]}Description` as TypedT] : params;

	applyNameLocalizedBuilder(builder, localeName);
	applyDescriptionLocalizedBuilder(builder, localeDescription);
	return builder;
}

export function createSelectMenuChoiceName<V extends NonNullObject>(key: TypedT, value?: V): createSelectMenuChoiceName.Result<V> {
	const result = getLocalizedData(key);
	return {
		...value,
		name: result.value,
		name_localizations: result.localizations
	} as createSelectMenuChoiceName.Result<V>;
}

export namespace createSelectMenuChoiceName {
	export type Result<V> = V & {
		name: string;
		name_localizations: LocalizationMap;
	};
}

export interface LocalizedData {
	value: string;
	localizations: LocalizationMap;
}

export interface BuilderWithName {
	setName(name: string): this;
	setNameLocalizations(localizedNames: LocalizationMap | null): this;
}

export interface BuilderWithDescription {
	setDescription(description: string): this;
	setDescriptionLocalizations(localizedDescriptions: LocalizationMap | null): this;
}

export type BuilderWithNameAndDescription = BuilderWithName & BuilderWithDescription;

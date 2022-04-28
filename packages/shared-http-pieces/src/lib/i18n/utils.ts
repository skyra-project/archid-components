import { SlashCommandBuilder } from '@discordjs/builders';
import { Collection } from '@discordjs/collection';
import { getT, loadedLocales, TypedT } from '@skyra/http-framework-i18n';

export function generateLocalizedCommandInformation(prefix: `${string}/${string}:${string}`) {
	const locales = new Collection([...loadedLocales].map((locale) => [locale, getT(locale)]));

	const defaultT = locales.get('en-US');
	if (!defaultT) throw new TypeError('Could not find en-US locales');

	const localeCommandName = `${prefix}Name` as TypedT;
	const localeCommandDescription = `${prefix}Description` as TypedT;

	return new SlashCommandBuilder()
		.setName(defaultT(localeCommandName))
		.setNameLocalizations(Object.fromEntries(locales.map((t, locale) => [locale, t(localeCommandName)])))
		.setDescription(defaultT(localeCommandDescription))
		.setDescriptionLocalizations(Object.fromEntries(locales.map((t, locale) => [locale, t(localeCommandDescription)])));
}

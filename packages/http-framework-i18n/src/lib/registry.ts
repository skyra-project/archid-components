import { Collection } from '@discordjs/collection';
import { Backend } from '@skyra/i18next-backend';
import { Locale, type LocaleString } from 'discord-api-types/v10';
import i18next, { getFixedT, InitOptions, TFunction } from 'i18next';
import type { PathLike } from 'node:fs';
import { opendir } from 'node:fs/promises';
import { join } from 'node:path';

i18next.use(Backend);

export const supportedLanguages = new Set(Object.values(Locale)) as ReadonlySet<LocaleString>;
export function isSupportedDiscordLocale(language: string): language is LocaleString {
	return supportedLanguages.has(language as LocaleString);
}

export const loadedLocales = new Set<LocaleString>();
export const loadedNamespaces = new Set<string>();
export const loadedPaths = new Set<string>();
export const loadedFormatters: Formatter[] = [];

export interface Formatter {
	name: string;
	format: (value: any, lng: string | undefined, options: any) => string;
}

export function addFormatters(...formatters: readonly Formatter[]): void {
	loadedFormatters.push(...formatters);
}

export async function init(options?: InitOptions) {
	await i18next.init({
		backend: { paths: [...loadedPaths] },
		ns: [...loadedNamespaces],
		preload: [...loadedLocales],
		initImmediate: false,
		interpolation: {
			escapeValue: false,
			skipOnVariables: false,
			...options?.interpolation
		},
		ignoreJSONStructure: false,
		...options
	});

	for (const { name, format } of loadedFormatters) {
		i18next.services.formatter!.add(name, format);
	}
}

export async function load(directory: PathLike) {
	const dir = await opendir(directory);
	for await (const entry of dir) {
		// If the entry is not a directory, skip:
		if (!entry.isDirectory()) continue;

		// If the locale is not supported by Discord, emit a warning and skip:
		if (!isSupportedDiscordLocale(entry.name)) {
			process.emitWarning('Unsupported Discord locale', {
				code: 'UNSUPPORTED_LOCALE',
				detail: `'${entry.name}' is not assignable to type LocaleString`
			});
			continue;
		}

		// Load the directory:
		loadedLocales.add(entry.name);
		await loadLocale(join(dir.path, entry.name), '');
	}

	loadedPaths.add(dir.path);
}

async function loadLocale(directory: string, ns: string) {
	const dir = await opendir(directory);
	for await (const entry of dir) {
		if (entry.isDirectory()) {
			await loadLocale(join(dir.path, entry.name), `${ns}${entry.name}/`);
		} else if (entry.isFile() && entry.name.endsWith('.json')) {
			loadedNamespaces.add(`${ns}${entry.name.slice(0, -5)}`);
		}
	}
}

const fixedCache = new Collection<LocaleString, TFunction>();
export function getT(locale: LocaleString) {
	if (!loadedLocales.has(locale)) throw new ReferenceError(`Invalid language (${locale})`);
	return fixedCache.ensure(locale, () => getFixedT(locale));
}

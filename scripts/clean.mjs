import { rm } from 'fs/promises';

const rootDir = new URL('../', import.meta.url);
const packagesDir = new URL('packages/', rootDir);
const options = { recursive: true, force: true };

const paths = [
	// Dist folders
	new URL('env-utilities/dist/', packagesDir),
	new URL('http-framework/dist/', packagesDir),
	new URL('http-framework-i18n/dist/', packagesDir),
	new URL('i18next-backend/dist/', packagesDir),
	new URL('logger/dist/', packagesDir),
	new URL('safe-fetch/dist/', packagesDir),
	new URL('shared-http-pieces/dist/', packagesDir),
	new URL('start-banner/dist/', packagesDir),
	new URL('twitch-helpers/dist/', packagesDir),

	// Turbo main cache folder
	new URL('node_modules/.cache/turbo', rootDir),

	// Turbo folders
	new URL('env-utilities/.turbo/', packagesDir),
	new URL('http-framework/.turbo/', packagesDir),
	new URL('http-framework-i18n/.turbo/', packagesDir),
	new URL('i18next-backend/.turbo/', packagesDir),
	new URL('logger/.turbo/', packagesDir),
	new URL('safe-fetch/.turbo/', packagesDir),
	new URL('shared-http-pieces/.turbo/', packagesDir),
	new URL('start-banner/.turbo/', packagesDir),
	new URL('twitch-helpers/.turbo/', packagesDir)
];

await Promise.all(paths.map((path) => rm(path, options)));

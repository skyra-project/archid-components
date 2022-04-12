import type { DotenvConfigOutput } from 'dotenv';
import { config, type DotenvCraOptions } from 'dotenv-cra';
import { fileURLToPath } from 'node:url';
import { envIsDefined, envParseBoolean } from './utils';

export function setup(pathOrOptions?: string | URL | EnvSetupOptions): DotenvConfigOutput {
	// Unless explicitly defined, set NODE_ENV as development:
	process.env.NODE_ENV ??= 'development';

	let options: DotenvCraOptions;
	if (typeof pathOrOptions === 'undefined') {
		options = {};
	} else if (typeof pathOrOptions === 'string') {
		options = { path: pathOrOptions };
	} else if (typeof pathOrOptions === 'object') {
		if (pathOrOptions instanceof URL) {
			options = { path: fileURLToPath(pathOrOptions) };
		} else {
			const { path, ...rest } = pathOrOptions;
			options = { path: typeof path === 'undefined' ? path : typeof path === 'string' ? path : fileURLToPath(path), ...rest };
		}
	} else {
		throw new TypeError('Expected undefined, string, URL, or EnvSetupOptions');
	}

	return config({
		debug: envIsDefined('DOTENV_DEBUG') ? envParseBoolean('DOTENV_DEBUG') : undefined,
		encoding: process.env.DOTENV_ENCODING,
		env: process.env.DOTENV_ENV,
		path: process.env.DOTENV_PATH,
		prefix: process.env.DOTENV_PREFIX,
		...options
	});
}

export interface EnvSetupOptions extends Omit<DotenvCraOptions, 'path'> {
	/**
	 * You may specify a custom path if your file containing environment variables is located elsewhere.
	 */
	path?: string | URL;
}

export type EnvSetupResult = DotenvConfigOutput;

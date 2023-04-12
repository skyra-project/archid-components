import { config as dotenvConfig, type DotenvConfigOptions, type DotenvConfigOutput, type DotenvParseOutput } from 'dotenv';
import { expand } from 'dotenv-expand';
import { existsSync } from 'node:fs';
import { basename, resolve } from 'node:path';

export interface EnvBasedLoaderOptions extends DotenvConfigOptions {
	/**
	 * You may specify a custom environment if `NODE_ENV` isn't sufficient.
	 */
	env?: string;
	/**
	 * You may specify a required prefix for your dotenv variables (ex. `APP_`).
	 */
	prefix?: string;
}

export function config(options?: EnvBasedLoaderOptions): DotenvConfigOutput {
	const log = (message: string): void => {
		options?.debug && console.debug(`[@skyra/env-utilities][DEBUG] ${message}`);
	};

	// Reference:
	// https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-scripts/config/env.js#L18-L23
	if (!process.env.NODE_ENV) {
		throw new Error('The NODE_ENV environment variable is required but was not specified.');
	}

	const env = options?.env || process.env.NODE_ENV;
	const dotenvPath = options?.path || resolve(process.cwd(), '.env');

	/**
	 * @see {@linkplain https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-scripts/config/env.js#L25-L34}
	 */
	const dotenvFiles = [`${dotenvPath}.${env}.local`, process.env.NODE_ENV !== 'test' && `${dotenvPath}.local`, `${dotenvPath}.${env}`, dotenvPath];

	/**
	 * @see {@linkplain https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-scripts/config/env.js#L36-L49}
	 */
	let parsed: DotenvParseOutput = {};

	for (const dotenvFile of dotenvFiles) {
		if (!dotenvFile) {
			continue;
		}

		if (!existsSync(dotenvFile)) {
			log(`\`${basename(dotenvFile)}\` file not found`);
			continue;
		}

		log(`loading \`${basename(dotenvFile)}\``);

		const result = expand(
			dotenvConfig({
				debug: options?.debug,
				encoding: options?.encoding,
				path: dotenvFile
			})
		);

		if (result.error) {
			return result;
		}

		parsed = { ...result.parsed, ...parsed };
	}

	/**
	 * @see {@linkplain https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-scripts/config/env.js#L72-L89}
	 */
	if (options?.prefix) {
		const prefixRegExp = new RegExp(`^${options.prefix}`, 'i');
		parsed = Object.keys(parsed)
			.filter((key) => {
				const match = prefixRegExp.test(key);
				log(`Prefix for key \`${key}\` ${match ? 'matches' : 'does not match'} \`${options.prefix}\``);
				return match;
			})
			.reduce<DotenvParseOutput>((obj, key) => {
				obj[key] = parsed[key];
				return obj;
			}, {});
	}

	return {
		parsed
	};
}

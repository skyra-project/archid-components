import { config, type DotenvConfigOptions, type DotenvConfigOutput, type DotenvParseOutput } from 'dotenv';
import { expand } from 'dotenv-expand';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface EnvLoaderOptions extends Omit<DotenvConfigOptions, 'path'> {
	/**
	 * You may specify a custom environment if `NODE_ENV` isn't sufficient.
	 */
	env?: string;
	/**
	 * You may specify a required prefix for your dotenv variables (ex. `APP_`).
	 */
	prefix?: string;
	/**
	 * Specify a custom path if your file containing environment variables is located elsewhere.
	 * Can also be an array of strings, specifying multiple paths.
	 *
	 * @default `path.resolve(process.cwd(), '.env')`
	 *
	 * @example with CJS
	 * ```typescript
	 * require('@skyra/env-utilities').setup({ path: '/custom/path/to/.env' })
	 * ```
	 * @example with ESM
	 * ```typescript
	 * import { setup } from '@skyra/env-utilities';
	 *
	 * const envFile = new URL('../.env', import.meta.url);
	 * setup({ path: envFile })
	 * ```
	 */
	path?: string | URL;
}

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const packageVersion: string = '[VI]{{inject}}[/VI]';

export function loadEnvFiles(options?: EnvLoaderOptions): DotenvConfigOutput {
	const log = options?.debug
		? (message: string) => console.debug(`[@skyra/env-utilities@${packageVersion}][DEBUG] ${message}`)
		: (_: string) => undefined;

	/**
	 * @see {@linkplain https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-scripts/config/env.js#L18-L23}
	 */
	if (!process.env.NODE_ENV) {
		throw new Error('The NODE_ENV environment variable is required but was not specified.');
	}

	const env = options?.env || process.env.NODE_ENV;
	const dotenvPath = options?.path || resolve(process.cwd(), '.env');

	/**
	 * @see {@linkplain https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-scripts/config/env.js#L25-L34}
	 */
	const dotenvFiles = [`${dotenvPath}.${env}.local`, `${dotenvPath}.${env}`, dotenvPath];

	if (process.env.NODE_ENV !== 'test') {
		dotenvFiles.splice(1, 0, `${dotenvPath}.local`);
	}

	/**
	 * @see {@linkplain https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-scripts/config/env.js#L36-L49}
	 */
	let parsed: DotenvParseOutput = {};

	for (const dotenvFile of dotenvFiles) {
		const dotenvFileString = typeof dotenvFile === 'string' ? dotenvFile : fileURLToPath(dotenvFile);

		log(`loading \`${basename(dotenvFileString)}\``);

		const result = expand(
			config({
				debug: options?.debug,
				encoding: options?.encoding,
				path: dotenvFile
			})
		);

		if (result.error) {
			if ((result.error as FSError).code === 'ENOENT') {
				log(`\`${basename(dotenvFileString)}\` file not found`);
				continue;
			}

			throw result.error;
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

interface FSError extends Error {
	code: string;
}

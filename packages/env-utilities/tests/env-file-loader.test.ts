import { readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { EnvLoaderOptions, loadEnvFiles } from '../src/lib/env-loader';

const originalNodeEnv = process.env.NODE_ENV;
const fixturesDirectory = resolve(__dirname, 'fixtures');
const envLoaderConfig: EnvLoaderOptions = {
	path: resolve(fixturesDirectory, '.env')
};

function makeDotenvConfigFiles(
	files: [file: string, envVars: Record<string, string>][] = [
		['.env.development.local', { FIRST: 'FIRST', SAME: 'SAME' }],
		['.env.development', { SECOND: 'SECOND' }],
		['.env.local', { THIRD: 'THIRD' }],
		['.env', { FOURTH: 'FOURTH', SAME: 'DIFFERENT' }]
	]
) {
	for (const [file, envVars] of files) {
		writeFileSync(
			resolve(fixturesDirectory, file),
			Object.entries(envVars)
				.map(([key, value]) => `${key}=${value}`)
				.join('\n')
		);
	}
}

describe('Env file Loader', () => {
	beforeEach(() => {
		process.env.NODE_ENV = originalNodeEnv;
		makeDotenvConfigFiles();

		// Reset all environment variables
		delete process.env.FIRST;
		delete process.env.SECOND;
		delete process.env.THIRD;
		delete process.env.FOURTH;
		delete process.env.SAME;
		delete process.env.STAGING;
		delete process.env.MY_APP_SETTING;
		delete process.env.NOT_MY_SETTING;
		delete process.env.MY_APP_SETTING_2;
	});

	afterEach(() => {
		vi.restoreAllMocks();

		for (const file of readdirSync(fixturesDirectory)) {
			if (file === '.gitignore' || file === '.gitkeep') continue;
			rmSync(resolve(fixturesDirectory, file));
		}
	});

	test('should successfully configure', () => {
		process.env.NODE_ENV = 'development';

		const output = loadEnvFiles(envLoaderConfig);

		expect(output.error).toBeFalsy();
		expect(output.parsed).toBeTruthy();
		expect(output.parsed).toEqual({
			FIRST: 'FIRST',
			SECOND: 'SECOND',
			THIRD: 'THIRD',
			FOURTH: 'FOURTH',
			SAME: 'SAME'
		});
	});

	test('should error if NODE_ENV not set', () => {
		delete process.env.NODE_ENV;
		expect(loadEnvFiles).toThrowError('The NODE_ENV environment variable is required but was not specified.');
	});

	test('should allow override of NODE_ENV when `env` supplied in options', () => {
		process.env.NODE_ENV = 'development';

		makeDotenvConfigFiles([['.env.staging.local', { STAGING: 'STAGING' }]]);

		loadEnvFiles({ ...envLoaderConfig, env: 'staging' });

		expect(process.env.STAGING).toEqual('STAGING');
	});

	test('should log files loaded and file that do not exist when `debug` supplied in options', () => {
		process.env.NODE_ENV = 'development';

		const consoleLogSpy = vi.spyOn(console, 'debug');

		loadEnvFiles({ ...envLoaderConfig, debug: true });

		expect(consoleLogSpy).toBeCalledTimes(4);
		expect(consoleLogSpy.mock.calls[0][0]).toEqual('[@skyra/env-utilities@[VI]{{inject}}[/VI]][DEBUG] loading `.env.development.local`');
		expect(consoleLogSpy.mock.calls[1][0]).toEqual('[@skyra/env-utilities@[VI]{{inject}}[/VI]][DEBUG] loading `.env.local`');
		expect(consoleLogSpy.mock.calls[2][0]).toEqual('[@skyra/env-utilities@[VI]{{inject}}[/VI]][DEBUG] loading `.env.development`');
		expect(consoleLogSpy.mock.calls[3][0]).toEqual('[@skyra/env-utilities@[VI]{{inject}}[/VI]][DEBUG] loading `.env`');
	});

	test('should exclude .env.local when NODE_ENV set to test', () => {
		process.env.NODE_ENV = 'test';

		loadEnvFiles(envLoaderConfig);

		expect(process.env.THIRD).toBeUndefined();

		process.env.NODE_ENV = 'development';

		loadEnvFiles(envLoaderConfig);

		expect(process.env.THIRD).toEqual('THIRD');
	});

	test('should filter out values when provided prefix does not match', () => {
		process.env.NODE_ENV = 'development';

		makeDotenvConfigFiles([
			['.env.local', { MY_APP_SETTING: 'FOO' }],
			['.env', { NOT_MY_SETTING: 'BAR', MY_APP_SETTING_2: 'BAZ' }]
		]);

		const output = loadEnvFiles({ ...envLoaderConfig, prefix: 'MY_APP_' });

		expect(output.error).toBeFalsy();
		expect(output.parsed).toBeTruthy();
		expect(output.parsed).toEqual({
			MY_APP_SETTING: 'FOO',
			MY_APP_SETTING_2: 'BAZ'
		});
	});
});

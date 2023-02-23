import { relative, resolve as resolveDir } from 'node:path';
import { defineConfig, type Options } from 'tsup';

const defaultConfigOptions: ConfigOptions = {
	globalName: undefined,
	format: ['esm', 'cjs'],
	target: 'es2021',
	sourcemap: true,
	esbuildOptions: (options, context) => {
		if (context.format === 'cjs') {
			options.banner = {
				js: '"use strict";'
			};
		}
	}
};

export const createTsupConfig = ({
	globalName = undefined,
	format = ['esm', 'cjs'],
	target = 'es2021',
	sourcemap = true,
	esbuildPlugins,
	esbuildOptions = (options, context) => {
		if (context.format === 'cjs') {
			options.banner = {
				js: '"use strict";'
			};
		}
	}
}: ConfigOptions = defaultConfigOptions) =>
	defineConfig({
		clean: true,
		dts: true,
		entry: ['src/index.ts'],
		format,
		minify: false,
		skipNodeModulesBundle: true,
		sourcemap,
		target,
		tsconfig: relative(__dirname, resolveDir(process.cwd(), 'src', 'tsconfig.json')),
		keepNames: true,
		globalName,
		esbuildPlugins,
		esbuildOptions
	});

type ConfigOptions = Pick<Options, 'esbuildOptions' | 'esbuildPlugins' | 'sourcemap' | 'target' | 'format' | 'globalName'>;

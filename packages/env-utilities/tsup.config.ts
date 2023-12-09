import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';
import type { Options } from 'tsup';
import { createTsupConfig } from '../../scripts/tsup.config.js';

const defaultOptions: Options = {
	esbuildPlugins: [esbuildPluginVersionInjector()]
};

export default createTsupConfig({
	cjsOptions: defaultOptions,
	esmOptions: defaultOptions
});

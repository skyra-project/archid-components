import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';
import { createTsupConfig } from '../../scripts/tsup.config.js';
import { Options } from 'tsup';

const defaultOptions: Options = {
	esbuildPlugins: [esbuildPluginVersionInjector()]
};

export default createTsupConfig({
	cjsOptions: defaultOptions,
	esmOptions: defaultOptions
});

import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';
import { createTsupConfig } from '../../scripts/tsup.config.js';

export default createTsupConfig({ format: ['esm', 'cjs'], esbuildPlugins: [esbuildPluginVersionInjector()] });

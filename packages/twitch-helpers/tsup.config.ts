import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';
import { createTsupConfig } from '../../scripts/tsup.config';

export default createTsupConfig({ format: ['esm'], esbuildPlugins: [esbuildPluginVersionInjector()] });

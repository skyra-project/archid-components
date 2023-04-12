import { createVitestConfig } from '../../scripts/vitest.config';
import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';

export default createVitestConfig({
	plugins: [esbuildPluginVersionInjector()]
});

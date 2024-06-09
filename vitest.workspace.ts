import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'./packages/env-utilities/vitest.config.ts',
	'./packages/http-framework/vitest.config.ts',
	'./packages/logger/vitest.config.ts',
	'./packages/start-banner/vitest.config.ts'
]);

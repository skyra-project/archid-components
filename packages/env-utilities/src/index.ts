export * from './lib/setup';
export * from './lib/types';
export * from './lib/utils';

import type { Env } from './lib/types';

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Env {}
	}
}

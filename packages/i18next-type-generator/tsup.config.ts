import { createTsupConfig } from '../../scripts/tsup.config.js';

export default createTsupConfig({ entry: ['src/cli.ts'], format: ['esm'], target: 'es2022' });

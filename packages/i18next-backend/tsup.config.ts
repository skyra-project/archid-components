import { createTsupConfig } from '../../scripts/tsup.config.js';

export default createTsupConfig({ format: ['esm', 'cjs'] });

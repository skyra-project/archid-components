import { load } from '@skyra/http-framework-i18n';
import './commands/_load.js';
import './listeners/_load.js';

await load(new URL('../src/locales', import.meta.url));

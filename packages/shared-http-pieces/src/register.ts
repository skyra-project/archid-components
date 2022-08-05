import { container } from '@skyra/http-framework';
import { load } from '@skyra/http-framework-i18n';

container.stores.registerPath(new URL('.', import.meta.url));
await load(new URL('../src/locales', import.meta.url));

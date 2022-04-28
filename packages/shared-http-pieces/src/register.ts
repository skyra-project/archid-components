import { setInformationFromImportMetaURL } from '#lib/information';
import { container } from '@skyra/http-framework';
import { load } from '@skyra/http-framework-i18n';
import { fileURLToPath } from 'node:url';

const url = new URL(import.meta.url);

setInformationFromImportMetaURL(url);
container.stores.registerPath(fileURLToPath(url));
await load(new URL('../src/locales', url));

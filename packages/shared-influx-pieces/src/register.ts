import { container } from '@skyra/http-framework';

container.stores.registerPath(new URL('.', import.meta.url));

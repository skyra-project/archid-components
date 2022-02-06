import { container } from '@skyra/http-framework';
import { fileURLToPath } from 'node:url';

container.stores.registerPath(fileURLToPath(import.meta.url));

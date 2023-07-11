import { container } from '@skyra/http-framework';
import { registerSchedule } from 'lib/utils/schedule.js';

container.stores.registerPath(new URL('.', import.meta.url));

registerSchedule().catch((err) => console.log(err));

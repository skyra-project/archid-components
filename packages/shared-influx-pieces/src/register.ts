import { container } from '@skyra/http-framework';
import { registerSchedule } from 'lib/utils/schedule.js';
import { resolve } from 'path';

container.stores.get('listeners')?.registerPath(resolve('listeners'));
registerSchedule();

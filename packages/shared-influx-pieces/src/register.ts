import './listeners/_load';

import { initializeInflux } from './index.js';
import { registerSchedule } from './lib/utils/schedule';

void registerSchedule();
void initializeInflux();

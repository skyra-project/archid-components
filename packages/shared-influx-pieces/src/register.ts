import { initializeInflux } from 'index';
import { registerSchedule } from './lib/utils/schedule';

import './listeners/_load';

void registerSchedule();
void initializeInflux();

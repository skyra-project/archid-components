import { container } from '@skyra/http-framework';
import { getApproximateGuildCount } from './api.js';

const Minute = 60_000;

let analyticsSyncInterval: NodeJS.Timeout | null = null;

export function registerSchedule() {
	analyticsSyncInterval = setInterval(async () => {
		const guilds = await getApproximateGuildCount();
		if (!guilds) return;
		return container.client.emit('analyticsSync', guilds);
	}, Minute * 10);
}

export function getAnalyticsSyncInterval() {
	return analyticsSyncInterval;
}

export function destroyIntervals() {
	if (analyticsSyncInterval) {
		analyticsSyncInterval.unref();
		analyticsSyncInterval = null;
	}
}

import { TimerManager } from '@sapphire/timer-manager';
import { container } from '@skyra/http-framework';
import { getApproximateGuildCount } from './api.js';

const Minute = 60_000;

let analyticsSyncInterval: NodeJS.Timeout | null = null;
let resourceAnalyticsSyncInterval: NodeJS.Timeout | null = null;

export function registerSchedule() {
	analyticsSyncInterval = TimerManager.setInterval(async () => {
		const guilds = await getApproximateGuildCount();
		if (!guilds) return;
		return container.client.emit('analyticsSync', guilds);
	}, Minute * 10);

	resourceAnalyticsSyncInterval = TimerManager.setInterval(() => container.client.emit('resourceAnalyticsSync'), Minute);
}

export function getAnalyticsSyncInterval() {
	return analyticsSyncInterval;
}

export function getResourceAnalyticsSyncInterval() {
	return resourceAnalyticsSyncInterval;
}

export function stopIntervals() {
	if (analyticsSyncInterval) {
		analyticsSyncInterval.unref();
		analyticsSyncInterval = null;
	}

	if (resourceAnalyticsSyncInterval) {
		resourceAnalyticsSyncInterval.unref();
		resourceAnalyticsSyncInterval = null;
	}
}

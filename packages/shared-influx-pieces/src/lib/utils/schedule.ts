import { TimerManager } from '@sapphire/timer-manager';
import { container } from '@skyra/http-framework';
import { getApproximateGuildCount } from './ApproximateGuilds.js';

const Minute = 60_000;

export function registerSchedule() {
	return new Promise((resolve, reject) => {
		try {
			const analyticsSync = TimerManager.setInterval(async () => {
				const guilds = await getApproximateGuildCount();
				if (!guilds) return;
				return container.client.emit('analyticsSync', guilds);
			}, Minute * 10);
			const resourceAnalyticsSync = TimerManager.setInterval(() => container.client.emit('resourceAnalyticsSync'), Minute);
			return resolve([analyticsSync, resourceAnalyticsSync]);
		} catch (error) {
			return reject(error);
		}
	});
}

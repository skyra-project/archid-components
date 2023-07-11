import { Time, TimerManager } from '@sapphire/time-utilities';
import { container } from '@skyra/http-framework';
import { getApproximateGuildCount } from './ApproximateGuilds.js';

export function registerSchedule() {
	return new Promise((resolve, reject) => {
		try {
			const analyticsSync = TimerManager.setInterval(async () => {
				const guilds = await getApproximateGuildCount();
				if (!guilds) return;
				return container.client.emit('analyticsSync', guilds);
			}, Time.Minute * 10);
			const resourceAnalyticsSync = TimerManager.setInterval(() => container.client.emit('resourceAnalyticsSync'), Time.Minute);
			return resolve([analyticsSync, resourceAnalyticsSync]);
		} catch (error) {
			return reject(error);
		}
	});
}

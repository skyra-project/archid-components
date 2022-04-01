import { EmbedBuilder, time, TimestampStyles } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { MessageFlags } from 'discord-api-types/v10';
import { cpus, uptime, type CpuInfo } from 'node:os';

@RegisterCommand({ name: 'statistics', description: 'Check my statistics.' })
export class UserCommand extends Command {
	public override chatInputRun(): Command.Response {
		const embed = new EmbedBuilder().addFields(
			{ name: 'Uptime', value: this.uptimeStatistics },
			{ name: 'Server Usage', value: this.usageStatistics }
		);

		return this.message({ embeds: [embed.toJSON()], flags: MessageFlags.Ephemeral });
	}

	private get uptimeStatistics() {
		const now = Date.now();
		const nowSeconds = Math.round(now / 1000);

		return [
			`• **Host**: ${time(Math.round(nowSeconds - uptime()), TimestampStyles.RelativeTime)}`,
			`• **Total**: ${time(Math.round(nowSeconds - process.uptime()), TimestampStyles.RelativeTime)}`
		].join('\n');
	}

	private get usageStatistics() {
		const usage = process.memoryUsage();

		return [
			`• **CPU Load**: ${cpus().map(UserCommand.formatCpuInfo.bind(null)).join(' | ')}`,
			`• **Heap**: ${usage.heapUsed / 1048576} (Total: ${usage.heapUsed / 1048576})`
		].join('\n');
	}

	private static formatCpuInfo({ times }: CpuInfo) {
		return `${Math.round(((times.user + times.nice + times.sys + times.irq) / times.idle) * 10000) / 100}%`;
	}
}

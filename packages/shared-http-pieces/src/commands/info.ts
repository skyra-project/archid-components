import { time, TimestampStyles, UnsafeEmbedBuilder } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { getSupportedUserLanguageName, getT, TFunction } from '@skyra/http-framework-i18n';
import { ButtonStyle, ComponentType, MessageFlags, type APIEmbedField } from 'discord-api-types/v10';
import { cpus, uptime, type CpuInfo } from 'node:os';
import { LanguageKeys } from '../lib/i18n/LanguageKeys.js';
import { generateLocalizedCommandInformation } from '../lib/i18n/utils.js';
import { getInvite, getRepository } from '../lib/information.js';

@RegisterCommand(generateLocalizedCommandInformation('commands/shared:info'))
export class UserCommand extends Command {
	public override chatInputRun(interaction: Command.Interaction): Command.Response {
		const t = getT(getSupportedUserLanguageName(interaction));
		const embed = new UnsafeEmbedBuilder()
			.setDescription(t(LanguageKeys.Commands.Shared.InfoEmbedDescription))
			.addFields(this.getUptimeStatistics(t), this.getServerUsageStatistics(t));
		const components = this.getComponents(t);

		return this.message({ embeds: [embed.toJSON()], components, flags: MessageFlags.Ephemeral });
	}

	private getUptimeStatistics(t: TFunction): APIEmbedField {
		const now = Date.now();
		const nowSeconds = Math.round(now / 1000);

		return {
			name: t(LanguageKeys.Commands.Shared.InfoFieldUptimeTitle),
			value: t(LanguageKeys.Commands.Shared.InfoFieldUptimeValue, {
				host: time(Math.round(nowSeconds - uptime()), TimestampStyles.RelativeTime),
				client: time(Math.round(nowSeconds - process.uptime()), TimestampStyles.RelativeTime)
			})
		};
	}

	private getServerUsageStatistics(t: TFunction): APIEmbedField {
		const usage = process.memoryUsage();

		return {
			name: t(LanguageKeys.Commands.Shared.InfoFieldServerUsageTitle),
			value: t(LanguageKeys.Commands.Shared.InfoFieldServerUsageValue, {
				cpu: cpus().map(UserCommand.formatCpuInfo.bind(null)).join(' | '),
				heapUsed: (usage.heapUsed / 1048576).toLocaleString(t.lng, { maximumFractionDigits: 2 }),
				heapTotal: (usage.heapUsed / 1048576).toLocaleString(t.lng, { maximumFractionDigits: 2 })
			})
		};
	}

	private getComponents(t: TFunction): Command.MessageResponseOptions['components'] {
		return [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						label: t(LanguageKeys.Commands.Shared.InfoButtonInvite),
						emoji: { name: '🎉' },
						url: getInvite()
					},
					{
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						label: t(LanguageKeys.Commands.Shared.InfoButtonSupport),
						emoji: { name: '🆘' },
						url: 'https://discord.gg/6gakFR2'
					}
				]
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						label: t(LanguageKeys.Commands.Shared.InfoButtonGitHub),
						emoji: { id: '950888087188283422', name: 'github2' },
						url: getRepository()
					},
					{
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						label: t(LanguageKeys.Commands.Shared.InfoButtonDonate),
						emoji: { name: '🧡' },
						url: 'https://donate.skyra.pw'
					}
				]
			}
		];
	}

	private static formatCpuInfo({ times }: CpuInfo) {
		return `${Math.round(((times.user + times.nice + times.sys + times.irq) / times.idle) * 10000) / 100}%`;
	}
}

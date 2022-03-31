import type {
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandSubcommandsOnlyBuilder
} from '@discordjs/builders';
import {
	APIApplicationCommandOption,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord-api-types/v9';
import type { Command } from '../../structures/Command';
import { normalizeChatInputCommand, normalizeChatInputSubCommand, normalizeChatInputSubCommandGroup } from '../../utils/normalizeInput';
import { link } from '../shared/link';
import { chatInputCommandRegistry } from './shared';

function merge(
	existing: RESTPostAPIChatInputApplicationCommandsJSONBody | undefined,
	data: RESTPostAPIChatInputApplicationCommandsJSONBody
): RESTPostAPIChatInputApplicationCommandsJSONBody {
	if (!existing) return data;
	return { ...existing, ...data, options: mergeOptions(existing.options, data.options) };
}

function mergeOptions(
	existing: APIApplicationCommandOption[] | undefined,
	data: APIApplicationCommandOption[] | undefined
): APIApplicationCommandOption[] {
	if (!existing?.length) return data ?? [];
	if (!data?.length) return existing;

	const entries = new Map(existing.map((option) => [option.name, option]));
	for (const option of data) {
		entries.set(option.name, mergeOption(entries.get(option.name), option));
	}

	return [...entries.values()];
}

function mergeOption(existing: APIApplicationCommandOption | undefined, data: APIApplicationCommandOption): APIApplicationCommandOption {
	if (!existing) return data;
	if (existing.type !== data.type) throw new TypeError(`Mismatching types, expected ${existing.type}, but received ${data.type}`);
	if ('options' in existing) {
		if ('options' in data) return { ...existing, ...data, options: mergeOptions(existing.options, data.options) as any[] };
	}
	return { ...existing, ...data } as any;
}

export function RegisterCommand(
	command:
		| RESTPostAPIChatInputApplicationCommandsJSONBody
		| SlashCommandBuilder
		| SlashCommandSubcommandsOnlyBuilder
		| SlashCommandOptionsOnlyBuilder
		| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
		| ((
				builder: SlashCommandBuilder
		  ) =>
				| SlashCommandBuilder
				| SlashCommandSubcommandsOnlyBuilder
				| SlashCommandOptionsOnlyBuilder
				| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>)
) {
	const builtData = normalizeChatInputCommand(command);

	return function decorate(target: typeof Command) {
		chatInputCommandRegistry.set(target, { type: ApplicationCommandType.ChatInput, ...merge(chatInputCommandRegistry.get(target), builtData) });
	};
}

export function RegisterSubCommandGroup(
	subCommandGroup:
		| APIApplicationCommandSubcommandGroupOption
		| SlashCommandSubcommandGroupBuilder
		| ((builder: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder)
) {
	const builtData = normalizeChatInputSubCommandGroup(subCommandGroup);

	return function decorate(target: Command, method: string) {
		const existing = chatInputCommandRegistry.ensure(target.constructor as typeof Command, () => ({
			type: ApplicationCommandType.ChatInput,
			name: '',
			description: ''
		}));

		existing.options ??= [];
		existing.options.push(link(builtData, method));
	};
}

export function RegisterSubCommand(
	subCommand:
		| APIApplicationCommandSubcommandOption
		| SlashCommandSubcommandBuilder
		| ((builder: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder),
	subCommandGroupName?: string | null
) {
	const builtData = normalizeChatInputSubCommand(subCommand);

	return function decorate(target: Command, method: string) {
		const existing = chatInputCommandRegistry.ensure(target.constructor as typeof Command, () => ({
			type: ApplicationCommandType.ChatInput,
			name: '',
			description: ''
		}));

		if (subCommandGroupName) {
			existing.options ??= [];

			const subCommandGroup = existing.options.find(
				(option) => option.type === ApplicationCommandOptionType.SubcommandGroup && option.name === subCommandGroupName
			) as APIApplicationCommandSubcommandGroupOption | undefined;

			if (subCommandGroup) {
				subCommandGroup.options ??= [];
				subCommandGroup.options.push(link(builtData, method));
			} else {
				existing.options.push({
					type: ApplicationCommandOptionType.SubcommandGroup,
					name: subCommandGroupName,
					description: '',
					options: [link(builtData, method)]
				});
			}
		} else {
			existing.options ??= [];
			existing.options.push(link(builtData, method));
		}
	};
}

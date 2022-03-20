import type {
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandSubcommandsOnlyBuilder
} from '@discordjs/builders';
import {
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
		chatInputCommandRegistry.set(target, { type: ApplicationCommandType.ChatInput, ...chatInputCommandRegistry.get(target), ...builtData });
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
		const existing = chatInputCommandRegistry.get(target.constructor as typeof Command);
		if (!existing?.options) throw new Error('Expected at least one SubCommandGroup to be registered, but it is not.');

		if (subCommandGroupName) {
			const subCommandGroup = existing.options.find(
				(option) => option.type === ApplicationCommandOptionType.SubcommandGroup && option.name === subCommandGroupName
			) as APIApplicationCommandSubcommandGroupOption | undefined;
			if (!subCommandGroup) throw new Error('Expected the specified SubCommandGroup to be registered, but it is not.');

			subCommandGroup.options ??= [];
			subCommandGroup.options.push(link(builtData, method));
		} else {
			existing.options ??= [];
			existing.options.push(link(builtData, method));
		}
	};
}

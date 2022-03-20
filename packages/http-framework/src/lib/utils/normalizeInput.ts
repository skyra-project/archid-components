/**
 * @license MIT
 * @copyright The Sapphire Community and its contributors
 */

import {
	ContextMenuCommandBuilder,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandSubcommandsOnlyBuilder
} from '@discordjs/builders';
import { isFunction } from '@sapphire/utilities';
import {
	APIApplicationCommandSubcommandGroupOption,
	APIApplicationCommandSubcommandOption,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type RESTPostAPIContextMenuApplicationCommandsJSONBody
} from 'discord-api-types/v9';
import type { ContextMenuOptions } from '../interactions/context-menu/shared';

function isBuilder(
	command: unknown
): command is
	| SlashCommandBuilder
	| SlashCommandSubcommandsOnlyBuilder
	| SlashCommandOptionsOnlyBuilder
	| SlashCommandSubcommandBuilder
	| SlashCommandSubcommandGroupBuilder
	| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> {
	return (
		command instanceof SlashCommandBuilder ||
		command instanceof SlashCommandSubcommandBuilder ||
		command instanceof SlashCommandSubcommandGroupBuilder
	);
}

export function normalizeChatInputCommand(
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
): RESTPostAPIChatInputApplicationCommandsJSONBody {
	if (isFunction(command)) {
		const builder = new SlashCommandBuilder();
		command(builder);
		const json = builder.toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody;

		return json;
	}

	if (isBuilder(command)) {
		const json = command.toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody;
		return json;
	}

	const finalObject: RESTPostAPIChatInputApplicationCommandsJSONBody = {
		description: command.description,
		name: command.name,
		default_permission: command.default_permission,
		type: ApplicationCommandType.ChatInput,
		options: command.options
	};

	return finalObject;
}

export function normalizeChatInputSubCommandGroup(
	subCommandGroup:
		| APIApplicationCommandSubcommandGroupOption
		| SlashCommandSubcommandGroupBuilder
		| ((builder: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder)
): APIApplicationCommandSubcommandGroupOption {
	if (isFunction(subCommandGroup)) {
		const builder = new SlashCommandSubcommandGroupBuilder();
		subCommandGroup(builder);
		const json = builder.toJSON() as APIApplicationCommandSubcommandGroupOption;

		return json;
	}

	if (isBuilder(subCommandGroup)) {
		const json = subCommandGroup.toJSON() as APIApplicationCommandSubcommandGroupOption;
		return json;
	}

	const finalObject: APIApplicationCommandSubcommandGroupOption = {
		name: subCommandGroup.name,
		description: subCommandGroup.description,
		type: ApplicationCommandOptionType.SubcommandGroup,
		options: subCommandGroup.options,
		required: subCommandGroup.required
	};

	return finalObject;
}

export function normalizeChatInputSubCommand(
	subCommand:
		| APIApplicationCommandSubcommandOption
		| SlashCommandSubcommandBuilder
		| ((builder: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder)
): APIApplicationCommandSubcommandOption {
	if (isFunction(subCommand)) {
		const builder = new SlashCommandSubcommandBuilder();
		subCommand(builder);
		const json = builder.toJSON() as APIApplicationCommandSubcommandOption;

		return json;
	}

	if (isBuilder(subCommand)) {
		const json = subCommand.toJSON() as APIApplicationCommandSubcommandOption;
		return json;
	}

	const finalObject: APIApplicationCommandSubcommandOption = {
		description: subCommand.description,
		name: subCommand.name,
		options: subCommand.options,
		type: ApplicationCommandOptionType.Subcommand,
		required: subCommand.required
	};

	return finalObject;
}

export function normalizeContextMenuCommand(
	command: ContextMenuOptions | ContextMenuCommandBuilder | ((builder: ContextMenuCommandBuilder) => ContextMenuCommandBuilder)
): ContextMenuOptions {
	if (isFunction(command)) {
		const builder = new ContextMenuCommandBuilder();
		command(builder);
		return builder.toJSON() as RESTPostAPIContextMenuApplicationCommandsJSONBody;
	}

	if (command instanceof ContextMenuCommandBuilder) {
		return command.toJSON() as RESTPostAPIContextMenuApplicationCommandsJSONBody;
	}

	return command;
}

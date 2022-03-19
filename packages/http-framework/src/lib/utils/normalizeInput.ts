/**
 * @license MIT
 * @copyright The Sapphire Community and its contributors
 */

import {
	ContextMenuCommandBuilder,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandsOnlyBuilder
} from '@discordjs/builders';
import { isFunction } from '@sapphire/utilities';
import {
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
	| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> {
	return command instanceof SlashCommandBuilder;
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

	const finalObject = {
		description: command.description,
		name: command.name,
		default_permission: command.default_permission,
		type: ApplicationCommandType.ChatInput,
		options: command.options
	} as RESTPostAPIChatInputApplicationCommandsJSONBody;

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

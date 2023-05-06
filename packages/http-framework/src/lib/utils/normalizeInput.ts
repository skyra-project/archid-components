/**
 * @license MIT
 * @copyright The Sapphire Community and its contributors
 */

import {
	ContextMenuCommandBuilder,
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	type ContextMenuCommandType
} from '@discordjs/builders';
import { isJSONEncodable, type JSONEncodable } from '@discordjs/util';
import { isFunction } from '@sapphire/utilities';
import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type RESTPostAPIContextMenuApplicationCommandsJSONBody
} from 'discord-api-types/v10';

export type ChatInputCommandDataResolvable =
	| Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'type'>
	| JSONEncodable<RESTPostAPIChatInputApplicationCommandsJSONBody>;

export function normalizeChatInputCommand(
	command: ChatInputCommandDataResolvable | ((builder: SlashCommandBuilder) => ChatInputCommandDataResolvable)
): RESTPostAPIChatInputApplicationCommandsJSONBody {
	if (isFunction(command)) {
		const builder = new SlashCommandBuilder();
		const json = command(builder) ?? builder;
		return isJSONEncodable(json) ? json.toJSON() : { type: ApplicationCommandType.ChatInput, ...json };
	}

	if (isJSONEncodable(command)) {
		return command.toJSON();
	}

	const finalObject: RESTPostAPIChatInputApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...command
	};

	return finalObject;
}

export type ChatInputCommandSubCommandGroupDataResolvable =
	| Omit<APIApplicationCommandSubcommandGroupOption, 'type'>
	| JSONEncodable<APIApplicationCommandSubcommandGroupOption>;

export function normalizeChatInputSubCommandGroup(
	data:
		| ChatInputCommandSubCommandGroupDataResolvable
		| ((builder: SlashCommandSubcommandGroupBuilder) => ChatInputCommandSubCommandGroupDataResolvable)
): APIApplicationCommandSubcommandGroupOption {
	if (isFunction(data)) {
		const builder = new SlashCommandSubcommandGroupBuilder();
		const json = data(builder) ?? builder;
		return isJSONEncodable(json) ? json.toJSON() : { type: ApplicationCommandOptionType.SubcommandGroup, ...json };
	}

	if (isJSONEncodable(data)) {
		return data.toJSON();
	}

	const finalObject: APIApplicationCommandSubcommandGroupOption = {
		type: ApplicationCommandOptionType.SubcommandGroup,
		...data
	};

	return finalObject;
}

export type ChatInputCommandSubCommandDataResolvable =
	| Omit<APIApplicationCommandSubcommandOption, 'type'>
	| JSONEncodable<APIApplicationCommandSubcommandOption>;

export function normalizeChatInputSubCommand(
	data: ChatInputCommandSubCommandDataResolvable | ((builder: SlashCommandSubcommandBuilder) => ChatInputCommandSubCommandDataResolvable)
): APIApplicationCommandSubcommandOption {
	if (isFunction(data)) {
		const builder = new SlashCommandSubcommandBuilder();
		const json = data(builder) ?? builder;
		return isJSONEncodable(json) ? json.toJSON() : { type: ApplicationCommandOptionType.Subcommand, ...json };
	}

	if (isJSONEncodable(data)) {
		return data.toJSON();
	}

	const finalObject: APIApplicationCommandSubcommandOption = {
		type: ApplicationCommandOptionType.Subcommand,
		...data
	};

	return finalObject;
}

export type ContextMenuCommandDataResolvable =
	| Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'type'>
	| JSONEncodable<RESTPostAPIContextMenuApplicationCommandsJSONBody>;

export function normalizeContextMenuCommand(
	data: ContextMenuCommandDataResolvable | ((builder: ContextMenuCommandBuilder) => ContextMenuCommandDataResolvable),
	type: ContextMenuCommandType
): RESTPostAPIContextMenuApplicationCommandsJSONBody {
	if (isFunction(data)) {
		const builder = new ContextMenuCommandBuilder().setType(type);
		const json = data(builder) ?? builder;
		return isJSONEncodable(json) ? json.toJSON() : { type, ...json };
	}

	if (isJSONEncodable(data)) {
		return data.toJSON();
	}

	return { type, ...data };
}

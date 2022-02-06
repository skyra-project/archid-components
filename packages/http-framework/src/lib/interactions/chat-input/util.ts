import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type RESTPostAPIApplicationCommandsJSONBody
} from 'discord-api-types/v9';

export function makeChatInputCommand<T extends Omit<RESTPostAPIApplicationCommandsJSONBody, 'type'>>(
	data: T
): T & { type: ApplicationCommandType.ChatInput } {
	return { type: ApplicationCommandType.ChatInput, ...data };
}

export function makeSubCommandGroupBody<T extends Omit<APIApplicationCommandSubcommandGroupOption, 'type'>>(
	data: T
): T & { type: ApplicationCommandOptionType.SubcommandGroup } {
	return { type: ApplicationCommandOptionType.SubcommandGroup, ...data };
}

export function makeSubCommandBody<T extends Omit<APIApplicationCommandSubcommandOption, 'type'>>(
	data: T
): T & { type: ApplicationCommandOptionType.Subcommand } {
	return { type: ApplicationCommandOptionType.Subcommand, ...data };
}

// Copyright © 2021 - Noel Buechler | GNU Affero General Public License v3.0
// Source: https://github.com/Naval-Base/yuudachi/blob/8069ae9afa47bed711511021b96a5ac691ca07f4/src/interactions/InteractionOptions.ts
//
// Changes:
// - Added a namespace named `TransformedArguments`.
// - Added a local method named `transformMentionable`.
// - Added support for resolving `ApplicationCommandOptionType.Mentionable`.
// - Added return casts.
// - Adapted code to work with HTTP-only interactions.
// - Adapted code to use discord-api-types rather than discord.js.
// - Refactored Subcommand[Group] handling to not create an array clone.

import type { NonNullObject } from '@sapphire/utilities';
import {
	ApplicationCommandOptionType,
	type APIApplicationCommandInteractionDataBasicOption,
	type APIApplicationCommandInteractionDataMentionableOption,
	type APIApplicationCommandInteractionDataOption,
	type APIApplicationCommandInteractionDataSubcommandGroupOption,
	type APIApplicationCommandInteractionDataSubcommandOption,
	type APIChatInputApplicationCommandInteractionDataResolved,
	type APIInteractionDataResolvedChannel,
	type APIInteractionDataResolvedGuildMember,
	type APIRole,
	type APIUser
} from 'discord-api-types/v10';

export function transformInteraction<T extends NonNullObject>(
	resolved: APIChatInputApplicationCommandInteractionDataResolved,
	options: readonly APIApplicationCommandInteractionDataOption[]
): InteractionArguments<T> {
	const extracted = extractTopLevelOptions(options);
	return {
		subCommand: extracted.subCommand?.name ?? null,
		subCommandGroup: extracted.subCommandGroup?.name ?? null,
		...(transformArguments(resolved, extracted.options) as T)
	};
}

export type InteractionArguments<T extends NonNullObject> = T & {
	subCommand: string | null;
	subCommandGroup: string | null;
};

export function transformAutocompleteInteraction<T extends NonNullObject>(
	resolved: APIChatInputApplicationCommandInteractionDataResolved,
	options: readonly APIApplicationCommandInteractionDataOption[]
): AutocompleteInteractionArguments<T> {
	const extracted = extractTopLevelOptions(options);
	const focused = extracted.options.find((option) => (option as any).focused);
	return {
		subCommand: extracted.subCommand?.name ?? null,
		subCommandGroup: extracted.subCommandGroup?.name ?? null,
		focused: typeof focused === 'undefined' ? null : (transformArgument(resolved, focused) as TransformedArguments.AutocompleteFocused),
		...(transformArguments(resolved, extracted.options) as T)
	};
}

export type AutocompleteInteractionArguments<T extends NonNullObject> = InteractionArguments<T> & {
	focused: TransformedArguments.AutocompleteFocused | null;
};

export function extractTopLevelOptions(options: readonly APIApplicationCommandInteractionDataOption[]): ExtractedOptions {
	const [firstOption] = options;
	if (firstOption.type === ApplicationCommandOptionType.SubcommandGroup) {
		const subCommand = firstOption.options[0];
		return {
			subCommandGroup: firstOption,
			subCommand,
			options: subCommand.options ?? []
		};
	}

	if (firstOption.type === ApplicationCommandOptionType.Subcommand) {
		return {
			subCommandGroup: null,
			subCommand: firstOption,
			options: firstOption.options ?? []
		};
	}

	return {
		subCommandGroup: null,
		subCommand: null,
		options: options as readonly APIApplicationCommandInteractionDataBasicOption[]
	};
}

export interface ExtractedOptions {
	subCommandGroup: APIApplicationCommandInteractionDataSubcommandGroupOption | null;
	subCommand: APIApplicationCommandInteractionDataSubcommandOption | null;
	options: readonly APIApplicationCommandInteractionDataBasicOption[];
}

function transformArguments(
	resolved: APIChatInputApplicationCommandInteractionDataResolved,
	options: readonly APIApplicationCommandInteractionDataBasicOption[]
): NonNullObject {
	return Object.fromEntries(options.map((option) => [option.name, transformArgument(resolved, option)]));
}

function transformArgument(
	resolved: APIChatInputApplicationCommandInteractionDataResolved,
	option: APIApplicationCommandInteractionDataBasicOption
): TransformedArguments.Any {
	if (option.type === ApplicationCommandOptionType.User) {
		return { user: resolved.users?.[option.value], member: resolved.members?.[option.value] ?? null } as TransformedArguments.User;
	}

	if (option.type === ApplicationCommandOptionType.Channel) {
		return resolved.channels?.[option.value] as TransformedArguments.Channel;
	}

	if (option.type === ApplicationCommandOptionType.Role) {
		return resolved.roles?.[option.value] as TransformedArguments.Role;
	}

	if (option.type === ApplicationCommandOptionType.Mentionable) {
		return transformMentionable(resolved, option);
	}

	return option.value;
}

function transformMentionable(
	resolved: APIChatInputApplicationCommandInteractionDataResolved,
	option: APIApplicationCommandInteractionDataMentionableOption
): TransformedArguments.Mentionable {
	const id = option.value;

	const user = resolved.users?.[id];
	if (user) return { id, user, member: resolved.members?.[id] ?? null };

	const channel = resolved.channels?.[id];
	if (channel) return { id, channel };

	const role = resolved.roles?.[id];
	if (role) return { id, role };

	return { id };
}

export namespace TransformedArguments {
	export interface User {
		user: APIUser;
		member: APIInteractionDataResolvedGuildMember | null;
	}

	export type Channel = APIInteractionDataResolvedChannel;
	export type Role = APIRole;

	export type Mentionable =
		| ({ id: string } & User) //
		| { id: string; channel: Channel }
		| { id: string; role: Role }
		| { id: string };

	export type AutocompleteFocused = number | string;

	export type Any = User | Channel | Role | Mentionable | number | string | boolean;
}

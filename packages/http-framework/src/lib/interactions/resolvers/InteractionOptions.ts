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

import {
	type APIApplicationCommandInteractionDataMentionableOption,
	type APIInteractionDataResolvedChannel,
	type APIInteractionDataResolvedGuildMember,
	type APIRole,
	type APIUser,
	ApplicationCommandOptionType,
	type APIApplicationCommandInteractionDataOption,
	type APIChatInputApplicationCommandInteractionDataResolved,
	type RESTPostAPIApplicationCommandsJSONBody
} from 'discord-api-types/v9';
import type { ArgumentsOf } from './ArgumentsOf';

export function transformInteraction<T extends RESTPostAPIApplicationCommandsJSONBody>(
	resolved: APIChatInputApplicationCommandInteractionDataResolved,
	options: readonly APIApplicationCommandInteractionDataOption[]
): ArgumentsOf<T> {
	const opts: any = {};

	for (const top of options) {
		if (top.type === ApplicationCommandOptionType.Subcommand || top.type === ApplicationCommandOptionType.SubcommandGroup) {
			opts[top.name] = transformInteraction(resolved, top.options ?? []);
		} else if (top.type === ApplicationCommandOptionType.User) {
			opts[top.name] = { user: resolved.users?.[top.value], member: resolved.members?.[top.value] ?? null } as TransformedArguments.User;
		} else if (top.type === ApplicationCommandOptionType.Channel) {
			opts[top.name] = resolved.channels?.[top.value] as TransformedArguments.Channel;
		} else if (top.type === ApplicationCommandOptionType.Role) {
			opts[top.name] = resolved.roles?.[top.value] as TransformedArguments.Role;
		} else if (top.type === ApplicationCommandOptionType.Mentionable) {
			opts[top.name] = transformMentionable(resolved, top);
		} else {
			opts[top.name] = top.value;
		}
	}

	return opts;
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
}

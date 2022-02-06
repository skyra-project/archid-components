// Copyright © 2021 - Noel Buechler | GNU Affero General Public License v3.0
// Source: https://github.com/Naval-Base/yuudachi/blob/8069ae9afa47bed711511021b96a5ac691ca07f4/src/interactions/ArgumentsOf.ts
//
// Changes:
// - Adapted code to work with HTTP-only interactions.
// - Adapted code to use discord-api-types rather than local types.
// - Adapted code to use `TransformedArguments`.
// - Updated code for latest `discord-api-types`.

import type { APIApplicationCommandOption, ApplicationCommandOptionType, RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import type { TransformedArguments } from './InteractionOptions';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type TypeIdToType<T, O, C> = T extends ApplicationCommandOptionType.Subcommand
	? ArgumentsOfRaw<O>
	: T extends ApplicationCommandOptionType.SubcommandGroup
	? ArgumentsOfRaw<O>
	: T extends ApplicationCommandOptionType.String
	? C extends readonly { value: string }[]
		? C[number]['value']
		: string
	: T extends ApplicationCommandOptionType.Integer | ApplicationCommandOptionType.Number
	? C extends readonly { value: number }[]
		? C[number]['value']
		: number
	: T extends ApplicationCommandOptionType.Boolean
	? boolean
	: T extends ApplicationCommandOptionType.User
	? TransformedArguments.User
	: T extends ApplicationCommandOptionType.Channel
	? TransformedArguments.Channel
	: T extends ApplicationCommandOptionType.Role
	? TransformedArguments.Role
	: T extends ApplicationCommandOptionType.Mentionable
	? TransformedArguments.Mentionable
	: never;

type OptionToObject<O> = O extends {
	name: infer K;
	type: infer T;
	required?: infer R;
	options?: infer O;
	choices?: infer C;
}
	? K extends string
		? R extends true
			? { [k in K]: TypeIdToType<T, O, C> }
			: T extends ApplicationCommandOptionType.Subcommand | ApplicationCommandOptionType.SubcommandGroup
			? { [k in K]: TypeIdToType<T, O, C> }
			: { [k in K]?: TypeIdToType<T, O, C> }
		: never
	: never;

type ArgumentsOfRaw<O> = O extends readonly any[] ? UnionToIntersection<OptionToObject<O[number]>> : never;

export type ArgumentsOf<C extends RESTPostAPIApplicationCommandsJSONBody> = C extends { options: readonly APIApplicationCommandOption[] }
	? UnionToIntersection<OptionToObject<C['options'][number]>>
	: unknown;

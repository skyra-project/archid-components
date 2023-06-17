import type { NonNullObject } from '@sapphire/utilities';
import {
	ApplicationCommandOptionType,
	type APIApplicationCommandInteractionDataBasicOption,
	type APIApplicationCommandInteractionDataMentionableOption,
	type APIApplicationCommandInteractionDataOption,
	type APIApplicationCommandInteractionDataSubcommandGroupOption,
	type APIApplicationCommandInteractionDataSubcommandOption,
	type APIAttachment,
	type APIInteractionDataResolved,
	type APIInteractionDataResolvedChannel,
	type APIInteractionDataResolvedGuildMember,
	type APIMessage,
	type APIMessageApplicationCommandInteractionData,
	type APIRole,
	type APIUser,
	type APIUserApplicationCommandInteractionData
} from 'discord-api-types/v10';

export function transformInteraction<T extends NonNullObject>(
	resolved: APIInteractionDataResolved,
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
	/**
	 * The name of the subcommand that was used by the user, if any.
	 */
	subCommand: string | null;

	/**
	 * The name of the subcommand group that was used by the user, if any.
	 */
	subCommandGroup: string | null;
};

export function transformAutocompleteInteraction<T extends NonNullObject>(
	resolved: APIInteractionDataResolved,
	options: readonly APIApplicationCommandInteractionDataOption[]
): AutocompleteInteractionArguments<T> {
	const extracted = extractTopLevelOptions(options);
	const focused = extracted.options.find((option) => (option as any).focused);
	return {
		subCommand: extracted.subCommand?.name ?? null,
		subCommandGroup: extracted.subCommandGroup?.name ?? null,
		focused: typeof focused === 'undefined' ? null : (focused.name as keyof T),
		...(transformArguments(resolved, extracted.options) as T)
	};
}

export type AutocompleteInteractionArguments<T extends NonNullObject> = InteractionArguments<T> & {
	/**
	 * The name of the argument that is focused, if any.
	 */
	focused: keyof T | null;
};

export function extractTopLevelOptions(options: readonly APIApplicationCommandInteractionDataOption[]): ExtractedOptions {
	if (options.length) {
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
	resolved: APIInteractionDataResolved,
	options: readonly APIApplicationCommandInteractionDataBasicOption[]
): NonNullObject {
	return Object.fromEntries(options.map((option) => [option.name, transformArgument(resolved, option)]));
}

function transformArgument(resolved: APIInteractionDataResolved, option: APIApplicationCommandInteractionDataBasicOption): TransformedArguments.Any {
	switch (option.type) {
		case ApplicationCommandOptionType.Attachment:
			return resolved.attachments?.[option.value] ?? { id: option.value };
		case ApplicationCommandOptionType.Channel:
			return resolved.channels?.[option.value] ?? { id: option.value };
		case ApplicationCommandOptionType.Mentionable:
			return transformMentionable(resolved, option);
		case ApplicationCommandOptionType.Role:
			return resolved.roles?.[option.value] ?? { id: option.value };
		case ApplicationCommandOptionType.User:
			return { id: option.value, user: resolved.users?.[option.value] ?? null, member: resolved.members?.[option.value] ?? null };
		default:
			return option.value;
	}
}

function transformMentionable(
	resolved: APIInteractionDataResolved,
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

export function transformUserInteraction(data: APIUserApplicationCommandInteractionData): TransformedArguments.User {
	return { id: data.target_id, user: data.resolved.users[data.target_id], member: data.resolved.members?.[data.target_id] ?? null };
}

export function transformMessageInteraction(data: APIMessageApplicationCommandInteractionData): TransformedArguments.Message {
	return { id: data.target_id, message: data.resolved.messages[data.target_id] };
}

export namespace TransformedArguments {
	export interface BasePartial {
		id: string;
	}

	export interface Message extends BasePartial {
		message: APIMessage;
	}

	export interface User extends BasePartial {
		user: APIUser;
		member: APIInteractionDataResolvedGuildMember | null;
	}

	export type Channel = APIInteractionDataResolvedChannel;
	export type Role = APIRole;
	export type Attachment = APIAttachment;

	export type Mentionable =
		| (BasePartial & User) //
		| (BasePartial & { channel: Channel })
		| (BasePartial & { role: Role })
		| BasePartial;

	export type Any = User | Channel | Role | Mentionable | number | string | boolean | Attachment | PartialAny;

	export interface PartialUser extends Omit<User, 'user'> {
		user: User['user'] | null;
	}

	export type PartialAttachment = BasePartial;
	export type PartialChannel = BasePartial;
	export type PartialRole = BasePartial;

	export type PartialAny = PartialUser | PartialChannel | PartialRole | PartialAttachment;
}

/**
 * A map of the argument types to their respective resolved values.
 */
export interface ArgumentTypes {
	[ApplicationCommandOptionType.Attachment]: TransformedArguments.Attachment;
	[ApplicationCommandOptionType.Boolean]: boolean;
	[ApplicationCommandOptionType.Channel]: TransformedArguments.Channel;
	[ApplicationCommandOptionType.Integer]: number;
	[ApplicationCommandOptionType.Mentionable]: TransformedArguments.Mentionable;
	[ApplicationCommandOptionType.Number]: number;
	[ApplicationCommandOptionType.Role]: TransformedArguments.Role;
	[ApplicationCommandOptionType.String]: string;
	[ApplicationCommandOptionType.User]: TransformedArguments.User;
	attachment: this[ApplicationCommandOptionType.Attachment];
	boolean: this[ApplicationCommandOptionType.Boolean];
	channel: this[ApplicationCommandOptionType.Channel];
	integer: this[ApplicationCommandOptionType.Integer];
	mentionable: this[ApplicationCommandOptionType.Mentionable];
	number: this[ApplicationCommandOptionType.Number];
	role: this[ApplicationCommandOptionType.Role];
	string: this[ApplicationCommandOptionType.String];
	user: this[ApplicationCommandOptionType.User];
}

/**
 * Convenience type for creating arguments out of strings.
 *
 * @example
 * ```typescript
 * // Using named string:
 * type Options = MakeArguments<{
 * 	name: 'string';
 * 	file: 'attachment';
 * }>;
 *
 * // ➥ type Options = {
 * //    	name: string;
 * //    	attachment: APIAttachment;
 * //    };
 * ```
 *
 * @example
 * ```typescript
 * // Using named string:
 * type Options = MakeArguments<{
 * 	name: ApplicationCommandOptionType.String;
 * 	file: ApplicationCommandOptionType.Attachment;
 * }>;
 *
 * // ➥ type Options = {
 * //    	name: string;
 * //    	attachment: APIAttachment;
 * //    };
 * ```
 */
export type MakeArguments<T extends Record<string, keyof ArgumentTypes>> = { [K in keyof T]: ArgumentTypes[T[K]] };

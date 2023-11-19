import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';
import { isJSONEncodable, type JSONEncodable } from '@discordjs/util';
import { isFunction, isNullish } from '@sapphire/utilities';
import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIApplicationCommandOption,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord-api-types/v10';
import type { Void } from '../../utils/internals.js';
import { getLinkedMethod, linkMethod } from '../shared/link.js';

/**
 * The command resolver for chat input commands.
 * @internal
 */
export class ChatInputCommandResolver implements JSONEncodable<ChatInputCommandResolver.ResolvedCommand> {
	#data: ChatInputCommandResolver.ResolvedCommand | null = null;
	#commandData: ChatInputCommandResolver.CommandData | null = null;
	#subcommandGroupData: [method: string | null, ChatInputCommandResolver.SubcommandGroupData][] = [];
	#subcommandData: (readonly [method: string | null, groupName: string | null, data: ChatInputCommandResolver.SubcommandData])[] = [];

	/**
	 * Sets the command data for the ChatInputCommandResolver.
	 *
	 * @param data - The command data to set.
	 * @returns The instance of ChatInputCommandResolver.
	 */
	public setCommand(data: ChatInputCommandResolver.CommandData) {
		this.#commandData = data;
		return this;
	}

	/**
	 * Adds a subcommand group to the ChatInputCommandResolver.
	 *
	 * @param data - The data of the subcommand group.
	 * @param method - The method associated with the subcommand group (optional).
	 * @returns The updated ChatInputCommandResolver instance.
	 */
	public addSubcommandGroup(data: ChatInputCommandResolver.SubcommandGroupData, method?: string | null) {
		this.#subcommandGroupData.push([method ?? null, data]);
		return this;
	}

	/**
	 * Adds a subcommand to the ChatInputCommandResolver.
	 *
	 * @param data - The data of the subcommand.
	 * @param method - The method of the subcommand (optional).
	 * @param groupName - The group name of the subcommand (optional).
	 * @returns The updated ChatInputCommandResolver instance.
	 */
	public addSubcommand(data: ChatInputCommandResolver.SubcommandData, method?: string | null, groupName?: string | null): this {
		this.#subcommandData.push([method ?? null, groupName ?? null, data]);
		return this;
	}

	/**
	 * Converts the ChatInputCommandResolver instance to a JSON representation.
	 *
	 * @returns The JSON representation of the ChatInputCommandResolver instance.
	 */
	public toJSON(): ChatInputCommandResolver.ResolvedCommand {
		return (this.#data ??= this.#resolve());
	}

	/**
	 * Resolves the chat input command.
	 *
	 * @returns The resolved command.
	 */
	#resolve(): ChatInputCommandResolver.ResolvedCommand {
		const command = this.#normalizeCommand(this.#commandData);
		this.#resolveSubcommandGroups(command);
		this.#resolveSubcommands(command);

		return command;
	}

	/**
	 * Resolves the subcommand groups for the given command.
	 *
	 * @param command The resolved command.
	 */
	#resolveSubcommandGroups(command: ChatInputCommandResolver.ResolvedCommand) {
		if (this.#subcommandGroupData.length === 0) return;

		command.options ??= [];
		for (const [method, entry] of this.#subcommandGroupData) {
			let data = this.#normalizeSubcommandGroup(entry);
			const index = command.options.findIndex((option) => option.name === data.name);
			if (index === -1) {
				command.options.push(data);
			} else {
				data = this.#mergeOption(command.options[index], data) as ChatInputCommandResolver.ResolvedSubcommandGroup;
				command.options[index] = data;
			}

			if (method) linkMethod(data, method);
		}
	}

	/**
	 * Resolves the subcommands for a given command.
	 *
	 * @param command - The resolved command object.
	 */
	#resolveSubcommands(command: ChatInputCommandResolver.ResolvedCommand) {
		if (this.#subcommandData.length === 0) return;

		command.options ??= [];
		for (const [method, groupName, entry] of this.#subcommandData) {
			let data = this.#normalizeSubcommand(entry);

			let parent: ChatInputCommandResolver.ResolvedCommand | ChatInputCommandResolver.ResolvedSubcommandGroup;
			if (groupName === null) {
				parent = command;
			} else {
				const group = command.options.find((option) => option.name === groupName) as APIApplicationCommandOption | undefined;
				if (group === undefined) {
					throw new Error(`The command '${command.name}' has no subcommand group named '${groupName}'`);
				}

				if (group.type !== ApplicationCommandOptionType.SubcommandGroup) {
					throw new Error(`The command '${command.name}' has an option named '${groupName}' that is not a group`);
				}

				parent = group;
			}

			parent.options ??= [];
			const index = parent.options.findIndex((option) => option.name === data.name);
			if (index === -1) {
				parent.options.push(data);
			} else {
				data = this.#mergeOption(parent.options[index], data) as ChatInputCommandResolver.ResolvedSubcommand;
				parent.options[index] = data;
			}

			if (!method) continue;

			const dataMethod = getLinkedMethod(data);
			if (dataMethod) {
				if (dataMethod !== method) {
					throw new Error(`The command '${command.name}' has a subcommand named '${data.name}' that was already linked to '${dataMethod}'`);
				}
			} else {
				linkMethod(data, method);
			}
		}
	}

	/**
	 * Normalizes the command data and returns the resolved command.
	 *
	 * @param data The command data to be normalized.
	 * @returns The resolved command.
	 * @throws An `Error` if the command data is null or undefined.
	 */
	#normalizeCommand(data: ChatInputCommandResolver.CommandData | null): ChatInputCommandResolver.ResolvedCommand {
		if (isNullish(data)) {
			throw new Error('Could not normalize command data');
		}

		if (isFunction(data)) {
			const builder = new SlashCommandBuilder();
			data = data(builder) ?? builder;
		}

		return { type: ApplicationCommandType.ChatInput, ...(isJSONEncodable(data) ? data.toJSON() : data) };
	}

	/**
	 * Normalizes the subcommand group data and returns the resolved subcommand group.
	 *
	 * @param data - The subcommand group data to be normalized.
	 * @returns The normalized subcommand group.
	 */
	#normalizeSubcommandGroup(data: ChatInputCommandResolver.SubcommandGroupData): ChatInputCommandResolver.ResolvedSubcommandGroup {
		if (isFunction(data)) {
			const builder = new SlashCommandSubcommandGroupBuilder();
			data = data(builder) ?? builder;
		}

		return { type: ApplicationCommandOptionType.SubcommandGroup, ...(isJSONEncodable(data) ? data.toJSON() : data) };
	}

	/**
	 * Normalizes the subcommand data and returns the resolved subcommand.
	 *
	 * @param data - The subcommand data to be normalized.
	 * @returns The resolved subcommand.
	 */
	#normalizeSubcommand(data: ChatInputCommandResolver.SubcommandData): ChatInputCommandResolver.ResolvedSubcommand {
		if (isFunction(data)) {
			const builder = new SlashCommandSubcommandBuilder();
			data = data(builder) ?? builder;
		}

		return { type: ApplicationCommandOptionType.Subcommand, ...(isJSONEncodable(data) ? data.toJSON() : data) };
	}

	/**
	 * Merges two arrays of {@linkcode APIApplicationCommandOption} objects.
	 *
	 * - If the 'existing' array is empty or undefined, the 'data' array is returned.
	 * - If the 'data' array is empty or undefined, the 'existing' array is returned.
	 * - If both arrays have elements, the options with the same name are merged.
	 *
	 * @param existing The existing array of {@linkcode APIApplicationCommandOption} objects.
	 * @param data The data array of {@linkcode APIApplicationCommandOption} objects.
	 * @returns The merged array of {@linkcode APIApplicationCommandOption} objects.
	 */
	#mergeOptions(
		existing: APIApplicationCommandOption[] | undefined,
		data: APIApplicationCommandOption[] | undefined
	): APIApplicationCommandOption[] {
		if (!existing?.length) return data ?? [];
		if (!data?.length) return existing;

		const entries = new Map(existing.map((option) => [option.name, option]));
		for (const option of data) {
			entries.set(option.name, this.#mergeOption(entries.get(option.name), option));
		}

		return [...entries.values()];
	}

	/**
	 * Merges two {@linkcode APIApplicationCommandOption} objects.
	 *
	 * - If the `existing` option is not provided, the `data` option is returned.
	 * - If the types of the existing and data options do not match, a {@link TypeError} is thrown.
	 * - If both existing and data options have 'options' property, the options are recursively merged.
	 * - Otherwise, the options are shallow merged.
	 * - If a method is present in either the data or existing option, it is linked to the merged option.
	 *
	 * @param existing - The existing {@linkcode APIApplicationCommandOption} object.
	 * @param data - The data {@linkcode APIApplicationCommandOption} object.
	 * @returns The merged {@linkcode APIApplicationCommandOption} object.
	 */
	#mergeOption(existing: APIApplicationCommandOption | undefined, data: APIApplicationCommandOption): APIApplicationCommandOption {
		if (!existing) return data;
		if (existing.type !== data.type) {
			const existingType = ApplicationCommandOptionType[existing.type];
			const dataType = ApplicationCommandOptionType[data.type];
			throw new TypeError(`Mismatching types, expected '${existingType}', but received '${dataType}'`);
		}

		const merged =
			'options' in existing && 'options' in data
				? ({ ...existing, ...data, options: this.#mergeOptions(existing.options, data.options) } as APIApplicationCommandOption)
				: ({ ...existing, ...data } as APIApplicationCommandOption);

		const method = getLinkedMethod(data) ?? getLinkedMethod(existing);
		return method ? linkMethod(merged, method) : merged;
	}
}

export namespace ChatInputCommandResolver {
	export type CommandDataResolvable = Omit<ResolvedCommand, 'type'> | JSONEncodable<ResolvedCommand>;
	export type CommandData =
		| CommandDataResolvable //
		| ((builder: SlashCommandBuilder) => CommandDataResolvable | Void);

	export type SubcommandGroupDataResolvable = Omit<ResolvedSubcommandGroup, 'type'> | JSONEncodable<ResolvedSubcommandGroup>;
	export type SubcommandGroupData =
		| SubcommandGroupDataResolvable //
		| ((builder: SlashCommandSubcommandGroupBuilder) => SubcommandGroupDataResolvable | Void);

	export type SubcommandDataResolvable = Omit<ResolvedSubcommand, 'type'> | JSONEncodable<ResolvedSubcommand>;
	export type SubcommandData =
		| SubcommandDataResolvable //
		| ((builder: SlashCommandSubcommandBuilder) => SubcommandDataResolvable | Void);

	export type ResolvedCommand = RESTPostAPIChatInputApplicationCommandsJSONBody;
	export type ResolvedSubcommandGroup = APIApplicationCommandSubcommandGroupOption;
	export type ResolvedSubcommand = APIApplicationCommandSubcommandOption;
}

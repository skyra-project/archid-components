import { ContextMenuCommandBuilder, type ContextMenuCommandType } from '@discordjs/builders';
import { isJSONEncodable, type JSONEncodable } from '@discordjs/util';
import { isFunction, isNullish } from '@sapphire/utilities';
import type { RESTPostAPIContextMenuApplicationCommandsJSONBody } from 'discord-api-types/v10';
import type { Void } from '../../utils/internals.js';
import { linkMethod } from '../shared/link.js';

/**
 * The command resolver for context menu commands.
 * @internal
 */
export class ContextMenuCommandResolver implements JSONEncodable<ContextMenuCommandResolver.ResolvedCommand> {
	#data: ContextMenuCommandResolver.ResolvedCommand | null = null;
	#commandData: ContextMenuCommandResolver.CommandData | null = null;
	#commandType: ContextMenuCommandType | null = null;
	#commandMethod: string | null = null;

	/**
	 * Sets the command data, type, and method for the context menu command resolver.
	 *
	 * @param data - The command data.
	 * @param type - The command type.
	 * @param method - The command method (optional).
	 * @returns The updated context menu command resolver.
	 */
	public setCommand(data: ContextMenuCommandResolver.CommandData, type: ContextMenuCommandType, method?: string | null) {
		this.#commandData = data;
		this.#commandType = type;
		this.#commandMethod = method ?? null;
		return this;
	}

	/**
	 * Converts the {@linkcode ContextMenuCommandResolver} instance to a JSON representation.
	 *
	 * @returns The JSON representation of the {@linkcode ContextMenuCommandResolver} instance.
	 */
	public toJSON(): ContextMenuCommandResolver.ResolvedCommand {
		return (this.#data ??= this.#resolve());
	}

	/**
	 * Resolves the context menu command.
	 *
	 * @returns The resolved command.
	 */
	#resolve(): ContextMenuCommandResolver.ResolvedCommand {
		const data = this.#commandData;
		const type = this.#commandType;
		if (isNullish(data) || isNullish(type)) {
			throw new Error('Could not normalize command data');
		}

		const resolved = this.#normalizeContextMenuCommand(data, type);
		return this.#commandMethod ? linkMethod(resolved, this.#commandMethod) : resolved;
	}

	/**
	 * Normalizes the context menu command.
	 *
	 * @param data - The command data.
	 * @param type - The command type.
	 * @returns The normalized context menu command.
	 */
	#normalizeContextMenuCommand(
		data: ContextMenuCommandResolver.CommandData,
		type: ContextMenuCommandType
	): RESTPostAPIContextMenuApplicationCommandsJSONBody {
		if (isFunction(data)) {
			const builder = new ContextMenuCommandBuilder().setType(type);
			data = data(builder) ?? builder;
		}

		return { type, ...(isJSONEncodable(data) ? data.toJSON() : data) };
	}
}

export namespace ContextMenuCommandResolver {
	export type CommandDataResolvable =
		| Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'type'>
		| JSONEncodable<RESTPostAPIContextMenuApplicationCommandsJSONBody>;
	export type CommandData =
		| CommandDataResolvable //
		| ((builder: ContextMenuCommandBuilder) => CommandDataResolvable | Void);

	export type ResolvedCommand = RESTPostAPIContextMenuApplicationCommandsJSONBody;
}

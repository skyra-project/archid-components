import { Collection } from '@discordjs/collection';
import type { JSONEncodable } from '@discordjs/util';
import type { RESTPostAPIApplicationCommandsJSONBody, Snowflake } from 'discord-api-types/v10';
import { ChatInputCommandResolver } from '../resolvers/ChatInputCommandResolver.js';
import { ContextMenuCommandResolver } from '../resolvers/ContextMenuCommandResolver.js';

/**
 * Represents an entry in the application command registry.
 *
 * This class provides methods to manage and manipulate application command data.
 *
 * @since 2.0.0
 */
export class ApplicationCommandRegistryEntry implements JSONEncodable<ApplicationCommandRegistryEntry.Command[]> {
	#chatInput: ChatInputCommandResolver | null = null;
	#contextMenu: ContextMenuCommandResolver[] = [];
	#ids = new Collection<null | Snowflake, Snowflake>();

	/**
	 * Retrieves the loaded global ID of the {@linkcode ApplicationCommandRegistryEntry}.
	 *
	 * @since 2.0.0
	 * @returns The loaded global ID of the {@linkcode ApplicationCommandRegistryEntry}, or `null` if it's not set.
	 */
	public getGlobalId(): Snowflake | null {
		return this.#ids.get(null) ?? null;
	}

	/**
	 * Sets the loaded global ID for the {@linkcode ApplicationCommandRegistryEntry}.
	 *
	 * @since 2.0.0
	 * @param value - The Snowflake value to set as the global ID.
	 * @returns The updated {@linkcode ApplicationCommandRegistryEntry} instance.
	 */
	public setGlobalId(value: Snowflake) {
		this.#ids.set(null, value);
		return this;
	}

	/**
	 * Retrieves the loaded guild ID associated with the given guild ID.
	 *
	 * @since 2.0.0
	 * @param guildId The guild ID to retrieve.
	 * @returns The associated guild ID, or null if not found.
	 */
	public getGuildId(guildId: Snowflake): Snowflake | null {
		return this.#ids.get(guildId) ?? null;
	}

	/**
	 * Sets the loaded guild ID for the registry entry.
	 *
	 * @since 2.0.0
	 * @param guildId - The guild ID to set.
	 * @param value - The value to associate with the guild ID.
	 * @returns The updated registry entry.
	 */
	public setGuildId(guildId: Snowflake, value: Snowflake): this {
		this.#ids.set(guildId, value);
		return this;
	}

	/**
	 * Gets the chat input command resolver.
	 *
	 * @since 2.0.0
	 * @returns The chat input command resolver or `null` if not set.
	 */
	public get chatInput(): ChatInputCommandResolver | null {
		return this.#chatInput;
	}

	/**
	 * Gets the context menu commands associated with this registry entry.
	 *
	 * @since 2.0.0
	 * @returns An array of {@linkcode ContextMenuCommandResolver} objects representing the context menu commands.
	 */
	public get contextMenu(): ContextMenuCommandResolver[] {
		return this.#contextMenu;
	}

	/**
	 * Converts the {@linkcode ApplicationCommandRegistryEntry} to a JSON representation.
	 *
	 * @since 2.0.0
	 * @returns An array of Command objects in JSON format.
	 */
	public toJSON(): ApplicationCommandRegistryEntry.Command[] {
		return this.#chatInput === null
			? this.#contextMenu.map((command) => command.toJSON())
			: [this.#chatInput.toJSON(), ...this.#contextMenu.map((command) => command.toJSON())];
	}

	/**
	 * Creates a chat input command resolver.
	 * If the resolver has already been created, it returns the existing instance.
	 *
	 * @since 2.0.0
	 * @returns The chat input command resolver.
	 * @internal
	 */
	public makeChatInput(): ChatInputCommandResolver {
		return (this.#chatInput ??= new ChatInputCommandResolver());
	}

	/**
	 * Creates a context menu command resolver and adds it to the context menu.
	 *
	 * @since 2.0.0
	 * @returns The created context menu command resolver.
	 * @internal
	 */
	public makeContextMenu(): ContextMenuCommandResolver {
		const resolver = new ContextMenuCommandResolver();
		this.#contextMenu.push(resolver);
		return resolver;
	}
}

export namespace ApplicationCommandRegistryEntry {
	export type Command = RESTPostAPIApplicationCommandsJSONBody;
}

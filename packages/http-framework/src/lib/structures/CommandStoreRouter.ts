import { Collection } from '@discordjs/collection';
import { ApplicationCommandType, type APIApplicationCommandInteraction } from 'discord-api-types/v10';
import type { Command } from './Command.js';

/**
 * Represents a router for mapping commands to chat inputs and context menus.
 *
 * @since 2.0.0
 */
export class CommandStoreRouter {
	#chatInputMappings = new Collection<string, Command>();
	#contextMenuMappings = new Collection<string, Command>();

	/**
	 * Gets the command associated with the given interaction.
	 *
	 * @since 2.0.0
	 * @param interaction - The interaction object.
	 * @returns The command associated with the interaction, or null if not found.
	 */
	public get(interaction: APIApplicationCommandInteraction) {
		return interaction.data.type === ApplicationCommandType.ChatInput
			? this.getChatInput(interaction.data.name)
			: this.getContextMenu(interaction.data.name);
	}

	/**
	 * Gets the chat input command with the specified name.
	 *
	 * @since 2.0.0
	 * @param name - The name of the chat input command.
	 * @returns The chat input command with the specified name, or null if not found.
	 */
	public getChatInput(name: string): Command | null {
		return this.#chatInputMappings.get(name) ?? null;
	}

	/**
	 * Gets the context menu command with the specified name.
	 *
	 * @since 2.0.0
	 * @param name - The name of the context menu command.
	 * @returns The context menu command with the specified name, or null if not found.
	 */
	public getContextMenu(name: string): Command | null {
		return this.#contextMenuMappings.get(name) ?? null;
	}

	/**
	 * Adds a chat input mapping.
	 *
	 * @since 2.0.0
	 * @param name - The name of the mapping.
	 * @param command - The command to be mapped.
	 * @internal
	 */
	public addChatInputMapping(name: string, command: Command): void {
		this.#chatInputMappings.set(name, command);
	}

	/**
	 * Adds a context menu mapping.
	 *
	 * @since 2.0.0
	 * @param name - The name of the mapping.
	 * @param command - The command to be mapped.
	 * @internal
	 */
	public addContextMenuMapping(name: string, command: Command): void {
		this.#contextMenuMappings.set(name, command);
	}

	/**
	 * Removes a chat input mapping.
	 *
	 * @since 2.0.0
	 * @param name - The name of the mapping to be removed.
	 * @returns True if the mapping was successfully removed, false otherwise.
	 * @internal
	 */
	public removeChatInputMapping(name: string): boolean {
		return this.#chatInputMappings.delete(name);
	}

	/**
	 * Removes a context menu mapping.
	 *
	 * @since 2.0.0
	 * @param name - The name of the mapping to be removed.
	 * @returns True if the mapping was successfully removed, false otherwise.
	 * @internal
	 */
	public removeContextMenuMapping(name: string): boolean {
		return this.#contextMenuMappings.delete(name);
	}
}

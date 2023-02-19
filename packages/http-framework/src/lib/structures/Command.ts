import { Collection } from '@discordjs/collection';
import { Piece } from '@sapphire/pieces';
import type { Awaitable, NonNullObject } from '@sapphire/utilities';
import {
	ApplicationCommandOptionType,
	type APIChatInputApplicationCommandInteractionData,
	type APIContextMenuInteractionData
} from 'discord-api-types/v10';
import { chatInputCommandRegistry, contextMenuCommandRegistry, Interactions, type AutocompleteInteractionArguments } from '../interactions';
import { getMethod } from '../interactions/shared/link';
import type { CommandStore } from './CommandStore';

export abstract class Command extends Piece {
	private chatInputRouter = new Collection<string, string | Collection<string, string>>();
	private contextMenuRouter = new Collection<string, string>();

	public override onLoad() {
		this.populateChatInputRouter();
		this.populateContextMenuRouter();
	}

	/**
	 * Responds to the chat input command for this command
	 * @param interaction The interaction to be handled.
	 * @param args The parsed arguments for this autocomplete interaction.
	 */
	protected chatInputRun(interaction: Command.ApplicationCommandInteraction, args: NonNullObject): Awaitable<unknown>;
	protected chatInputRun(interaction: Command.ApplicationCommandInteraction) {
		return interaction.reply({});
	}

	/**
	 * Responds to an auto completable option for this command
	 * @param interaction The interaction to be handled.
	 * @param args The parsed arguments for this autocomplete interaction.
	 * @returns The response to the autocomplete interaction.
	 */
	protected autocompleteRun(interaction: Command.AutocompleteInteraction, args: AutocompleteInteractionArguments<any>): Awaitable<unknown>;
	protected autocompleteRun(interaction: Command.AutocompleteInteraction) {
		return interaction.replyEmpty();
	}

	protected routeChatInputInteraction(data: APIChatInputApplicationCommandInteractionData): string | null {
		if (!data.options?.length) return 'chatInputRun';

		const [firstOption] = data.options;
		if (firstOption.type === ApplicationCommandOptionType.Subcommand) {
			const possible = this.chatInputRouter.get(firstOption.name);
			return typeof possible === 'string' ? possible : null;
		}

		if (firstOption.type === ApplicationCommandOptionType.SubcommandGroup) {
			const possibleGroup = this.chatInputRouter.get(firstOption.name);
			if (!(possibleGroup instanceof Collection)) return null;

			const [firstSubOption] = firstOption.options;
			const possible = possibleGroup.get(firstSubOption.name);
			return possible ?? null;
		}

		return 'chatInputRun';
	}

	protected routeContextMenuInteraction(data: APIContextMenuInteractionData): string | null {
		const possible = this.contextMenuRouter.get(data.name);
		return typeof possible === 'string' ? possible : null;
	}

	private populateChatInputRouter() {
		const data = chatInputCommandRegistry.get(this.constructor as typeof Command);
		if (!data?.options?.length) return;

		for (const option of data.options) {
			if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
				// If a subcommand group has no subcommands, skip:
				if (!option.options?.length) continue;

				// If a subcommand group already existed, throw an error:
				if (this.chatInputRouter.has(option.name)) throw new Error(`Duplicated chat input SubcommandGroup named "${option.name}"`);

				const subcommands = new Collection<string, string>();
				for (const subOption of option.options) {
					const method = getMethod(subOption);
					if (method && typeof Reflect.get(this, method) === 'function') {
						subcommands.set(subOption.name, method);
					} else {
						throw new Error(
							`Chat input subcommand named "${option.name}" (inside SubcommandGroup named "${option.name}") is not linked to a method`
						);
					}
				}

				this.chatInputRouter.set(option.name, subcommands);
			} else if (option.type === ApplicationCommandOptionType.Subcommand) {
				// If a subcommand group already existed, throw an error:
				if (this.chatInputRouter.has(option.name)) throw new Error(`Duplicated Subcommand named "${option.name}"`);

				const method = getMethod(option);
				if (method && typeof Reflect.get(this, method) === 'function') this.chatInputRouter.set(option.name, method);
				else throw new Error(`Chat input subcommand named "${option.name}" is not linked to a method`);
			}
		}
	}

	private populateContextMenuRouter() {
		const entries = contextMenuCommandRegistry.get(this.constructor as typeof Command);
		if (!entries?.length) return;

		for (const entry of entries) {
			const method = getMethod(entry);
			if (method && typeof Reflect.get(this, method) === 'function') {
				this.contextMenuRouter.set(entry.name, method);
				(this.store as CommandStore).contextMenuCommands.set(entry.name, this);
			} else {
				throw new Error(`Context menu command named "${entry.name}" is not linked to a method`);
			}
		}
	}
}

export namespace Command {
	export type AutocompleteInteraction = Interactions.Autocomplete;

	export type ChatInputInteraction = Interactions.ChatInputCommand;
	export type UserInteraction = Interactions.UserContextMenuCommand;
	export type MessageInteraction = Interactions.MessageContextMenuCommand;

	export type ContextMenuInteraction = Interactions.ContextMenuCommand;
	export type ApplicationCommandInteraction = Interactions.ApplicationCommand;

	export type Interaction = ChatInputInteraction | AutocompleteInteraction | UserInteraction | MessageInteraction;
	export type InteractionData = Interaction['data'];

	// Piece re-exports
	export type Context = Piece.Context;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
	export type Options = Piece.Options;
}

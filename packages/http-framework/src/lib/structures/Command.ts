import { Collection } from '@discordjs/collection';
import { Piece } from '@sapphire/pieces';
import type { Awaitable, NonNullObject } from '@sapphire/utilities';
import type { APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/payloads/v9/_interactions/autocomplete';
import {
	ApplicationCommandOptionType,
	ComponentType,
	InteractionResponseType,
	type APIApplicationCommandAutocompleteResponse,
	type APIApplicationCommandInteraction,
	type APIChatInputApplicationCommandInteractionData,
	type APIContextMenuInteractionData,
	type APIInteractionResponseCallbackData,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponseDeferredChannelMessageWithSource,
	type APIModalInteractionResponse,
	type APISelectMenuOption
} from 'discord-api-types/v10';
import { chatInputCommandRegistry, contextMenuCommandRegistry, type AutocompleteInteractionArguments } from '../interactions';
import { getMethod } from '../interactions/shared/link';
import type {
	AddFiles,
	AsyncInteractionHandlerResponse,
	InteractionHandlerGeneratorResponse,
	InteractionHandlerResponse
} from '../interactions/utils/util';

export abstract class Command extends Piece {
	private chatInputRouter = new Collection<string, string | Collection<string, string>>();
	private contextMenuRouter = new Collection<string, string>();

	public override onLoad() {
		this.populateChatInputRouter();
		this.populateContextMenuRouter();
	}

	/**
	 * Responds to the chat input command for this command
	 * @param interaction The interaction to be routed.
	 * @param args The parsed arguments for this autocomplete interaction.
	 */
	protected chatInputRun(interaction: APIApplicationCommandInteraction, args: NonNullObject): Command.Response;
	protected chatInputRun(): Command.Response {
		return { type: InteractionResponseType.ChannelMessageWithSource, data: {} };
	}

	/**
	 * Responds to an auto completable option for this command
	 * @param interaction The interaction to be routed.
	 * @param args The parsed arguments for this autocomplete interaction.
	 * @returns The response to the autocomplete interaction.
	 */
	protected autocompleteRun(
		interaction: APIApplicationCommandAutocompleteInteraction,
		args: AutocompleteInteractionArguments<any>
	): Command.AutocompleteResponse;

	protected autocompleteRun(): Command.AutocompleteResponse {
		return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data: {} };
	}

	/**
	 * Responds to the interaction with an autocomplete result.
	 * @param data The data to be sent.
	 */
	protected autocomplete(data: Command.AutocompleteResponseOptions): Command.AutocompleteResponseResult {
		return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data };
	}

	/**
	 * Responds to the interaction with an empty autocomplete result.
	 */
	protected autocompleteNoResults(): Command.AutocompleteResponseResult {
		return this.autocomplete({ choices: [] });
	}

	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	protected message(data: Command.MessageResponseOptions): Command.MessageResponseResult;
	protected message({ files, ...data }: Command.MessageResponseOptions): Command.MessageResponseResult {
		return { type: InteractionResponseType.ChannelMessageWithSource, data, files };
	}

	/**
	 * ACK an interaction and edit a response later. The user sees a loading state.
	 * @param data The data to be sent, if any.
	 */
	protected defer(data?: Command.DeferResponseOptions): Command.DeferResponseResult {
		return { type: InteractionResponseType.DeferredChannelMessageWithSource, data };
	}

	/**
	 * Responds to the interaction with a popup modal.
	 * @param data The data to be sent.
	 */
	protected modal(data: Command.ModalResponseOptions): Command.ModalResponseResult {
		return { type: InteractionResponseType.Modal, data };
	}

	/**
	 * Responds to the interaction with a message holding a Select Menu component.
	 * @param customId The Custom ID to attach to the Select Menu
	 * @param selectMenuOptions The options to show in the Select Menu
	 * @param data The data to be sent.
	 */
	protected selectMenuMessage(
		customId: string,
		selectMenuOptions: APISelectMenuOption[],
		data: APIInteractionResponseCallbackData
	): APIInteractionResponseChannelMessageWithSource {
		return this.message({
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.SelectMenu,
							custom_id: customId,
							options: selectMenuOptions
						}
					]
				},
				...(data.components ?? [])
			],
			...data
		});
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
			const possible = this.chatInputRouter.get(firstSubOption.name);
			return typeof possible === 'string' ? possible : null;
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
			if (method && typeof Reflect.get(this, method) === 'function') this.chatInputRouter.set(entry.name, method);
			else throw new Error(`Context menu command named "${entry.name}" is not linked to a method`);
		}
	}
}

export namespace Command {
	export type Response = InteractionHandlerResponse;
	export type AsyncResponse = AsyncInteractionHandlerResponse;
	export type GeneratorResponse = InteractionHandlerGeneratorResponse;

	export type AutocompleteResponse = Awaitable<AutocompleteResponseResult>;
	export type AsyncAutocompleteResponse = PromiseLike<AutocompleteResponseResult>;

	export type Interaction = import('discord-api-types/v10').APIApplicationCommandInteraction;
	export type InteractionData = Interaction['data'];

	export type AutocompleteInteraction = import('discord-api-types/v10').APIApplicationCommandAutocompleteInteraction;

	// API types re-exports
	export type AutocompleteResponseResult = APIApplicationCommandAutocompleteResponse;
	export type AutocompleteResponseOptions = APIApplicationCommandAutocompleteResponse['data'];
	export type MessageResponseResult = AddFiles<APIInteractionResponseChannelMessageWithSource>;
	export type MessageResponseOptions = AddFiles<APIInteractionResponseChannelMessageWithSource['data']>;
	export type DeferResponseResult = APIInteractionResponseDeferredChannelMessageWithSource;
	export type DeferResponseOptions = APIInteractionResponseDeferredChannelMessageWithSource['data'];
	export type ModalResponseOptions = APIModalInteractionResponse['data'];
	export type ModalResponseResult = APIModalInteractionResponse;
}

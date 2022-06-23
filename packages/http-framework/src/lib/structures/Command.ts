import { Collection } from '@discordjs/collection';
import { makeURLSearchParams, type RawFile } from '@discordjs/rest';
import { Piece } from '@sapphire/pieces';
import type { Awaitable, NonNullObject } from '@sapphire/utilities';
import type { APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/payloads/v9/_interactions/autocomplete';
import {
	ApplicationCommandOptionType,
	ComponentType,
	InteractionResponseType,
	Routes,
	type APIApplicationCommandAutocompleteResponse,
	type APIApplicationCommandInteraction,
	type APIChatInputApplicationCommandInteractionData,
	type APIContextMenuInteractionData,
	type APIInteractionResponseCallbackData,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponseDeferredChannelMessageWithSource,
	type APIMessage,
	type APIModalInteractionResponse,
	type APISelectMenuOption,
	type RESTPatchAPIInteractionOriginalResponseResult
} from 'discord-api-types/v10';
import { chatInputCommandRegistry, contextMenuCommandRegistry, type AutocompleteInteractionArguments } from '../interactions';
import { getMethod } from '../interactions/shared/link';
import type {
	AddFiles,
	AsyncInteractionHandlerResponse,
	InteractionHandlerGeneratorResponse,
	InteractionHandlerResponse,
	InteractionUpdateMessageWithFiles
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
	 * Updates a message response.
	 * @param data The data to be sent.
	 */
	protected updateResponse(data: Command.UpdateResponseOptions) {
		return data;
	}

	/**
	 * Edits the initial Interaction response.
	 *
	 * When the `content` field is edited, the `mentions` array in the message object will be reconstructed from scratch based on the new content.
	 * The `allowed_mentions` field of the edit request controls how this happens.
	 * If there is no explicit `allowed_mentions` in the edit request, the content will be parsed with default allowances,
	 * that is, without regard to whether or not an `allowed_mentions` was present in the request that originally created the message.
	 *
	 * Refer to [Uploading Files](https://discord.com/developers/docs/reference#uploading-files) for details on attachments.
	 *
	 * Any provided files will be **appended** to the message. To remove or replace files you will have to supply the `attachments` field which
	 * specifies the files to retain on the message after edit.
	 *
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
	 * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook-message}
	 *
	 * @param interaction The replied to Interaction of which you want to edit the reply
	 * @param options The {@link Command.EditReplyOptions} to edit the reply with
	 * @param message The message to delete, defaults to `'@original'`
	 * @returns The edited message.
	 */
	protected editReply(
		interaction: Command.Interaction,
		options: Command.EditReplyOptions,
		message: string | APIMessage = '@original'
	): Promise<Command.UpdateResponseResult> {
		return this.container.rest.patch(
			Routes.webhookMessage(interaction.application_id, interaction.token, typeof message === 'string' ? message : message.id),
			{
				body: {
					...options.data,
					type: InteractionResponseType.ChannelMessageWithSource
				},
				auth: false,
				files: options.files,
				query: makeURLSearchParams({ thread_id: options.threadId })
			}
		) as Promise<Command.UpdateResponseResult>;
	}

	/**
	 * Deletes the initial Interaction response.
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response}
	 * @param interaction The replied to Interaction of which you want to delete the reply.
	 * @param message The message to delete, defaults to `'@original'`
	 * @param threadId The thread ID to delete the message in
	 * @returns Returns `204 No Content` on success. Does not support ephemeral follow-ups.
	 */
	protected deleteReply(interaction: Command.Interaction, message: string | APIMessage = '@original', threadId?: string): Promise<void> {
		return this.container.rest.delete(
			Routes.webhookMessage(interaction.application_id, interaction.token, typeof message === 'string' ? message : message.id),
			{ auth: false, query: makeURLSearchParams({ thread_id: threadId }) }
		) as Promise<void>;
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
	export type AsyncAutocompleteResponse = Promise<AutocompleteResponseResult>;

	export type Interaction = import('discord-api-types/v10').APIApplicationCommandInteraction;
	export type InteractionData = Interaction['data'];

	export type AutocompleteInteraction = import('discord-api-types/v10').APIApplicationCommandAutocompleteInteraction;

	// Piece re-exports
	export type Context = Piece.Context;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
	export type Options = Piece.Options;

	// API types re-exports
	export type AutocompleteResponseResult = APIApplicationCommandAutocompleteResponse;
	export type AutocompleteResponseOptions = APIApplicationCommandAutocompleteResponse['data'];
	export type MessageResponseResult = AddFiles<APIInteractionResponseChannelMessageWithSource>;
	export type MessageResponseOptions = AddFiles<APIInteractionResponseChannelMessageWithSource['data']>;
	export type DeferResponseResult = APIInteractionResponseDeferredChannelMessageWithSource;
	export type DeferResponseOptions = APIInteractionResponseDeferredChannelMessageWithSource['data'];
	export type ModalResponseOptions = APIModalInteractionResponse['data'];
	export type ModalResponseResult = APIModalInteractionResponse;
	export type UpdateResponseResult = RESTPatchAPIInteractionOriginalResponseResult;
	export type UpdateResponseOptions = InteractionUpdateMessageWithFiles;

	export interface EditReplyOptions {
		data: Omit<MessageResponseOptions, 'flags' | 'type'>;
		files?: RawFile[];
		threadId?: string;
	}
}

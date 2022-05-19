import { Piece } from '@sapphire/pieces';
import {
	InteractionResponseType,
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteraction,
	type APIInteraction,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponseDeferredChannelMessageWithSource,
	type APIInteractionResponseDeferredMessageUpdate,
	type APIInteractionResponseUpdateMessage,
	type APIMessageComponentInteraction,
	type APIModalInteractionResponse,
	type APIPingInteraction
} from 'discord-api-types/v10';
import type { AddFiles, InteractionHandlerGeneratorResponse, InteractionHandlerResponse } from '../interactions/utils/util';

export abstract class InteractionHandler extends Piece {
	public abstract run(interaction: InteractionHandler.Interaction, customIdValue: unknown): InteractionHandler.Response;

	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	protected message(data: InteractionHandler.MessageResponseOptions): InteractionHandler.MessageResponseResult;
	protected message({ files, ...data }: InteractionHandler.MessageResponseOptions): InteractionHandler.MessageResponseResult {
		return { type: InteractionResponseType.ChannelMessageWithSource, data, files };
	}

	/**
	 * ACK an interaction and edit a response later. The user sees a loading state.
	 * @param data The data to be sent, if any.
	 */
	protected defer(data?: InteractionHandler.DeferResponseOptions): InteractionHandler.DeferResponseResult {
		return { type: InteractionResponseType.DeferredChannelMessageWithSource, data };
	}

	/**
	 * ACK an interaction and edit the original message later. The user does **not** see a loading state.
	 * @note This method only works on message components.
	 */
	protected deferUpdate(): InteractionHandler.DeferUpdateResponseResult {
		return { type: InteractionResponseType.DeferredMessageUpdate };
	}

	/**
	 * Edits the message the component was attached to.
	 * @note This method only works on message components.
	 * @param data The data to be sent.
	 */
	protected updateMessage(data?: InteractionHandler.UpdateMessageResponseOptions): InteractionHandler.UpdateMessageResponseResult;
	protected updateMessage({
		files,
		...data
	}: InteractionHandler.UpdateMessageResponseOptions = {}): InteractionHandler.UpdateMessageResponseResult {
		return { type: InteractionResponseType.UpdateMessage, data, files };
	}

	/**
	 * Responds to the interaction with a popup modal.
	 * @param data The data to be sent.
	 */
	protected modal(data: InteractionHandler.ModalResponseOptions): InteractionHandler.ModalResponseResult {
		return { type: InteractionResponseType.Modal, data };
	}
}

export namespace InteractionHandler {
	export type Response = InteractionHandlerResponse;
	export type AsyncResponse = PromiseLike<Awaited<Response>>;
	export type GeneratorResponse = InteractionHandlerGeneratorResponse;

	export type Interaction = Exclude<
		APIInteraction,
		APIPingInteraction | APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction
	>;
	export type MessageComponentInteraction = APIMessageComponentInteraction;
	export type MessageComponentInteractionData = MessageComponentInteraction['data'];

	// Piece re-exports
	export type Context = Piece.Context;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
	export type Options = Piece.Options;

	// API types re-exports
	export type MessageResponseResult = AddFiles<APIInteractionResponseChannelMessageWithSource>;
	export type MessageResponseOptions = AddFiles<APIInteractionResponseChannelMessageWithSource['data']>;
	export type DeferResponseResult = APIInteractionResponseDeferredChannelMessageWithSource;
	export type DeferResponseOptions = APIInteractionResponseDeferredChannelMessageWithSource['data'];
	export type DeferUpdateResponseResult = APIInteractionResponseDeferredMessageUpdate;
	export type UpdateMessageResponseOptions = AddFiles<APIInteractionResponseUpdateMessage['data']>;
	export type UpdateMessageResponseResult = AddFiles<APIInteractionResponseUpdateMessage>;
	export type ModalResponseOptions = APIModalInteractionResponse['data'];
	export type ModalResponseResult = APIModalInteractionResponse;
}

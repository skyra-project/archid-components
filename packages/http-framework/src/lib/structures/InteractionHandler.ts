import { Piece } from '@sapphire/pieces';
import {
	APIInteractionResponseDeferredChannelMessageWithSource,
	APIInteractionResponseDeferredMessageUpdate,
	APIModalInteractionResponse,
	InteractionResponseType,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponseUpdateMessage,
	type APIMessageComponentInteraction
} from 'discord-api-types/v10';
import type { InteractionHandlerGeneratorResponse, InteractionHandlerResponse } from '../interactions/utils/util';

export abstract class InteractionHandler extends Piece {
	public abstract run(interaction: APIMessageComponentInteraction, customIdValue: unknown): InteractionHandler.Response;

	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	protected message(data: APIInteractionResponseChannelMessageWithSource['data']): APIInteractionResponseChannelMessageWithSource {
		return { type: InteractionResponseType.ChannelMessageWithSource, data };
	}

	/**
	 * ACK an interaction and edit a response later. The user sees a loading state.
	 * @param data The data to be sent, if any.
	 */
	protected defer(data?: APIInteractionResponseDeferredChannelMessageWithSource['data']): APIInteractionResponseDeferredChannelMessageWithSource {
		return { type: InteractionResponseType.DeferredChannelMessageWithSource, data };
	}

	/**
	 * ACK an interaction and edit the original message later. The user does **not** see a loading state.
	 * @note This method only works on message components.
	 */
	protected deferUpdate(): APIInteractionResponseDeferredMessageUpdate {
		return { type: InteractionResponseType.DeferredMessageUpdate };
	}

	/**
	 * Edits the message the component was attached to.
	 * @note This method only works on message components.
	 * @param data The data to be sent.
	 */
	protected updateMessage(data?: APIInteractionResponseUpdateMessage['data']): APIInteractionResponseUpdateMessage {
		return { type: InteractionResponseType.UpdateMessage, data };
	}

	/**
	 * Responds to the interaction with a popup modal.
	 * @param data The data to be sent.
	 */
	protected modal(data: APIModalInteractionResponse['data']): APIModalInteractionResponse {
		return { type: InteractionResponseType.Modal, data };
	}
}

export namespace InteractionHandler {
	export type Response = InteractionHandlerResponse;
	export type GeneratorResponse = InteractionHandlerGeneratorResponse;

	export type MessageComponentInteraction = import('discord-api-types/v10').APIMessageComponentInteraction;
	export type MessageComponentInteractionData = MessageComponentInteraction['data'];
}

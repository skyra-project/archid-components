import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';
import {
	InteractionResponseType,
	type APIInteractionResponse,
	type APIInteractionResponseCallbackData,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponseUpdateMessage,
	type APIMessageComponentInteraction
} from 'discord-api-types/v9';

export abstract class MessageComponentHandler extends Piece {
	public abstract run(
		interaction: APIMessageComponentInteraction,
		customIdValue: unknown
	): MessageComponentHandler.Response | MessageComponentHandler.ResponseWithCallback;

	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	protected message(data: APIInteractionResponseCallbackData): APIInteractionResponseChannelMessageWithSource {
		return { type: InteractionResponseType.ChannelMessageWithSource, data };
	}

	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	protected updateMessage(data: APIInteractionResponseCallbackData): APIInteractionResponseUpdateMessage {
		return { type: InteractionResponseType.UpdateMessage, data };
	}
}

export namespace MessageComponentHandler {
	export type Response = Awaitable<APIInteractionResponse>;

	export interface ResponseWithCallback {
		response: Response;
		callback: () => PromiseLike<void> | void;
	}

	export type Interaction = APIMessageComponentInteraction;

	export type InteractionData = Interaction['data'];
}

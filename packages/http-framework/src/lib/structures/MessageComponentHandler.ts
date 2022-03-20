import { Piece } from '@sapphire/pieces';
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
	): MessageComponentHandler.AwaitableResponse | MessageComponentHandler.AwaitableResponseWithCallback;

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
	export type Response = APIInteractionResponse;
	export type ResponseAsync = PromiseLike<Response>;
	export type AwaitableResponse = Response | ResponseAsync;
	export interface AwaitableResponseWithCallback {
		response: AwaitableResponse;
		callback: () => PromiseLike<void> | void;
	}

	export type Interaction = APIMessageComponentInteraction;
	export type InteractionData = Interaction['data'];
}

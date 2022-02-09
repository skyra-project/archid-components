import { Piece } from '@sapphire/pieces';
import {
	InteractionResponseType,
	type APIInteractionResponse,
	type APIInteractionResponseCallbackData,
	type APIInteractionResponseChannelMessageWithSource,
	type APIMessageComponentInteraction
} from 'discord-api-types/v9';

export abstract class MessageComponentHandler extends Piece {
	public abstract run(interaction: APIMessageComponentInteraction, customIdValue: unknown): MessageComponentHandler.AwaitableResponse;

	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	protected message(data: APIInteractionResponseCallbackData): APIInteractionResponseChannelMessageWithSource {
		return { type: InteractionResponseType.ChannelMessageWithSource, data };
	}
}

export namespace MessageComponentHandler {
	export type Response = APIInteractionResponse;
	export type ResponseAsync = PromiseLike<Response>;
	export type AwaitableResponse = Response | ResponseAsync;

	export type Interaction = APIMessageComponentInteraction;
	export type InteractionData = Interaction['data'];
}

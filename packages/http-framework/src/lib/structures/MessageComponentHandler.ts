import { Piece } from '@sapphire/pieces';
import type { APIInteractionResponse, APIMessageComponentInteraction } from 'discord-api-types/v9';

export abstract class MessageComponentHandler extends Piece {
	public abstract run(
		interaction: APIMessageComponentInteraction,
		customIdValue: unknown
	): PromiseLike<APIInteractionResponse> | APIInteractionResponse;
}

import { Store } from '@sapphire/pieces';
import type { APIMessageComponentInteraction, APIModalSubmitInteraction } from 'discord-api-types/v10';
import type { ServerResponse } from 'node:http';
import { HttpCodes } from '../..';
import { makeInteraction } from '../interactions/utils/util';
import { ErrorMessages } from '../utils/constants';
import { InteractionHandler } from './InteractionHandler';

export class InteractionHandlerStore extends Store<InteractionHandler> {
	public constructor() {
		super(InteractionHandler, { name: 'interaction-handlers' });
	}

	public async runHandler(
		response: ServerResponse,
		interaction: APIMessageComponentInteraction | APIModalSubmitInteraction
	): Promise<ServerResponse> {
		const parsed = this.container.idParser.run(interaction.data.custom_id);
		if (parsed === null) {
			response.statusCode = HttpCodes.BadRequest;
			return response.end(ErrorMessages.InvalidCustomId);
		}

		const handler = this.get(parsed.name);
		if (!handler) {
			response.statusCode = HttpCodes.NotImplemented;
			return response.end(ErrorMessages.UnknownHandlerName);
		}

		await handler.run(makeInteraction(response, interaction), parsed.content);
		return response;
	}
}

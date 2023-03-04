import { container, Store } from '@sapphire/pieces';
import { Result } from '@sapphire/result';
import type { APIMessageComponentInteraction, APIModalSubmitInteraction } from 'discord-api-types/v10';
import type { ServerResponse } from 'node:http';
import { HttpCodes } from '../..';
import { handleError, makeInteraction } from '../interactions/utils/util';
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
		const parsed = container.idParser.run(interaction.data.custom_id);
		if (parsed === null) {
			container.client.emit('interactionHandlerNameInvalid', interaction, response);
			response.statusCode = HttpCodes.BadRequest;
			return response.end(ErrorMessages.InvalidCustomId);
		}

		const handler = this.get(parsed.name);
		if (!handler) {
			container.client.emit('interactionHandlerNameUnknown', interaction, response);
			response.statusCode = HttpCodes.NotImplemented;
			return response.end(ErrorMessages.UnknownHandlerName);
		}

		const context = { handler, interaction, response };
		container.client.emit('interactionHandlerRun', context);
		const result = await Result.fromAsync(() => handler.run(makeInteraction(response, interaction), parsed.content));
		result
			.inspect((value) => container.client.emit('interactionHandlerSuccess', context, value))
			.inspectErr((error) => (container.client.emit('interactionHandlerError', error, context), handleError(response, error)));

		container.client.emit('interactionHandlerFinish', context);
		return response;
	}
}

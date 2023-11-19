import { container, Store } from '@sapphire/pieces';
import { Result } from '@sapphire/result';
import type { APIMessageComponentInteraction, APIModalSubmitInteraction } from 'discord-api-types/v10';
import { createError, sendError, type EventHandlerResponse, type H3Event } from 'h3';
import { HttpCodes } from '../api/HttpCodes.js';
import { handleError, makeInteraction } from '../interactions/utils/util.js';
import { ErrorMessages } from '../utils/constants.js';
import { InteractionHandler } from './InteractionHandler.js';

export class InteractionHandlerStore extends Store<InteractionHandler, 'interaction-handlers'> {
	public constructor() {
		super(InteractionHandler, { name: 'interaction-handlers' });
	}

	public async runHandler(
		event: H3Event<EventHandlerResponse>,
		interaction: APIMessageComponentInteraction | APIModalSubmitInteraction
	): Promise<void> {
		const parsed = container.idParser.run(interaction.data.custom_id);
		if (parsed === null) {
			container.client.emit('interactionHandlerNameInvalid', interaction, event);
			return sendError(
				event,
				createError({
					statusCode: HttpCodes.BadRequest,
					message: ErrorMessages.InvalidCustomId
				})
			);
		}

		const handler = this.get(parsed.name);
		if (!handler) {
			container.client.emit('interactionHandlerNameUnknown', interaction, event);
			return sendError(
				event,
				createError({
					statusCode: HttpCodes.NotImplemented,
					message: ErrorMessages.UnknownHandlerName
				})
			);
		}

		const context = { handler, interaction, event };
		container.client.emit('interactionHandlerRun', context);
		const result = await Result.fromAsync(() => handler.run(makeInteraction(event, interaction), parsed.content));
		result
			.inspect((value) => container.client.emit('interactionHandlerSuccess', context, value))
			.inspectErr((error) => (container.client.emit('interactionHandlerError', error, context), handleError(event, error)));

		container.client.emit('interactionHandlerFinish', context);
	}
}

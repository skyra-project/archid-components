import { Store } from '@sapphire/pieces';
import type { APIMessageComponentInteraction } from 'discord-api-types/v9';
import type { FastifyReply } from 'fastify';
import { HttpCodes } from '../..';
import { MessageComponentHandler } from './MessageComponentHandler';

function hasCallback(
	response: MessageComponentHandler.Response | MessageComponentHandler.ResponseWithCallback
): response is MessageComponentHandler.ResponseWithCallback {
	return Reflect.has(response, 'callback');
}

export class MessageComponentHandlerStore extends Store<MessageComponentHandler> {
	public constructor() {
		super(MessageComponentHandler as any, { name: 'message-component-handlers' });
	}

	public async runHandler(reply: FastifyReply, interaction: APIMessageComponentInteraction): Promise<FastifyReply> {
		const parsed = this.container.idParser.run(interaction.data.custom_id);
		if (parsed === null) return reply.status(HttpCodes.BadRequest).send({ message: 'Could not parse the `custom_id` field' });

		const handler = this.get(parsed.name);
		if (!handler) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown handler name' });

		try {
			const response = await handler.run(interaction, parsed.content);

			if (hasCallback(response)) {
				const fastifyReply = reply.status(HttpCodes.OK).send(response.response);

				await response.callback();

				return fastifyReply;
			}

			return reply.status(HttpCodes.OK).send(response);
		} catch (error) {
			if (typeof error === 'string') {
				return reply.status(HttpCodes.OK).send({ content: error });
			}

			// Log error

			return reply.status(HttpCodes.InternalServerError).send({ message: 'Received an internal error' });
		}
	}
}

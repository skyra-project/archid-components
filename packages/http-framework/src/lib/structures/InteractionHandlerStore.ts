import { Store } from '@sapphire/pieces';
import type { APIMessageComponentInteraction, APIModalSubmitInteraction } from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import { HttpCodes } from '../..';
import { makeInteraction } from '../interactions/utils/util';
import { InteractionHandler } from './InteractionHandler';

export class InteractionHandlerStore extends Store<InteractionHandler> {
	public constructor() {
		super(InteractionHandler, { name: 'interaction-handlers' });
	}

	public async runHandler(reply: FastifyReply, interaction: APIMessageComponentInteraction | APIModalSubmitInteraction): Promise<FastifyReply> {
		const parsed = this.container.idParser.run(interaction.data.custom_id);
		if (parsed === null) return reply.status(HttpCodes.BadRequest).send({ message: 'Could not parse the `custom_id` field' });

		const handler = this.get(parsed.name);
		if (!handler) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown handler name' });

		await handler.run(makeInteraction(reply, interaction), parsed.content);
		return reply;
	}
}

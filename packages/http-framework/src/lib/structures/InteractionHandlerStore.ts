import { Store } from '@sapphire/pieces';
import type { FastifyReply } from 'fastify';
import { HttpCodes } from '../..';
import { runner } from '../interactions/utils/util';
import { InteractionHandler } from './InteractionHandler';

export class InteractionHandlerStore extends Store<InteractionHandler> {
	public constructor() {
		super(InteractionHandler as any, { name: 'interaction-handlers' });
	}

	public async runHandler(reply: FastifyReply, interaction: InteractionHandler.Interaction): Promise<FastifyReply> {
		const parsed = this.container.idParser.run(interaction.data.custom_id);
		if (parsed === null) return reply.status(HttpCodes.BadRequest).send({ message: 'Could not parse the `custom_id` field' });

		const handler = this.get(parsed.name);
		if (!handler) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown handler name' });

		const cb = () => handler.run(interaction, parsed.content);
		return runner(reply, interaction, cb);
	}
}

import { type APIInteraction, InteractionResponseType, InteractionType } from 'discord-api-types/v9';
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Buffer } from 'node:buffer';
import tweetnacl from 'tweetnacl';
import { HttpCodes } from './api/HttpCodes';

export class Client {
	public server: FastifyInstance;
	#discordPublicKey: Buffer;

	public constructor(options: ClientOptions) {
		this.#discordPublicKey = Buffer.from(options.discordPublicKey, 'hex');
		this.server = Fastify(options.serverOptions);
		this.server.post(options.serverPostPath ?? '/', this.handleHttpMessage.bind(this));
	}

	protected handleHttpMessage(request: FastifyRequest, reply: FastifyReply) {
		const interactionInvalid = this.verifyDiscordInteraction(request);
		if (interactionInvalid !== null) {
			return reply.status(interactionInvalid.statusCode).send({ message: interactionInvalid.message });
		}

		const interaction = request.body as APIInteraction;
		if (interaction.type === InteractionType.Ping) return reply.send({ type: InteractionResponseType.Pong });
	}

	protected verifyDiscordInteraction(request: FastifyRequest): VerifyDiscordInteractionResponse | null {
		const { headers } = request;
		const signatureHeader = headers['x-signature-ed25519'] as string | undefined;
		const timestampHeader = headers['x-signature-timestamp'] as string | undefined;

		if (!signatureHeader || !timestampHeader) {
			return {
				statusCode: HttpCodes.Unauthorized,
				message: 'Could not verify the signatures'
			};
		}

		const body = timestampHeader + JSON.stringify(request.body);

		const isVerified = tweetnacl.sign.detached.verify(
			Buffer.from(body),
			Buffer.from(signatureHeader, 'hex'),
			this.#discordPublicKey
		);

		if (!isVerified) {
			return {
				statusCode: HttpCodes.Unauthorized,
				message: 'The signature is incorrect.'
			};
		}

		return null;
	}
}

export interface ClientOptions {
	discordPublicKey: string;
	serverPostPath?: `/${string}`;
	serverOptions?: Parameters<typeof Fastify>[0];
}

export interface VerifyDiscordInteractionResponse {
	statusCode: HttpCodes;
	message: string;
}

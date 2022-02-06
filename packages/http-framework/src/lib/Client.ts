import { container } from '@sapphire/pieces';
import { InteractionResponseType, InteractionType, type APIInteraction } from 'discord-api-types/v9';
import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import { Buffer } from 'node:buffer';
import tweetnacl from 'tweetnacl';
import { HttpCodes } from './api/HttpCodes';
import { CommandStore } from './structures/CommandStore';

export class Client {
	public server!: FastifyInstance;
	#discordPublicKey: Buffer;

	public constructor(options: ClientOptions) {
		this.#discordPublicKey = Buffer.from(options.discordPublicKey, 'hex');
		container.stores.register(new CommandStore());
	}

	/**
	 * Loads all the commands.
	 */
	public async load() {
		await container.stores.load();
	}

	/**
	 * Starts the HTTP server, listening for HTTP interactions.
	 * @param options The listen options.
	 */
	public async listen(options: ListenOptions) {
		this.server = Fastify(options.serverOptions);
		this.server.post(options.postPath ?? '/', this.handleHttpMessage.bind(this));

		await this.server.listen(options.port);
	}

	protected async handleHttpMessage(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
		const interactionInvalid = this.verifyDiscordInteraction(request);
		if (interactionInvalid !== null) {
			return reply.status(interactionInvalid.statusCode).send({ message: interactionInvalid.message });
		}

		const interaction = request.body as APIInteraction;
		if (interaction.type === InteractionType.Ping) return reply.send({ type: InteractionResponseType.Pong });

		switch (interaction.type) {
			case InteractionType.ApplicationCommand:
				return container.stores.get('commands').runApplicationCommand(reply, interaction);
			case InteractionType.ApplicationCommandAutocomplete:
				// TODO: Implement
				return reply.status(HttpCodes.NotImplemented).send({ message: 'Not implemented' });
			case InteractionType.MessageComponent:
				// TODO: Implement
				return reply.status(HttpCodes.NotImplemented).send({ message: 'Not implemented' });
			default:
				return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown interaction type' });
		}
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
			//
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
	/**
	 * The public key from Discord, available under "General Information" after opening an application from
	 * [Discord's applications](https://discord.com/developers/applications).
	 */
	discordPublicKey: string;
}

export interface ListenOptions {
	/**
	 * The port at which the server will listen for requests.
	 */
	port: number;

	/**
	 * The path the HTTP server will listen to.
	 */
	postPath?: `/${string}`;

	/**
	 * The options to pass to the Fastify constructor.
	 */
	serverOptions?: Parameters<typeof Fastify>[0];
}

interface VerifyDiscordInteractionResponse {
	statusCode: HttpCodes;
	message: string;
}

declare module '@sapphire/pieces' {
	export interface StoreRegistryEntries {
		commands: CommandStore;
	}
}

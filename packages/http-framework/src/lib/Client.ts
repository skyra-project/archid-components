import { container } from '@sapphire/pieces';
import { InteractionResponseType, InteractionType, type APIInteraction } from 'discord-api-types/v9';
import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import { Buffer } from 'node:buffer';
import tweetnacl from 'tweetnacl';
import { HttpCodes } from './api/HttpCodes';
import type { IIdParser } from './components/IIdParser';
import { StringIdParser } from './components/StringIdParser';
import { CommandStore } from './structures/CommandStore';
import { MessageComponentHandlerStore } from './structures/MessageComponentHandlerStore';

export class Client {
	public server!: FastifyInstance;
	#discordPublicKey: Buffer;

	public constructor(options: ClientOptions = {}) {
		const discordPublicKey = options.discordPublicKey ?? process.env.DISCORD_PUBLIC_KEY;
		if (!discordPublicKey) throw new Error('The discordPublicKey cannot be empty');

		this.#discordPublicKey = Buffer.from(discordPublicKey, 'hex');
		container.stores.register(new CommandStore());
		container.stores.register(new MessageComponentHandlerStore());
		container.idParser ??= new StringIdParser();
		container.client = this;
	}

	/**
	 * Loads all the commands.
	 * @param options The load options.
	 */
	public async load(options: LoadOptions = {}) {
		// Register the user directory if not null:
		if (options.baseUserDirectory !== null) {
			container.stores.registerPath(options.baseUserDirectory);
		}

		await container.stores.load();
	}

	/**
	 * Starts the HTTP server, listening for HTTP interactions.
	 * @param options The listen options.
	 */
	public async listen(options: ListenOptions) {
		this.server = Fastify(options.serverOptions);
		this.server.post(options.postPath ?? process.env.HTTP_POST_PATH ?? '/', this.handleHttpMessage.bind(this));

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
				return container.stores.get('commands').runApplicationCommandAutoComplete(reply, interaction);
			case InteractionType.MessageComponent:
				return container.stores.get('message-component-handlers').runHandler(reply, interaction);
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
	 * @default process.env.DISCORD_PUBLIC_KEY
	 */
	discordPublicKey?: string;
}

export interface LoadOptions {
	/**
	 * The base user directory, if set to `null`, the library will not call {@link StoreRegistry.registerPath},
	 * meaning that you will need to manually set each folder for each store. Please read the aforementioned method's
	 * documentation for more information.
	 */
	baseUserDirectory?: string | null;
}

export interface ListenOptions {
	/**
	 * The port at which the server will listen for requests.
	 */
	port: number;

	/**
	 * The path the HTTP server will listen to.
	 * @default process.env.HTTP_POST_PATH ?? '/'
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
		'message-component-handlers': MessageComponentHandlerStore;
	}

	export interface Container {
		client: Client;
		idParser: IIdParser;
	}
}

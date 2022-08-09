import { REST, type RESTOptions } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import { InteractionResponseType, InteractionType, type APIInteraction } from 'discord-api-types/v10';
import Fastify, { type FastifyInstance, type FastifyListenOptions, type FastifyReply, type FastifyRequest } from 'fastify';
import { EventEmitter } from 'node:events';
import { HttpCodes } from './api/HttpCodes';
import type { IIdParser } from './components/IIdParser';
import { StringIdParser } from './components/StringIdParser';
import { CommandStore } from './structures/CommandStore';
import { InteractionHandlerStore } from './structures/InteractionHandlerStore';
import { assignRawData } from './utils/raw';
import { handleSecurityHook, makeKey } from './utils/security';

container.stores.register(new CommandStore());
container.stores.register(new InteractionHandlerStore());

export class Client extends EventEmitter {
	public server!: FastifyInstance;
	#discordPublicKey: string;

	public constructor(options: ClientOptions = {}) {
		super({ captureRejections: true });

		const discordPublicKey = options.discordPublicKey ?? process.env.DISCORD_PUBLIC_KEY;
		if (!discordPublicKey) throw new Error('The discordPublicKey cannot be empty');
		this.#discordPublicKey = discordPublicKey;

		container.rest = new REST(options.restOptions);
		const discordToken = options.discordToken ?? process.env.DISCORD_TOKEN;
		if (discordToken) container.rest.setToken(discordToken);

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
	public async listen({ serverOptions, postPath, port, address, ...listenOptions }: ListenOptions) {
		const key = await makeKey(this.#discordPublicKey);

		this.server = Fastify(serverOptions);
		this.server.addHook('onRoute', (options) => assignRawData(options));
		this.server.addHook('preHandler', (request, reply) => handleSecurityHook(request, reply, key));
		this.server.post(postPath ?? process.env.HTTP_POST_PATH ?? '/', this.handleHttpMessage.bind(this));

		await this.server.listen({ ...listenOptions, port, host: address });
	}

	protected async handleHttpMessage(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
		const interaction = request.body as APIInteraction;
		if (interaction.type === InteractionType.Ping) return reply.send({ type: InteractionResponseType.Pong });

		switch (interaction.type) {
			case InteractionType.ApplicationCommand:
				return container.stores.get('commands').runApplicationCommand(reply, interaction);
			case InteractionType.ApplicationCommandAutocomplete:
				return container.stores.get('commands').runApplicationCommandAutocomplete(reply, interaction);
			case InteractionType.MessageComponent:
			case InteractionType.ModalSubmit:
				return container.stores.get('interaction-handlers').runHandler(reply, interaction);
			default:
				return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown interaction type' });
		}
	}
}

export interface ClientOptions {
	/**
	 * The public key from Discord, available under "General Information" after opening an application from
	 * [Discord's applications](https://discord.com/developers/applications).
	 * @default process.env.DISCORD_PUBLIC_KEY
	 */
	discordPublicKey?: string;

	/**
	 * The Discord token used for authenticating requests outside of interaction responses.
	 * @default process.env.DISCORD_TOKEN
	 */
	discordToken?: string;

	/**
	 * The options to be passed to the underlying REST library.
	 */
	restOptions?: Partial<RESTOptions>;
}

export interface LoadOptions {
	/**
	 * The base user directory, if set to `null`, the library will not call {@link StoreRegistry.registerPath},
	 * meaning that you will need to manually set each folder for each store. Please read the aforementioned method's
	 * documentation for more information.
	 */
	baseUserDirectory?: string | null;
}

export interface ListenOptions extends FastifyListenOptions {
	/**
	 * The port at which the server will listen for requests.
	 */
	port: number;

	/**
	 * The address at which the server will be started.
	 */
	address?: string;

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

export namespace Client {
	export type Options = import('./Client').ClientOptions;
	export type PieceLoadOptions = import('./Client').LoadOptions;
	export type ServerListenOptions = import('./Client').ListenOptions;
}

declare module '@sapphire/pieces' {
	export interface StoreRegistryEntries {
		commands: CommandStore;
		'interaction-handlers': InteractionHandlerStore;
	}

	export interface Container {
		client: Client;
		idParser: IIdParser;
		rest: REST;
	}
}

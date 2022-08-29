import { REST, type RESTOptions } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import { isNullishOrEmpty } from '@sapphire/utilities';
import { InteractionType, type APIInteraction } from 'discord-api-types/v10';
import { EventEmitter } from 'node:events';
import { createServer, type IncomingMessage, type Server, type ServerOptions, type ServerResponse } from 'node:http';
import type { ListenOptions as NetListenOptions } from 'node:net';
import { HttpCodes } from './api/HttpCodes';
import type { IIdParser } from './components/IIdParser';
import { StringIdParser } from './components/StringIdParser';
import { CommandStore } from './structures/CommandStore';
import { InteractionHandlerStore } from './structures/InteractionHandlerStore';
import { ErrorMessages, Payloads } from './utils/constants';
import { makeKey, verifyBody, type Key } from './utils/security';
import { getSafeTextBody } from './utils/streams';

container.stores.register(new CommandStore());
container.stores.register(new InteractionHandlerStore());

export class Client extends EventEmitter {
	public server!: Server;
	public readonly bodySizeLimit: number;
	#discordPublicKey: string;

	public constructor(options: ClientOptions = {}) {
		super({ captureRejections: true });
		this.bodySizeLimit = options.bodySizeLimit ?? 1024 * 1024;

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
		const path = postPath ?? process.env.HTTP_POST_PATH ?? '/';

		this.server = createServer(serverOptions ?? {});
		this.server.on('request', (request, response) => this.handleRawHttpMessage(request, response, path, key));

		return new Promise<void>((resolve) => this.server.listen({ ...listenOptions, port, host: address }, resolve));
	}

	protected async handleRawHttpMessage(request: IncomingMessage, response: ServerResponse, path: string, key: Key) {
		response.setHeader('Content-Type', 'application/json');

		if (request.url !== path) {
			response.statusCode = HttpCodes.NotFound;
			return response.end(ErrorMessages.NotFound);
		}

		if (request.method !== 'POST') {
			response.statusCode = HttpCodes.MethodNotAllowed;
			return response.end(ErrorMessages.UnsupportedHttpMethod);
		}

		const signature = request.headers['x-signature-ed25519'];
		const timestamp = request.headers['x-signature-timestamp'];

		if (isNullishOrEmpty(signature) || isNullishOrEmpty(timestamp)) {
			response.statusCode = HttpCodes.Unauthorized;
			return response.end(ErrorMessages.MissingSignatureInformation);
		}

		const result = await getSafeTextBody(request);
		if (result.isErr()) {
			response.statusCode = HttpCodes.BadRequest;
			return response.end(result.unwrapErr());
		}

		const body = result.unwrap();
		const valid = await verifyBody(body, signature, timestamp, key);
		if (!valid) {
			response.statusCode = HttpCodes.Unauthorized;
			return response.end(ErrorMessages.InvalidSignature);
		}

		return this.handleHttpMessage(JSON.parse(body) as APIInteraction, response);
	}

	protected async handleHttpMessage(interaction: APIInteraction, response: ServerResponse): Promise<ServerResponse> {
		if (interaction.type === InteractionType.Ping) {
			response.statusCode = HttpCodes.OK;
			return response.end(Payloads.Pong);
		}

		switch (interaction.type) {
			case InteractionType.ApplicationCommand:
				return container.stores.get('commands').runApplicationCommand(response, interaction);
			case InteractionType.ApplicationCommandAutocomplete:
				return container.stores.get('commands').runApplicationCommandAutocomplete(response, interaction);
			case InteractionType.MessageComponent:
			case InteractionType.ModalSubmit:
				return container.stores.get('interaction-handlers').runHandler(response, interaction);
			default: {
				response.statusCode = HttpCodes.NotImplemented;
				return response.end(ErrorMessages.UnknownInteractionType);
			}
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

	/**
	 * The body size limit in bytes.
	 * @default `1024 * 1024` (1 MiB)
	 */
	bodySizeLimit?: number;
}

export interface LoadOptions {
	/**
	 * The base user directory, if set to `null`, the library will not call {@link StoreRegistry.registerPath},
	 * meaning that you will need to manually set each folder for each store. Please read the aforementioned method's
	 * documentation for more information.
	 */
	baseUserDirectory?: string | null;
}

export interface ListenOptions extends Omit<NetListenOptions, 'path' | 'readableAll' | 'writableAll'> {
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
	 * The options to pass to the `createServer` function.
	 */
	serverOptions?: ServerOptions;
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

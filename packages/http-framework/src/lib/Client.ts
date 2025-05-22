import { REST, type RESTOptions } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import { isNullishOrEmpty } from '@sapphire/utilities';
import { AsyncEventEmitter } from '@vladfrangu/async_event_emitter';
import { InteractionType, type APIInteraction, type APIPrimaryEntryPointCommandInteraction } from 'discord-api-types/v10';
import { createServer, type IncomingMessage, type Server, type ServerOptions, type ServerResponse } from 'node:http';
import type { ListenOptions as NetListenOptions } from 'node:net';
import type { MappedClientEvents } from './ClientEvents.js';
import { HttpCodes } from './api/HttpCodes.js';
import type { IIdParser } from './components/IIdParser.js';
import { StringIdParser } from './components/StringIdParser.js';
import type { ApplicationCommandRegistry, RequestAuthPrefix } from './interactions/shared/ApplicationCommandRegistry.js';
import { CommandStore } from './structures/CommandStore.js';
import { InteractionHandlerStore } from './structures/InteractionHandlerStore.js';
import { ListenerStore } from './structures/ListenerStore.js';
import { ErrorMessages, Payloads } from './utils/constants.js';
import { makeKey, verifyBody, type Key } from './utils/security.js';
import { getSafeTextBody } from './utils/streams.js';

container.stores.register(new CommandStore());
container.stores.register(new InteractionHandlerStore());
container.stores.register(new ListenerStore());

export class Client extends AsyncEventEmitter<MappedClientEvents> {
	public server!: Server;
	public readonly id: string;
	public readonly bodySizeLimit: number;
	public readonly httpReplyOnError: boolean;
	#discordPublicKey: string;

	public constructor(options: ClientOptions = {}) {
		super();
		this.bodySizeLimit = options.bodySizeLimit ?? 1024 * 1024;
		this.httpReplyOnError = options.httpReplyOnError ?? true;

		const discordPublicKey = options.discordPublicKey ?? process.env.DISCORD_PUBLIC_KEY;
		if (!discordPublicKey) throw new Error('The discordPublicKey cannot be empty');
		this.#discordPublicKey = discordPublicKey;

		container.rest = new REST(options.restOptions);
		const token = options.discordToken ?? process.env.DISCORD_TOKEN;
		if (!token) throw new Error('The discordToken cannot be empty');

		this.id = options.clientId ?? process.env.DISCORD_CLIENT_ID ?? Buffer.from(token.split('.')[0], 'base64').toString();

		container.client = this;
		container.rest.setToken(token);
		container.idParser ??= new StringIdParser();
		container.applicationCommandRegistry.setup({
			clientId: this.id,
			rest: container.rest,
			authPrefix: options.authPrefix
		});
	}

	/**
	 * Gets the application command registry.
	 *
	 * @since 2.0.0
	 * @returns The application command registry.
	 */
	public get registry() {
		return container.applicationCommandRegistry;
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

		return this.handleHttpMessage(JSON.parse(body) as Exclude<APIInteraction, APIPrimaryEntryPointCommandInteraction>, response);
	}

	protected async handleHttpMessage(
		interaction: Exclude<APIInteraction, APIPrimaryEntryPointCommandInteraction>,
		response: ServerResponse
	): Promise<ServerResponse> {
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
	 *
	 * @default process.env.DISCORD_PUBLIC_KEY
	 */
	discordPublicKey?: string;

	/**
	 * The Discord token used for authenticating requests outside of interaction responses.
	 *
	 * @default process.env.DISCORD_TOKEN
	 */
	discordToken?: string;

	/**
	 * The options to be passed to the underlying REST library.
	 */
	restOptions?: Partial<RESTOptions>;

	/**
	 * The body size limit in bytes.
	 * @default 1024 * 1024 // (1 MiB)
	 */
	bodySizeLimit?: number;

	/**
	 * Whether to reply with a 500 status code to Discord if an error occurs while processing an interaction.
	 * @default true
	 */
	httpReplyOnError?: boolean;

	/**
	 * The ID of the client.
	 *
	 * @default process.env.DISCORD_CLIENT_ID ?? Buffer.from(token.split('.')[0], 'base64').toString()
	 */
	clientId?: string;

	/**
	 * The prefix to use for authentication in REST calls.
	 * @default 'Bot'
	 * @since 2.0.0
	 */
	authPrefix?: RequestAuthPrefix;
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
	export type Options = ClientOptions;
	export type PieceLoadOptions = LoadOptions;
	export type ServerListenOptions = ListenOptions;
}

declare module '@sapphire/pieces' {
	export interface StoreRegistryEntries {
		commands: CommandStore;
		'interaction-handlers': InteractionHandlerStore;
		listeners: ListenerStore;
	}

	export interface Container {
		client: Client;
		idParser: IIdParser;
		rest: REST;
		applicationCommandRegistry: ApplicationCommandRegistry;
	}
}

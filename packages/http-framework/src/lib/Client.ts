import { REST, type RESTOptions } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import { isNullishOrEmpty } from '@sapphire/utilities';
import { AsyncEventEmitter } from '@vladfrangu/async_event_emitter';
import { InteractionType, type APIInteraction } from 'discord-api-types/v10';
import {
	H3Event,
	createApp,
	createError,
	createRouter,
	eventHandler,
	getRequestHeader,
	getRequestURL,
	send,
	sendError,
	setResponseHeader,
	setResponseStatus,
	toNodeListener,
	type App,
	type AppOptions,
	type CreateRouterOptions,
	type EventHandlerRequest,
	type EventHandlerResponse,
	type Router
} from 'h3';
import { listen as listhen, type ListenOptions as ListhenOptions, type Listener as Listhener } from 'listhen';
import type { MappedClientEvents } from './ClientEvents.js';
import { HttpCodes } from './api/HttpCodes.js';
import type { IIdParser } from './components/IIdParser.js';
import { StringIdParser } from './components/StringIdParser.js';
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
	public app!: App;
	public router!: Router;
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
	public async listen({ appOptions, postPath, port, address, ...listenOptions }: ListenOptions): Promise<Listhener> {
		const key = await makeKey(this.#discordPublicKey);
		const path = postPath ?? process.env.HTTP_POST_PATH ?? '/';

		this.app = createApp(appOptions);
		this.router = createRouter().post(
			path,
			eventHandler((event) => this.handleRawHttpMessage(event, path, key))
		);
		this.app.use(this.router);

		return listhen(toNodeListener(this.app), {
			qr: false,
			...listenOptions,
			port,
			hostname: address
		});
	}

	protected async handleRawHttpMessage(event: H3Event<EventHandlerRequest>, path: string, key: Key): Promise<void> {
		setResponseHeader(event, 'Content-Type', 'application/json');

		if (getRequestURL(event).pathname !== path) {
			return sendError(
				event,
				createError({
					status: HttpCodes.NotFound,
					message: ErrorMessages.NotFound
				})
			);
		}

		if (event.method !== 'POST') {
			return sendError(
				event,
				createError({
					status: HttpCodes.MethodNotAllowed,
					message: ErrorMessages.UnsupportedHttpMethod
				})
			);
		}

		const signature = getRequestHeader(event, 'x-signature-ed25519');
		const timestamp = getRequestHeader(event, 'x-signature-timestamp');

		if (isNullishOrEmpty(signature) || isNullishOrEmpty(timestamp)) {
			return sendError(
				event,
				createError({
					status: HttpCodes.Unauthorized,
					message: ErrorMessages.MissingSignatureInformation
				})
			);
		}

		const result = await getSafeTextBody(event);
		if (result.isErr()) {
			return sendError(
				event,
				createError({
					status: HttpCodes.BadRequest,
					message: result.unwrapErr()
				})
			);
		}

		const body = result.unwrap();
		const valid = await verifyBody(body, signature, timestamp, key);
		if (!valid) {
			setResponseStatus(event, HttpCodes.Unauthorized);
			return send(event, ErrorMessages.InvalidSignature);
		}

		return this.handleHttpMessage(JSON.parse(body) as APIInteraction, event);
	}

	protected async handleHttpMessage(interaction: APIInteraction, response: H3Event<EventHandlerResponse>): Promise<void> {
		if (interaction.type === InteractionType.Ping) {
			setResponseStatus(response, HttpCodes.OK);
			return send(response, Payloads.Pong);
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
				setResponseStatus(response, HttpCodes.NotImplemented);
				return send(response, ErrorMessages.UnknownInteractionType);
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

	/**
	 * Whether to reply with a 500 status code to Discord if an error occurs while processing an interaction.
	 * @default true
	 */
	httpReplyOnError?: boolean;
}

export interface LoadOptions {
	/**
	 * The base user directory, if set to `null`, the library will not call {@link StoreRegistry.registerPath},
	 * meaning that you will need to manually set each folder for each store. Please read the aforementioned method's
	 * documentation for more information.
	 */
	baseUserDirectory?: string | null;
}

export interface ListenOptions extends Partial<ListhenOptions> {
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
	 * The options to pass to the {@link createApp} function.
	 */
	appOptions?: AppOptions;

	/**
	 * The options to pass to the {@link createRouter} function.
	 */
	routerOptions?: CreateRouterOptions;
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
	}
}

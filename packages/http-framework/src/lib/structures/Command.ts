import { Piece } from '@sapphire/pieces';
import type { Awaitable, NonNullObject } from '@sapphire/utilities';
import type { AutocompleteInteractionArguments, Interactions } from '../interactions/index.js';
import { CommandRouter } from '../interactions/router/CommandRouter.js';

export abstract class Command<Options extends Command.Options = Command.Options> extends Piece<Options, 'commands'> {
	/**
	 * The router for the command.
	 * @since 2.0.0
	 */
	public readonly router: CommandRouter<Options>;

	public constructor(context: Command.LoaderContext, options: Options = {} as Options) {
		super(context, options);
		this.router = new CommandRouter(this);
	}

	/**
	 * Gets the registry for this command.
	 *
	 * @returns The registry for this command, or `null` if it is not registered.
	 */
	public get registry() {
		return this.container.applicationCommandRegistry.get(this.constructor as typeof Command) ?? null;
	}

	/**
	 * Responds to the chat input command for this command
	 *
	 * @param interaction - The interaction to be handled.
	 * @param args - The parsed arguments for this autocomplete interaction.
	 */
	public chatInputRun(interaction: Command.ApplicationCommandInteraction, args: NonNullObject): Awaitable<unknown>;
	public chatInputRun() {
		throw new Error(`The method 'chatInputRun' has not been implemented in ${this.name}.`);
	}

	/**
	 * Responds to an auto completable option for this command
	 *
	 * @param interaction - The interaction to be handled.
	 * @param args - The parsed arguments for this autocomplete interaction.
	 * @returns The response to the autocomplete interaction.
	 */
	public autocompleteRun(interaction: Command.AutocompleteInteraction, args: Command.AutocompleteArguments<any>): Awaitable<unknown>;
	public autocompleteRun() {
		throw new Error(`The method 'autocompleteRun' has not been implemented in ${this.name}.`);
	}
}

export namespace Command {
	export type AutocompleteInteraction = Interactions.Autocomplete;
	export type AutocompleteArguments<T extends object> = AutocompleteInteractionArguments<T>;

	export type ChatInputInteraction = Interactions.ChatInputCommand;
	export type UserInteraction = Interactions.UserContextMenuCommand;
	export type MessageInteraction = Interactions.MessageContextMenuCommand;

	export type ContextMenuInteraction = Interactions.ContextMenuCommand;
	export type ApplicationCommandInteraction = Interactions.ApplicationCommand;

	export type Interaction = ChatInputInteraction | AutocompleteInteraction | UserInteraction | MessageInteraction;
	export type InteractionData = Interaction['data'];

	// Piece re-exports
	/** @deprecated Use {@linkcode LoaderContext} instead. */
	export type Context = LoaderContext;
	export type LoaderContext = Piece.LoaderContext<'commands'>;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
	export type Options = Piece.Options;
}

import { Piece } from '@sapphire/pieces';
import type { Interactions } from '../interactions/index.js';

export abstract class InteractionHandler<Options extends InteractionHandler.Options = InteractionHandler.Options> extends Piece<
	Options,
	'interaction-handlers'
> {
	public constructor(context: InteractionHandler.LoaderContext, options: Options = {} as Options) {
		super(context, options);
	}

	public abstract run(interaction: InteractionHandler.Interaction, customIdValue: unknown): Awaited<unknown>;
}

export namespace InteractionHandler {
	export type ButtonInteraction = Interactions.MessageComponentButton;
	export type SelectMenuInteraction = Interactions.MessageComponentSelectMenu;
	export type ModalInteraction = Interactions.ModalSubmit;
	export type MessageComponentInteraction = Interactions.MessageComponent;

	export type ContextMenuInteraction = Interactions.ContextMenuCommand;
	export type ApplicationCommandInteraction = Interactions.ApplicationCommand;

	export type Interaction = Interactions.MessageComponent;
	export type InteractionData = Interaction['data'];

	// Piece re-exports
	/** @deprecated Use {@linkcode LoaderContext} instead. */
	export type Context = LoaderContext;
	export type LoaderContext = Piece.LoaderContext<'interaction-handlers'>;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
	export type Options = Piece.Options;
}

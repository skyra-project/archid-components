import { Piece } from '@sapphire/pieces';
import type { Interactions } from '../interactions';

export abstract class InteractionHandler extends Piece {
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
	export type Context = Piece.Context;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
	export type Options = Piece.Options;
}

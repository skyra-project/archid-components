import { Piece } from '@sapphire/pieces';
import type { Interactions } from '../interactions';

export abstract class InteractionHandler extends Piece {
	public abstract run(interaction: InteractionHandler.Interaction, customIdValue: unknown): Awaited<unknown>;
}

export namespace InteractionHandler {
	export type ModalInteraction = Interactions.Modal;
	export type MessageComponentInteraction = Interactions.MessageComponent;

	export type ContextMenuInteraction = Interactions.ContextMenu;
	export type ApplicationCommandInteraction = Interactions.ApplicationCommand;

	export type Interaction = MessageComponentInteraction | ModalInteraction;
	export type InteractionData = Interaction['data'];

	// Piece re-exports
	export type Context = Piece.Context;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
	export type Options = Piece.Options;
}

import type { DiscordAPIError, HTTPError, RawFile } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import { Result } from '@sapphire/result';
import {
	InteractionType,
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIContextMenuInteraction,
	type APIInteraction,
	type APIMessageApplicationCommandInteraction,
	type APIMessageComponentInteraction,
	type APIModalSubmitInteraction,
	type APIPingInteraction,
	type APIUserApplicationCommandInteraction
} from 'discord-api-types/v10';
import type { ServerResponse } from 'node:http';
import { HttpCodes } from '../../api/HttpCodes';
import { Interaction, MessageComponentInteraction, type BaseInteractionType, type Interactions } from '../structures/Interaction';

export type NonPingInteraction = Exclude<APIInteraction, APIPingInteraction>;

export function makeInteraction(response: ServerResponse, interaction: APIChatInputApplicationCommandInteraction): Interactions.ChatInput;
export function makeInteraction(response: ServerResponse, interaction: APIApplicationCommandAutocompleteInteraction): Interactions.Autocomplete;
export function makeInteraction(response: ServerResponse, interaction: APIUserApplicationCommandInteraction): Interactions.User;
export function makeInteraction(response: ServerResponse, interaction: APIMessageApplicationCommandInteraction): Interactions.Message;
export function makeInteraction(response: ServerResponse, interaction: APIModalSubmitInteraction): Interactions.Modal;
export function makeInteraction(response: ServerResponse, interaction: APIMessageComponentInteraction): MessageComponentInteraction;
export function makeInteraction(response: ServerResponse, interaction: APIContextMenuInteraction): Interactions.ContextMenu;
export function makeInteraction(response: ServerResponse, interaction: APIApplicationCommandInteraction): Interactions.ApplicationCommand;
export function makeInteraction(
	response: ServerResponse,
	interaction: APIMessageComponentInteraction | APIModalSubmitInteraction
): MessageComponentInteraction | Interactions.Modal;
export function makeInteraction(response: ServerResponse, interaction: BaseInteractionType) {
	if (interaction.type === InteractionType.MessageComponent) return new MessageComponentInteraction(response, interaction);
	return new Interaction(response, interaction);
}

/**
 * Handles a received error. This function must only be called if the HTTP
 * interaction was not replied to.
 *
 * This function has a special case for string errors, which are translated to a
 * regular message with content as the error.
 *
 * When an error is thrown, the error is emitted in client, and a generic error
 * message is sent back to Discord.
 * @param response The HTTP request we can response to.
 * @param error The error to handle.
 * @returns The response object.
 */
export function handleError(response: ServerResponse, error: unknown): ServerResponse {
	container.client.emit('error', error);

	if (response.closed) return response;

	response.statusCode = HttpCodes.InternalServerError;
	return response.end('{"message":"Received an internal error"}');
}

export function resultFromDiscord<T>(promise: Promise<T>): AsyncDiscordResult<T> {
	return Result.fromAsync(promise);
}

export type DiscordResult<T> = Result<T, DiscordError>;
export type AsyncDiscordResult<T> = Promise<DiscordResult<T>>;

export type AddFiles<T> = T & { files?: RawFile[] };

export type AbortError = Error & { name: 'AbortError' };
export type DiscordError = HTTPError | DiscordAPIError | AbortError;

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
import type { FastifyReply } from 'fastify';
import { HttpCodes } from '../../api/HttpCodes';
import { Interaction, MessageComponentInteraction, type BaseInteractionType, type Interactions } from '../structures/Interaction';

export type NonPingInteraction = Exclude<APIInteraction, APIPingInteraction>;

export function makeInteraction(reply: FastifyReply, interaction: APIChatInputApplicationCommandInteraction): Interactions.ChatInput;
export function makeInteraction(reply: FastifyReply, interaction: APIApplicationCommandAutocompleteInteraction): Interactions.Autocomplete;
export function makeInteraction(reply: FastifyReply, interaction: APIUserApplicationCommandInteraction): Interactions.User;
export function makeInteraction(reply: FastifyReply, interaction: APIMessageApplicationCommandInteraction): Interactions.Message;
export function makeInteraction(reply: FastifyReply, interaction: APIModalSubmitInteraction): Interactions.Modal;
export function makeInteraction(reply: FastifyReply, interaction: APIMessageComponentInteraction): MessageComponentInteraction;
export function makeInteraction(reply: FastifyReply, interaction: APIContextMenuInteraction): Interactions.ContextMenu;
export function makeInteraction(reply: FastifyReply, interaction: APIApplicationCommandInteraction): Interactions.ApplicationCommand;
export function makeInteraction(
	reply: FastifyReply,
	interaction: APIMessageComponentInteraction | APIModalSubmitInteraction
): MessageComponentInteraction | Interactions.Modal;
export function makeInteraction(reply: FastifyReply, interaction: BaseInteractionType) {
	if (interaction.type === InteractionType.MessageComponent) return new MessageComponentInteraction(reply, interaction);
	return new Interaction(reply, interaction);
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
 * @param reply The HTTP request we can reply to.
 * @param error The error to handle.
 * @returns The reply object.
 */
export function handleError(reply: FastifyReply, error: unknown): FastifyReply {
	container.client.emit('error', error);

	return reply.sent ? reply : reply.status(HttpCodes.InternalServerError).send({ message: 'Received an internal error' });
}

export function resultFromDiscord<T>(promise: Promise<T>): AsyncDiscordResult<T> {
	return Result.fromAsync(promise);
}

export type DiscordResult<T> = Result<T, DiscordError>;
export type AsyncDiscordResult<T> = Promise<DiscordResult<T>>;

export type AddFiles<T> = T & { files?: RawFile[] };

export type AbortError = Error & { name: 'AbortError' };
export type DiscordError = HTTPError | DiscordAPIError | AbortError;

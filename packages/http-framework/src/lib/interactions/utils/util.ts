import type { DiscordAPIError, HTTPError, RawFile } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import { Result } from '@sapphire/result';
import {
	ApplicationCommandType,
	ComponentType,
	InteractionType,
	type APIChatInputApplicationCommandInteraction,
	type APIInteraction,
	type APIMessageApplicationCommandInteraction,
	type APIMessageComponentButtonInteraction,
	type APIPingInteraction,
	type APIUserApplicationCommandInteraction
} from 'discord-api-types/v10';
import type { ServerResponse } from 'node:http';
import { HttpCodes } from '../../api/HttpCodes.js';
import { ErrorMessages } from '../../utils/constants.js';
import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	MessageComponentButtonInteraction,
	MessageComponentChannelSelectInteraction,
	MessageComponentMentionableSelectInteraction,
	MessageComponentRoleSelectInteraction,
	MessageComponentStringSelectInteraction,
	MessageComponentUserSelectInteraction,
	MessageContextMenuCommandInteraction,
	ModalSubmitInteraction,
	UserContextMenuCommandInteraction,
	type BaseInteractionType
} from '../structures/interactions/index.js';

export type NonPingInteraction = Exclude<APIInteraction, APIPingInteraction>;

export function makeInteraction<T extends BaseInteractionType>(response: ServerResponse, interaction: T): TransformRaw<T>;
export function makeInteraction(response: ServerResponse, interaction: BaseInteractionType) {
	switch (interaction.type) {
		case InteractionType.ApplicationCommand: {
			switch (interaction.data.type) {
				case ApplicationCommandType.ChatInput:
					return new ChatInputCommandInteraction(response, interaction as APIChatInputApplicationCommandInteraction);
				case ApplicationCommandType.User:
					return new UserContextMenuCommandInteraction(response, interaction as APIUserApplicationCommandInteraction);
				case ApplicationCommandType.Message:
					return new MessageContextMenuCommandInteraction(response, interaction as APIMessageApplicationCommandInteraction);
			}
		}
		case InteractionType.MessageComponent:
			switch (interaction.data.component_type) {
				case ComponentType.Button:
					return new MessageComponentButtonInteraction(response, interaction as APIMessageComponentButtonInteraction);
				case ComponentType.ChannelSelect:
					return new MessageComponentChannelSelectInteraction(response, interaction as MessageComponentChannelSelectInteraction.Type);
				case ComponentType.MentionableSelect:
					return new MessageComponentMentionableSelectInteraction(
						response,
						interaction as MessageComponentMentionableSelectInteraction.Type
					);
				case ComponentType.RoleSelect:
					return new MessageComponentRoleSelectInteraction(response, interaction as MessageComponentRoleSelectInteraction.Type);
				case ComponentType.StringSelect:
					return new MessageComponentStringSelectInteraction(response, interaction as MessageComponentStringSelectInteraction.Type);
				case ComponentType.UserSelect:
					return new MessageComponentUserSelectInteraction(response, interaction as MessageComponentUserSelectInteraction.Type);
			}
		case InteractionType.ApplicationCommandAutocomplete:
			return new AutocompleteInteraction(response, interaction);
		case InteractionType.ModalSubmit:
			return new ModalSubmitInteraction(response, interaction);
	}
}

export type TransformRaw<T extends BaseInteractionType> = T extends AutocompleteInteraction.Type
	? AutocompleteInteraction
	: T extends ChatInputCommandInteraction.Type
	? ChatInputCommandInteraction
	: T extends UserContextMenuCommandInteraction.Type
	? UserContextMenuCommandInteraction
	: T extends MessageContextMenuCommandInteraction.Type
	? MessageContextMenuCommandInteraction
	: T extends MessageComponentButtonInteraction.Type
	? MessageComponentButtonInteraction
	: T extends MessageComponentChannelSelectInteraction.Type
	? MessageComponentChannelSelectInteraction
	: T extends MessageComponentMentionableSelectInteraction.Type
	? MessageComponentMentionableSelectInteraction
	: T extends MessageComponentRoleSelectInteraction.Type
	? MessageComponentRoleSelectInteraction
	: T extends MessageComponentStringSelectInteraction.Type
	? MessageComponentStringSelectInteraction
	: T extends MessageComponentUserSelectInteraction.Type
	? MessageComponentUserSelectInteraction
	: T extends ModalSubmitInteraction.Type
	? ModalSubmitInteraction
	: never;

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
	return response.end(ErrorMessages.InternalError);
}

export function resultFromDiscord<T>(promise: Promise<T>): AsyncDiscordResult<T> {
	return Result.fromAsync(promise);
}

export type DiscordResult<T> = Result<T, DiscordError>;
export type AsyncDiscordResult<T> = Promise<DiscordResult<T>>;

export type AddFiles<T> = T & { files?: RawFile[] };

export type AbortError = Error & { name: 'AbortError' };
export type DiscordError = HTTPError | DiscordAPIError | AbortError;

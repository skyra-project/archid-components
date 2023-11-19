import { container } from '@sapphire/pieces';
import { Result } from '@sapphire/result';
import {
	ApplicationCommandType,
	ComponentType,
	InteractionType,
	type APIChatInputApplicationCommandInteraction,
	type APIMessageApplicationCommandInteraction,
	type APIMessageComponentButtonInteraction,
	type APIUserApplicationCommandInteraction
} from 'discord-api-types/v10';
import { createError, sendError, type EventHandlerRequest, type H3Event } from 'h3';
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
import type { AsyncDiscordResult, TransformRaw } from './util-types.js';

export function makeInteraction<T extends BaseInteractionType>(event: H3Event<EventHandlerRequest>, interaction: T): TransformRaw<T>;
export function makeInteraction(event: H3Event<EventHandlerRequest>, interaction: BaseInteractionType) {
	switch (interaction.type) {
		case InteractionType.ApplicationCommand: {
			switch (interaction.data.type) {
				case ApplicationCommandType.ChatInput:
					return new ChatInputCommandInteraction(event, interaction as APIChatInputApplicationCommandInteraction);
				case ApplicationCommandType.User:
					return new UserContextMenuCommandInteraction(event, interaction as APIUserApplicationCommandInteraction);
				case ApplicationCommandType.Message:
					return new MessageContextMenuCommandInteraction(event, interaction as APIMessageApplicationCommandInteraction);
			}
		}
		case InteractionType.MessageComponent:
			switch (interaction.data.component_type) {
				case ComponentType.Button:
					return new MessageComponentButtonInteraction(event, interaction as APIMessageComponentButtonInteraction);
				case ComponentType.ChannelSelect:
					return new MessageComponentChannelSelectInteraction(event, interaction as MessageComponentChannelSelectInteraction.Type);
				case ComponentType.MentionableSelect:
					return new MessageComponentMentionableSelectInteraction(event, interaction as MessageComponentMentionableSelectInteraction.Type);
				case ComponentType.RoleSelect:
					return new MessageComponentRoleSelectInteraction(event, interaction as MessageComponentRoleSelectInteraction.Type);
				case ComponentType.StringSelect:
					return new MessageComponentStringSelectInteraction(event, interaction as MessageComponentStringSelectInteraction.Type);
				case ComponentType.UserSelect:
					return new MessageComponentUserSelectInteraction(event, interaction as MessageComponentUserSelectInteraction.Type);
			}
		case InteractionType.ApplicationCommandAutocomplete:
			return new AutocompleteInteraction(event, interaction);
		case InteractionType.ModalSubmit:
			return new ModalSubmitInteraction(event, interaction);
	}
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
 * @param event The HTTP request we can response to.
 * @param error The error to handle.
 * @returns The response object.
 */
export function handleError(event: H3Event<EventHandlerRequest>, error: unknown): void {
	container.client.emit('error', error);

	if (!container.client.httpReplyOnError || event.node.res.closed) return;

	sendError(
		event,
		createError({
			statusCode: HttpCodes.InternalServerError,
			message: ErrorMessages.InternalError
		})
	);
}

export function resultFromDiscord<T>(promise: Promise<T>): AsyncDiscordResult<T> {
	return Result.fromAsync(promise);
}

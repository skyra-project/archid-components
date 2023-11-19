import type { DiscordAPIError, HTTPError, RawFile } from '@discordjs/rest';
import { Result } from '@sapphire/result';
import type { APIInteraction, APIPingInteraction } from 'discord-api-types/v10';
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

export type DiscordResult<T> = Result<T, DiscordError>;
export type AsyncDiscordResult<T> = Promise<DiscordResult<T>>;

export type AddFiles<T> = T & { files?: RawFile[] };

export type AbortError = Error & { name: 'AbortError' };
export type DiscordError = HTTPError | DiscordAPIError | AbortError;

export type NonPingInteraction = Exclude<APIInteraction, APIPingInteraction>;

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

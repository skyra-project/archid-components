import { container } from '@sapphire/pieces';
import { err, Result } from '@sapphire/result';
import { isNullishOrEmpty, NonNullObject } from '@sapphire/utilities';
import {
	InteractionResponseType,
	Routes,
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandAutocompleteResponse,
	type APIChatInputApplicationCommandInteraction,
	type APIInteraction,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponseDeferredChannelMessageWithSource,
	type APIInteractionResponseDeferredMessageUpdate,
	type APIInteractionResponseUpdateMessage,
	type APIMessageApplicationCommandInteraction,
	type APIMessageComponentInteraction,
	type APIModalInteractionResponse,
	type APIModalSubmitInteraction,
	type APIPingInteraction,
	type APIUserApplicationCommandInteraction,
	type RESTGetAPIChannelResult,
	type RESTGetAPIGuildResult,
	type RESTPostAPIInteractionFollowupJSONBody,
	type RESTPostAPIInteractionFollowupResult
} from 'discord-api-types/v10';
import type { ServerResponse } from 'node:http';
import { HttpCodes } from '../../api/HttpCodes';
import { resultFromDiscord, type AddFiles, type DiscordError } from '../utils/util';
import { Data, Response } from './common/symbols';
import { Message, PartialMessage } from './Message';

export type BaseInteractionType = Exclude<APIInteraction, APIPingInteraction>;

export class Interaction<I extends BaseInteractionType = BaseInteractionType> {
	protected readonly [Data]: I;
	protected readonly [Response]: ServerResponse;

	public constructor(reply: ServerResponse, data: I) {
		this[Data] = data;
		this[Response] = reply;
	}

	public get replied() {
		return this[Response].closed;
	}

	/**
	 * The ID of the interaction.
	 */
	public get id(): I['id'] {
		return this[Data].id;
	}

	/**
	 * The type of the interaction.
	 */
	public get type(): I['type'] {
		return this[Data].type;
	}

	/**
	 * Bitwise set of permissions the app or bot has within the channel the interaction was sent from.
	 */
	public get app_permissions(): I['app_permissions'] {
		return this[Data].app_permissions;
	}

	/**
	 * Bitwise set of permissions the app or bot has within the channel the interaction was sent from.
	 *
	 * @seealso {@link app_permissions} for the raw data.
	 */
	public get applicationPermissions() {
		return typeof this.app_permissions === 'string' ? BigInt(this.app_permissions) : null;
	}

	/**
	 * The ID of the application the interaction is for.
	 */
	public get application_id(): I['application_id'] {
		return this[Data].application_id;
	}

	/**
	 * The ID of the application the interaction is for.
	 *
	 * @seealso {@link application_id} for the raw data.
	 */
	public get applicationId() {
		return this.application_id;
	}

	/**
	 * The channel the interaction was sent from.
	 */
	public get channel_id(): I['channel_id'] {
		return this[Data].channel_id;
	}

	/**
	 * The channel the interaction was sent from.
	 *
	 * @seealso {@link channel_id} for the raw data.
	 */
	public get channelId() {
		return this.channel_id ?? null;
	}

	/**
	 * The command data payload.
	 */
	public get data(): I['data'] {
		return this[Data].data;
	}

	/**
	 * The guild the interaction was sent from.
	 */
	public get guild_id(): I['guild_id'] {
		return this[Data].guild_id;
	}

	/**
	 * The guild the interaction was sent from.
	 *
	 * @seealso {@link guild_id} for the raw data.
	 */
	public get guildId() {
		return this.guild_id ?? null;
	}

	/**
	 * The guild's preferred locale, if invoked in a guild.
	 */
	public get guild_locale(): I['guild_locale'] {
		return this[Data].guild_locale;
	}

	/**
	 * The guild's preferred locale, if invoked in a guild.
	 *
	 * @seealso {@link guild_locale} for the raw data.
	 */
	public get guildLocale() {
		return this.guild_locale ?? null;
	}

	/**
	 * The selected language of the invoking user.
	 */
	public get locale(): I['locale'] {
		return this[Data].locale;
	}

	/**
	 * Guild member data for the invoking user, including permissions.
	 *
	 * **This is only sent when an interaction is invoked in a guild**.
	 */
	public get member() {
		return this[Data].member ?? null;
	}

	/**
	 * A continuation token for responding to the interaction.
	 */
	public get token(): I['token'] {
		return this[Data].token;
	}

	/**
	 * User object for the invoking user.
	 */
	public get user() {
		return (this[Data].member?.user ?? this[Data].user)!;
	}

	/**
	 * Read-only property, always `1`.
	 */
	public get version(): I['version'] {
		return this[Data].version;
	}

	/**
	 * Responds to the interaction with an autocomplete result.
	 * @param data The data to be sent.
	 */
	public sendAutocomplete(data: AutocompleteResponseOptions): Promise<void> {
		const body: AutocompleteResponseData = { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data };
		return this._sendReply(body);
	}

	/**
	 * Responds to the interaction with an empty autocomplete result.
	 */
	public sendEmptyAutocomplete(): Promise<void> {
		return this.sendAutocomplete({ choices: [] });
	}

	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	public async sendMessage(data: MessageResponseOptions): Promise<PartialMessage> {
		const body: MessageResponseData = { type: InteractionResponseType.ChannelMessageWithSource, data };
		await this._sendReply(body);
		return new PartialMessage(this);
	}

	/**
	 * ACK an interaction and edit a response later. The user sees a loading state.
	 * @param data The data to be sent, if any.
	 */
	public async defer(data?: DeferResponseOptions): Promise<PartialMessage> {
		const body: DeferResponseData = { type: InteractionResponseType.DeferredChannelMessageWithSource, data };
		await this._sendReply(body);
		return new PartialMessage(this);
	}

	/**
	 * Responds to the interaction with a popup modal.
	 * @param data The data to be sent.
	 */
	public sendModal(data: ModalResponseOptions): Promise<void> {
		const body: ModalResponseData = { type: InteractionResponseType.Modal, data };
		return this._sendReply(body);
	}

	/**
	 * Sends a follow-up message.
	 * @param data The data to be sent.
	 */
	public async followup({ files, ...body }: FollowupOptions): Promise<Result<Message, DiscordError>> {
		const result = await resultFromDiscord(
			container.rest.patch(Routes.webhook(this.applicationId, this.token), {
				body,
				files,
				auth: false
			}) as Promise<RESTPostAPIInteractionFollowupResult>
		);

		return result.map((message) => new Message(this, message));
	}

	/**
	 * Fetches the channel the interaction was sent from.
	 * @returns The fetched channel.
	 * @remarks **This requires REST to have a token.**
	 */
	public async fetchChannel() {
		if (isNullishOrEmpty(this.channelId)) return err(new Error('The interaction was not sent from a channel'));
		return resultFromDiscord(container.rest.get(Routes.channel(this.channelId)) as Promise<RESTGetAPIChannelResult>);
	}

	/**
	 * Fetches the channel the interaction was sent from.
	 * @returns The fetched channel.
	 * @remarks **This requires REST to have a token.**
	 */
	public async fetchGuild() {
		if (isNullishOrEmpty(this.guildId)) return err(new Error('The interaction was not sent from a channel'));
		return resultFromDiscord(container.rest.get(Routes.guild(this.guildId)) as Promise<RESTGetAPIGuildResult>);
	}

	protected _sendReply(data: NonNullObject) {
		const response = this[Response];
		if (response.closed) throw new Error('Cannot send response, the request has already been replied.');

		response.statusCode = HttpCodes.OK;
		return new Promise<void>((resolve) => response.end(JSON.stringify(data), resolve));
	}
}

export const ChatInputInteraction = Interaction<APIChatInputApplicationCommandInteraction>;
export const AutocompleteInteraction = Interaction<APIApplicationCommandAutocompleteInteraction>;
export const UserInteraction = Interaction<APIUserApplicationCommandInteraction>;
export const MessageInteraction = Interaction<APIMessageApplicationCommandInteraction>;
export const ModalInteraction = Interaction<APIModalSubmitInteraction>;

type AutocompleteResponseData = APIApplicationCommandAutocompleteResponse;
export type AutocompleteResponseOptions = AutocompleteResponseData['data'];
type MessageResponseData = APIInteractionResponseChannelMessageWithSource;
export type MessageResponseOptions = MessageResponseData['data'];
type DeferResponseData = APIInteractionResponseDeferredChannelMessageWithSource;
export type DeferResponseOptions = DeferResponseData['data'];
type ModalResponseData = APIModalInteractionResponse;
export type ModalResponseOptions = ModalResponseData['data'];
export type FollowupOptions = AddFiles<RESTPostAPIInteractionFollowupJSONBody>;

export type BaseMessageComponentInteractionType = APIMessageComponentInteraction;

export class MessageComponentInteraction extends Interaction<BaseMessageComponentInteractionType> {
	/**
	 * The message the interaction was attached to.
	 */
	public get message() {
		return this[Data].message;
	}

	/**
	 * ACK a button interaction and update it to a loading state.
	 */
	public async deferUpdate(): Promise<PartialMessage> {
		const body: DeferUpdateResult = { type: InteractionResponseType.DeferredMessageUpdate };
		await this._sendReply(body);
		return new PartialMessage(this);
	}

	/**
	 * ACK an interaction and edit a response later. The user sees a loading state.
	 * @param data The data to be sent, if any.
	 */
	public async update(data?: UpdateOptions): Promise<PartialMessage> {
		const body: UpdateData = { type: InteractionResponseType.UpdateMessage, data };
		await this._sendReply(body);
		return new PartialMessage(this);
	}
}

type DeferUpdateResult = APIInteractionResponseDeferredMessageUpdate;
type UpdateData = APIInteractionResponseUpdateMessage;
export type UpdateOptions = APIInteractionResponseUpdateMessage['data'];

export namespace Interactions {
	export type ChatInput = Interaction<APIChatInputApplicationCommandInteraction>;
	export type Autocomplete = Interaction<APIApplicationCommandAutocompleteInteraction>;
	export type User = Interaction<APIUserApplicationCommandInteraction>;
	export type Message = Interaction<APIMessageApplicationCommandInteraction>;
	export type Modal = Interaction<APIModalSubmitInteraction>;

	export type MessageComponent = MessageComponentInteraction;

	export type ContextMenu = User | Message;
	export type ApplicationCommand = ChatInput | ContextMenu;
}

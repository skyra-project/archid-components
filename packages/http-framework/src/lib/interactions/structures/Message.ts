import { makeURLSearchParams } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import { isNullishOrEmpty } from '@sapphire/utilities';
import type { APIMessage, RESTDeleteAPIInteractionOriginalResponseResult } from 'discord-api-types/v10';
import {
	Routes,
	type APIChannel,
	type RESTGetAPIInteractionOriginalResponseResult,
	type RESTPatchAPIInteractionOriginalResponseJSONBody,
	type RESTPatchAPIInteractionOriginalResponseResult
} from 'discord-api-types/v10';
import type { AddFiles, AsyncDiscordResult } from '../utils/util-types.js';
import { resultFromDiscord } from '../utils/util.js';
import { Data } from './common/symbols.js';
import type { BaseInteraction } from './interactions/index.js';

export class PartialMessage<I extends BaseInteraction = BaseInteraction> {
	public readonly interaction: I;

	public constructor(interaction: I) {
		this.interaction = interaction;
	}

	/**
	 * The ID of the message.
	 */
	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public get id() {
		return '@original';
	}

	/**
	 * The thread, if the message started one.
	 */
	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public get thread(): APIChannel | undefined {
		return undefined;
	}

	/**
	 * Retrieves the message from Discord, returns a clone of the instance.
	 */
	public async get(): AsyncDiscordResult<Message> {
		const result = await resultFromDiscord(
			container.rest.get(Routes.webhookMessage(this.interaction.applicationId, this.interaction.token, this.id), {
				auth: false,
				query: makeURLSearchParams({ thread_id: this.thread?.id })
			}) as Promise<RESTGetAPIInteractionOriginalResponseResult>
		);
		return result.map((data) => new Message(this.interaction, data));
	}

	/**
	 * Updates the message, returns a clone of the instance.
	 * @param data The data to be sent.
	 */
	public async update({ files, ...body }: UpdateResponseOptions): AsyncDiscordResult<Message> {
		const result = await resultFromDiscord(
			container.rest.patch(Routes.webhookMessage(this.interaction.applicationId, this.interaction.token, this.id), {
				body,
				files,
				auth: false,
				query: makeURLSearchParams({ thread_id: this.thread?.id })
			}) as Promise<RESTPatchAPIInteractionOriginalResponseResult>
		);
		return result.map((data) => new Message(this.interaction, data));
	}

	/**
	 * Deletes the message.
	 */
	public async delete(): AsyncDiscordResult<this> {
		const result = await resultFromDiscord(
			container.rest.delete(Routes.webhookMessage(this.interaction.applicationId, this.interaction.token, this.id), {
				auth: false,
				query: makeURLSearchParams({ thread_id: this.thread?.id })
			}) as Promise<RESTDeleteAPIInteractionOriginalResponseResult>
		);
		return result.map(() => this);
	}
}

export type UpdateResponseResult = RESTPatchAPIInteractionOriginalResponseResult;
export type UpdateResponseOptions = AddFiles<RESTPatchAPIInteractionOriginalResponseJSONBody>;

export class Message<I extends BaseInteraction = BaseInteraction> extends PartialMessage<I> {
	private readonly [Data]: APIMessage;

	public constructor(interaction: I, data: APIMessage) {
		super(interaction);
		this[Data] = data;
	}

	/**
	 * The ID of the message.
	 *
	 * @raw
	 */
	public override get id() {
		return this[Data].id;
	}

	/**
	 * The ID of the channel the message is from.
	 *
	 * @raw
	 * @seealso {@link channelId} for the camelCase property.
	 */
	public get channel_id(): APIMessage['channel_id'] {
		return this[Data].channel_id;
	}

	/**
	 * The ID of the channel the message is from.
	 */
	public get channelId(): APIMessage['channel_id'] {
		return this.channel_id;
	}

	/**
	 * The author of this message (only a valid user in the case where the message is generated by a user or bot user)
	 *
	 * If the message is generated by a webhook, the author object corresponds to the webhook's id,
	 * username, and avatar. You can tell if a message is generated by a webhook by checking for the {@link webhookId} property
	 *
	 * @raw
	 * @seealso {@link https://discord.com/developers/docs/resources/user#user-object}
	 */
	public get author(): APIMessage['author'] {
		return this[Data].author;
	}

	/**
	 * The contents of the message.
	 *
	 * @raw
	 */
	public get content(): APIMessage['content'] {
		return this[Data].content;
	}

	/**
	 * The timestamp the message was sent at.
	 *
	 * @raw
	 * @seealso {@link createdTimestamp} for the parsed timestamp.
	 * @seealso {@link createdAt} for the Date instance created from the parsed timestamp.
	 */
	public get timestamp(): APIMessage['timestamp'] {
		return this[Data].timestamp;
	}

	/**
	 * The timestamp the message was sent at.
	 *
	 * @seealso {@link timestamp} for the raw data.
	 */
	public get createdTimestamp(): number {
		return Date.parse(this.timestamp);
	}

	/**
	 * The {@link Date} version of {@link createdTimestamp}.
	 */
	public get createdAt(): Date {
		return new Date(this.createdTimestamp);
	}

	/**
	 * The timestamp the message was edited at, `null` if it was never edited.
	 *
	 * @raw
	 * @seealso {@link editedTimestamp} for the parsed timestamp.
	 * @seealso {@link editedAt} for the Date instance created from the parsed timestamp.
	 */
	public get edited_timestamp(): APIMessage['edited_timestamp'] {
		return this[Data].edited_timestamp;
	}

	/**
	 * The timestamp the message was edited at, `null` if it was never edited.
	 */
	public get editedTimestamp(): number | null {
		const value = this.edited_timestamp;
		return isNullishOrEmpty(value) ? null : Date.parse(value);
	}

	/**
	 * The {@link Date} version of {@link editedTimestamp}.
	 */
	public get editedAt(): Date | null {
		const value = this.editedTimestamp;
		return isNullishOrEmpty(value) ? null : new Date(value);
	}

	/**
	 * Whether or not the message is a TTS message.
	 *
	 * @raw
	 */
	public get tts(): APIMessage['tts'] {
		return this[Data].tts;
	}

	/**
	 * Whether or not the message mentioned everyone.
	 *
	 * @raw
	 * @seealso {@link mention_everyone} for the camelCase property.
	 */
	public get mention_everyone(): APIMessage['mention_everyone'] {
		return this[Data].mention_everyone;
	}

	/**
	 * Whether or not the message mentioned everyone.
	 *
	 * @seealso {@link mention_everyone} for the raw data.
	 */
	public get mentionEveryone(): APIMessage['mention_everyone'] {
		return this.mention_everyone;
	}

	/**
	 * The users specifically mentioned in the message.
	 *
	 * @raw
	 * @seealso {@link https://discord.com/developers/docs/resources/user#user-object}
	 */
	public get mentions(): APIMessage['mentions'] {
		return this[Data].mentions;
	}

	/**
	 * The roles specifically mentioned in the message.
	 *
	 * @raw
	 * @seealso {@link https://discord.com/developers/docs/topics/permissions#role-object}
	 */
	public get mention_roles(): APIMessage['mention_roles'] {
		return this[Data].mention_roles;
	}

	/**
	 * The roles specifically mentioned in the message.
	 *
	 * @seealso {@link https://discord.com/developers/docs/topics/permissions#role-object}
	 * @seealso {@link mention_roles} for the raw data.
	 */
	public get mentionRoles(): APIMessage['mention_roles'] {
		return this.mention_roles;
	}

	/**
	 * The channels specifically mentioned in this message.
	 *
	 * Not all channel mentions in a message will appear in {@link mentionChannels}:
	 * - Only textual channels that are visible to everyone in a lurkable guild will ever be included.
	 * - Only crossposted messages (via Channel Following) currently include {@link mentionChannels} at all.
	 *
	 * @raw
	 * @seealso {@link mentionChannels} for the camelCase property with an empty array default.
	 * @seealso {@link https://discord.com/developers/docs/resources/channel#channel-mention-object}
	 */
	public get mention_channels(): APIMessage['mention_channels'] {
		return this[Data].mention_channels;
	}

	/**
	 * The channels specifically mentioned in this message.
	 *
	 * Not all channel mentions in a message will appear in {@link mentionChannels}:
	 * - Only textual channels that are visible to everyone in a lurkable guild will ever be included.
	 * - Only crossposted messages (via Channel Following) currently include {@link mentionChannels} at all.
	 *
	 * @seealso {@link https://discord.com/developers/docs/resources/channel#channel-mention-object}
	 */
	public get mentionChannels(): APIMessage['mention_channels'] {
		return this[Data].mention_channels ?? [];
	}

	/**
	 * A nonce that can be used for optimistic message sending (up to 25 characters).
	 *
	 * @raw
	 */
	public get nonce(): APIMessage['nonce'] {
		return this[Data].nonce;
	}

	/**
	 * Whether or not the message is pinned.
	 *
	 * @raw
	 */
	public get pinned(): APIMessage['pinned'] {
		return this[Data].pinned;
	}

	/**
	 * The attached files.
	 *
	 * @seealso {@link https://discord.com/developers/docs/resources/channel#attachment-object}
	 */
	public get attachments(): APIMessage['attachments'] {
		return this[Data].attachments;
	}

	/**
	 * The embedded content.
	 *
	 * @seealso {@link https://discord.com/developers/docs/resources/channel#embed-object}
	 */
	public get embeds(): APIMessage['embeds'] {
		return this[Data].embeds;
	}

	/**
	 * The reactions the message has.
	 *
	 * @seealso {@link https://discord.com/developers/docs/resources/channel#reaction-object}
	 */
	public get reactions(): APIMessage['reactions'] {
		return this[Data].reactions ?? [];
	}

	/**
	 * The webhook ID.
	 */
	public get webhook_id(): APIMessage['webhook_id'] {
		return this[Data].webhook_id;
	}

	/**
	 * The webhook ID.
	 *
	 * @seealso {@link webhook_id} for the raw data.
	 */
	public get webhookId() {
		return this.webhook_id ?? null;
	}

	/**
	 * The message's type.
	 *
	 * @seealso {@link https://discord.com/developers/docs/resources/channel#message-object-message-types}
	 */
	public get type() {
		return this[Data].type;
	}

	/**
	 * The thread, if the message started one.
	 */
	public override get thread() {
		return this[Data].thread;
	}

	/**
	 * The message flags combined as a bitfield.
	 *
	 * @seealso {@link https://discord.com/developers/docs/resources/channel#message-object-message-flags}
	 * @seealso {@link https://en.wikipedia.org/wiki/Bit_field}
	 */
	public get flags() {
		return this[Data].flags;
	}

	/**
	 * The message's components, such as buttons, action rows, or other interactive components.
	 */
	public get components() {
		return this[Data].components ?? [];
	}

	/**
	 * The stickers the message contains, if any.
	 */
	public get sticker_items() {
		return this[Data].sticker_items;
	}

	/**
	 * The stickers the message contains, if any.
	 *
	 * @seealso {@link sticker_items} for the raw data.
	 */
	public get stickerItems() {
		return this.sticker_items ?? [];
	}
}

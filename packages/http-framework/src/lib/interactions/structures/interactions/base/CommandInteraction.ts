import { container } from '@sapphire/pieces';
import {
	InteractionResponseType,
	Routes,
	type APIChatInputApplicationCommandInteraction,
	type APIMessageApplicationCommandInteraction,
	type APIUserApplicationCommandInteraction,
	type RESTPostAPIInteractionFollowupResult
} from 'discord-api-types/v10';
import type { AsyncDiscordResult } from '../../../utils/util-types.js';
import { resultFromDiscord } from '../../../utils/util.js';
import { Message, PartialMessage } from '../../Message.js';
import { BaseInteraction } from './BaseInteraction.js';
import type {
	DeferResponseData,
	DeferResponseOptions,
	FollowupOptions,
	MessageResponseData,
	MessageResponseOptions,
	ModalResponseData,
	ModalResponseOptions
} from './common.js';

export type BaseCommandInteractionType =
	| APIChatInputApplicationCommandInteraction
	| APIUserApplicationCommandInteraction
	| APIMessageApplicationCommandInteraction;

export class CommandInteraction<T extends BaseCommandInteractionType> extends BaseInteraction<T> {
	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	public async reply(data: MessageResponseOptions): Promise<PartialMessage<this>> {
		const body: MessageResponseData = { type: InteractionResponseType.ChannelMessageWithSource, data };
		await this._sendReply(body);
		return new PartialMessage(this);
	}

	/**
	 * ACK an interaction and edit a response later. The user sees a loading state.
	 * @param data The data to be sent, if any.
	 */
	public async defer(data?: DeferResponseOptions): Promise<PartialMessage<this>> {
		const body: DeferResponseData = { type: InteractionResponseType.DeferredChannelMessageWithSource, data };
		await this._sendReply(body);
		return new PartialMessage(this);
	}

	/**
	 * Responds to the interaction with a popup modal.
	 * @param data The data to be sent.
	 */
	public showModal(data: ModalResponseOptions): Promise<void> {
		const body: ModalResponseData = { type: InteractionResponseType.Modal, data };
		return this._sendReply(body);
	}

	/**
	 * Sends a follow-up message.
	 * @param data The data to be sent.
	 */
	public async followup({ files, ...body }: FollowupOptions): AsyncDiscordResult<Message<this>> {
		const result = await resultFromDiscord(
			container.rest.post(Routes.webhook(this.applicationId, this.token), {
				body,
				files,
				auth: false
			}) as Promise<RESTPostAPIInteractionFollowupResult>
		);

		return result.map((message) => new Message(this, message));
	}
}

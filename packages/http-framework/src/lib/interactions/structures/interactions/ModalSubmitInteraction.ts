import { container } from '@sapphire/pieces';
import { InteractionResponseType, Routes, type APIModalSubmitInteraction, type RESTPostAPIInteractionFollowupResult } from 'discord-api-types/v10';
import { resultFromDiscord, type AsyncDiscordResult } from '../../utils/util';
import { Data } from '../common/symbols';
import { Message, PartialMessage } from '../Message';
import { BaseInteraction } from './base/BaseInteraction';
import type {
	DeferResponseData,
	DeferResponseOptions,
	DeferUpdateResult,
	FollowupOptions,
	MessageResponseData,
	MessageResponseOptions,
	UpdateData,
	UpdateOptions
} from './base/common';

export class ModalSubmitInteraction extends BaseInteraction<ModalSubmitInteraction.Type> {
	/**
	 * The message the interaction was attached to, if any.
	 */
	public get message() {
		return this[Data].message;
	}

	/**
	 * ACK a button interaction and update it to a loading state.
	 */
	public async deferUpdate(): Promise<PartialMessage<this>> {
		const body: DeferUpdateResult = { type: InteractionResponseType.DeferredMessageUpdate };
		await this._sendReply(body);
		return new PartialMessage(this);
	}

	/**
	 * ACK an interaction and edit a response later. The user sees a loading state.
	 * @param data The data to be sent, if any.
	 */
	public async update(data?: UpdateOptions): Promise<PartialMessage<this>> {
		const body: UpdateData = { type: InteractionResponseType.UpdateMessage, data };
		await this._sendReply(body);
		return new PartialMessage(this);
	}

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

export namespace ModalSubmitInteraction {
	export type Type = APIModalSubmitInteraction;
}

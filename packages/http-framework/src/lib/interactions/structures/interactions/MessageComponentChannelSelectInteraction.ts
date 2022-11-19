import { Collection } from '@discordjs/collection';
import type { APIBaseInteraction, APIMessageChannelSelectInteractionData, InteractionType, Snowflake } from 'discord-api-types/v10';
import type { TransformedArguments } from '../../resolvers/InteractionOptions';
import { MessageComponentInteraction } from './base/MessageComponentInteraction';

export class MessageComponentChannelSelectInteraction extends MessageComponentInteraction<MessageComponentChannelSelectInteraction.Type> {
	/**
	 * Gets the IDs of the selected channels.
	 */
	public get ids(): Snowflake[] {
		return this.data.values;
	}

	/**
	 * Creates a collection with all the selected channels.
	 *
	 * @seealso {@link MessageComponentChannelSelectInteraction.keys}.
	 * @seealso {@link MessageComponentChannelSelectInteraction.values}.
	 * @seealso {@link MessageComponentChannelSelectInteraction.entries}.
	 */
	public get channels(): Collection<Snowflake, MessageComponentChannelSelectInteraction.Value> {
		return new Collection(this.entries());
	}

	/**
	 * Returns an iterator of the selected channel IDs.
	 *
	 * @seealso {@link MessageComponentChannelSelectInteraction.ids}.
	 */
	public *keys(): IterableIterator<Snowflake> {
		yield* this.ids;
	}

	/**
	 * Returns an iterator of the selected channels.
	 *
	 * @seealso {@link MessageComponentChannelSelectInteraction.channels}.
	 * @seealso {@link MessageComponentChannelSelectInteraction.keys}.
	 * @seealso {@link MessageComponentChannelSelectInteraction.entries}.
	 */
	public *values(): IterableIterator<MessageComponentChannelSelectInteraction.Value> {
		const { resolved } = this.data;
		for (const id of this.ids) {
			yield resolved.channels[id];
		}
	}

	/**
	 * Returns an iterator of [ID, Channel] pairs.
	 *
	 * @seealso {@link MessageComponentChannelSelectInteraction.channels}.
	 * @seealso {@link MessageComponentChannelSelectInteraction.keys}.
	 * @seealso {@link MessageComponentChannelSelectInteraction.values}.
	 */
	public *entries(): IterableIterator<[Snowflake, MessageComponentChannelSelectInteraction.Value]> {
		for (const value of this.values()) {
			yield [value.id, value];
		}
	}
}

export namespace MessageComponentChannelSelectInteraction {
	type Base = APIBaseInteraction<InteractionType.MessageComponent, APIMessageChannelSelectInteractionData>;
	export type Type = Base & Required<Pick<Base, 'channel_id' | 'data' | 'message'>>;
	export type Value = TransformedArguments.Channel;
}

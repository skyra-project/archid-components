import { Collection } from '@discordjs/collection';
import type { APIBaseInteraction, APIMessageUserSelectInteractionData, InteractionType, Snowflake } from 'discord-api-types/v10';
import type { TransformedArguments } from '../../resolvers/InteractionOptions';
import { MessageComponentInteraction } from './base/MessageComponentInteraction';

export class MessageComponentUserSelectInteraction extends MessageComponentInteraction<MessageComponentUserSelectInteraction.Type> {
	/**
	 * Gets the IDs of the selected users.
	 */
	public get ids(): Snowflake[] {
		return this.data.values;
	}

	/**
	 * Creates a collection with all the selected users.
	 *
	 * @seealso {@link MessageComponentChannelSelectInteraction.keys}.
	 * @seealso {@link MessageComponentChannelSelectInteraction.values}.
	 * @seealso {@link MessageComponentChannelSelectInteraction.entries}.
	 */
	public get users(): Collection<Snowflake, MessageComponentUserSelectInteraction.Value> {
		return new Collection(this.entries());
	}

	/**
	 * Returns an iterator of the selected user IDs.
	 *
	 * @seealso {@link MessageComponentUserSelectInteraction.ids}.
	 */
	public *keys(): IterableIterator<Snowflake> {
		yield* this.ids;
	}

	/**
	 * Returns an iterator of the selected users.
	 *
	 * @seealso {@link MessageComponentUserSelectInteraction.users}.
	 * @seealso {@link MessageComponentUserSelectInteraction.keys}.
	 * @seealso {@link MessageComponentUserSelectInteraction.entries}.
	 */
	public *values(): IterableIterator<MessageComponentUserSelectInteraction.Value> {
		const { resolved } = this.data;
		for (const id of this.ids) {
			yield { user: resolved.users[id], member: resolved.members?.[id] ?? null };
		}
	}

	/**
	 * Returns an iterator of [ID, User] pairs.
	 *
	 * @seealso {@link MessageComponentUserSelectInteraction.channels}.
	 * @seealso {@link MessageComponentUserSelectInteraction.keys}.
	 * @seealso {@link MessageComponentUserSelectInteraction.values}.
	 */
	public *entries(): IterableIterator<[Snowflake, MessageComponentUserSelectInteraction.Value]> {
		for (const value of this.values()) {
			yield [value.user.id, value];
		}
	}
}

export namespace MessageComponentUserSelectInteraction {
	type Base = APIBaseInteraction<InteractionType.MessageComponent, APIMessageUserSelectInteractionData>;
	export type Type = Base & Required<Pick<Base, 'channel' | 'channel_id' | 'data' | 'app_permissions' | 'message'>>;
	export type Value = TransformedArguments.User;
}

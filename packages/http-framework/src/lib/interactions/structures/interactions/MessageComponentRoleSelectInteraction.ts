import { Collection } from '@discordjs/collection';
import type { APIBaseInteraction, APIMessageRoleSelectInteractionData, InteractionType, Snowflake } from 'discord-api-types/v10';
import type { TransformedArguments } from '../../resolvers/InteractionOptions';
import { MessageComponentInteraction } from './base/MessageComponentInteraction';

export class MessageComponentRoleSelectInteraction extends MessageComponentInteraction<MessageComponentRoleSelectInteraction.Type> {
	/**
	 * Gets the IDs of the selected roles.
	 */
	public get ids(): Snowflake[] {
		return this.data.values;
	}

	/**
	 * Creates a collection with all the selected roles.
	 *
	 * @seealso {@link MessageComponentRoleSelectInteraction.keys}.
	 * @seealso {@link MessageComponentRoleSelectInteraction.values}.
	 * @seealso {@link MessageComponentRoleSelectInteraction.entries}.
	 */
	public get roles(): Collection<Snowflake, MessageComponentRoleSelectInteraction.Value> {
		return new Collection(this.entries());
	}

	/**
	 * Returns an iterator of the selected role IDs.
	 *
	 * @seealso {@link MessageComponentRoleSelectInteraction.ids}.
	 */
	public *keys(): IterableIterator<Snowflake> {
		yield* this.ids;
	}

	/**
	 * Returns an iterator of the selected channels.
	 *
	 * @seealso {@link MessageComponentRoleSelectInteraction.roles}.
	 * @seealso {@link MessageComponentRoleSelectInteraction.keys}.
	 * @seealso {@link MessageComponentRoleSelectInteraction.entries}.
	 */
	public *values(): IterableIterator<MessageComponentRoleSelectInteraction.Value> {
		const { resolved } = this.data;
		for (const id of this.ids) {
			yield resolved.roles[id];
		}
	}

	/**
	 * Returns an iterator of [ID, Role] pairs.
	 *
	 * @seealso {@link MessageComponentRoleSelectInteraction.roles}.
	 * @seealso {@link MessageComponentRoleSelectInteraction.keys}.
	 * @seealso {@link MessageComponentRoleSelectInteraction.values}.
	 */
	public *entries(): IterableIterator<[Snowflake, MessageComponentRoleSelectInteraction.Value]> {
		for (const value of this.values()) {
			yield [value.id, value];
		}
	}
}

export namespace MessageComponentRoleSelectInteraction {
	type Base = APIBaseInteraction<InteractionType.MessageComponent, APIMessageRoleSelectInteractionData>;
	export type Type = Base & Required<Pick<Base, 'channel' | 'channel_id' | 'data' | 'app_permissions' | 'message'>>;
	export type Value = TransformedArguments.Role;
}

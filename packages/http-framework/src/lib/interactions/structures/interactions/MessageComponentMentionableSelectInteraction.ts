import { Collection } from '@discordjs/collection';
import type { APIBaseInteraction, APIMessageMentionableSelectInteractionData, APIRole, InteractionType, Snowflake } from 'discord-api-types/v10';
import type { TransformedArguments } from '../../resolvers/InteractionOptions.js';
import { MessageComponentInteraction } from './base/MessageComponentInteraction.js';

export class MessageComponentMentionableSelectInteraction extends MessageComponentInteraction<MessageComponentMentionableSelectInteraction.Type> {
	/**
	 * Gets the IDs of the selected users and roles.
	 */
	public get ids(): Snowflake[] {
		return this.data.values;
	}

	/**
	 * Creates a collection with all the selected users.
	 *
	 * @seealso {@link MessageComponentMentionableSelectInteraction.keys}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.values}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.entries}.
	 */
	public get users(): Collection<Snowflake, MessageComponentMentionableSelectInteraction.ValueUser> {
		const output = new Collection<Snowflake, MessageComponentMentionableSelectInteraction.ValueUser>();
		const { users, members } = this.data.resolved;
		if (users) {
			for (const user of Object.values(users)) {
				output.set(user.id, { id: user.id, user, member: members?.[user.id] ?? null });
			}
		}

		return output;
	}

	/**
	 * Creates a collection with all the selected roles.
	 *
	 * @note The collection will always be empty if the interaction came from direct messages.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.keys}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.values}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.entries}.
	 */
	public get roles(): Collection<Snowflake, APIRole> {
		const output = new Collection<Snowflake, APIRole>();
		const { roles } = this.data.resolved;
		if (roles) {
			for (const role of Object.values(roles)) {
				output.set(role.id, role);
			}
		}

		return output;
	}

	/**
	 * Creates a collection with all the selected users, members, and roles.
	 *
	 * @note The collection will always be empty if the interaction came from direct messages.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.keys}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.values}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.entries}.
	 */
	public get mentionables(): Collection<Snowflake, MessageComponentMentionableSelectInteraction.Value> {
		return new Collection(this.entries());
	}

	/**
	 * Returns an iterator of the selected users and roles IDs.
	 *
	 * @seealso {@link MessageComponentMentionableSelectInteraction.ids}.
	 */
	public *keys(): IterableIterator<Snowflake> {
		yield* this.ids;
	}

	/**
	 * Returns an iterator of the selected users, members, and roles.
	 *
	 * @seealso {@link MessageComponentMentionableSelectInteraction.users}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.roles}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.keys}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.entries}.
	 */
	public *values(): IterableIterator<MessageComponentMentionableSelectInteraction.Value> {
		const { resolved } = this.data;
		for (const id of this.ids) {
			const user = resolved.users?.[id];
			if (user) {
				yield { id, user, member: resolved.members?.[id] ?? null };
				continue;
			}

			const role = resolved.roles?.[id];
			if (role) {
				yield { id, role };
				continue;
			}

			yield { id };
		}
	}

	/**
	 * Returns an iterator of [ID, Mentionable] pairs.
	 *
	 * @seealso {@link MessageComponentMentionableSelectInteraction.users}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.roles}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.keys}.
	 * @seealso {@link MessageComponentMentionableSelectInteraction.values}.
	 */
	public *entries(): IterableIterator<[Snowflake, MessageComponentMentionableSelectInteraction.Value]> {
		for (const value of this.values()) {
			yield [value.id, value];
		}
	}
}

export namespace MessageComponentMentionableSelectInteraction {
	type Base = APIBaseInteraction<InteractionType.MessageComponent, APIMessageMentionableSelectInteractionData>;
	export type Type = Base & Required<Pick<Base, 'channel' | 'channel_id' | 'data' | 'app_permissions' | 'message'>>;
	export type Value = ValueUser | { id: string; role: TransformedArguments.Role } | { id: string };

	export type ValueUser = { id: string } & TransformedArguments.User;
}

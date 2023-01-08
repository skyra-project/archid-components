import type { APIBaseInteraction, APIMessageStringSelectInteractionData, InteractionType } from 'discord-api-types/v10';
import { MessageComponentInteraction } from './base/MessageComponentInteraction';

export class MessageComponentStringSelectInteraction extends MessageComponentInteraction<MessageComponentStringSelectInteraction.Type> {
	public get values(): string[] {
		return this.data.values ?? [];
	}
}

export namespace MessageComponentStringSelectInteraction {
	type Base = APIBaseInteraction<InteractionType.MessageComponent, APIMessageStringSelectInteractionData>;
	export type Type = Base & Required<Pick<Base, 'channel_id' | 'data' | 'message' | 'app_permissions'>>;
}

export {
	/** @deprecated Use {@link MessageComponentStringSelectInteraction} instead. */
	MessageComponentStringSelectInteraction as MessageComponentSelectMenuInteraction
};

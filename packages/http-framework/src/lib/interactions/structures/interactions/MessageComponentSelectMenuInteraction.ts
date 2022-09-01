import type { APIMessageComponentSelectMenuInteraction } from 'discord-api-types/v10';
import { MessageComponentInteraction } from './base/MessageComponentInteraction';

export class MessageComponentSelectMenuInteraction extends MessageComponentInteraction<MessageComponentSelectMenuInteraction.Type> {
	public get values(): string[] {
		return this.data.values ?? [];
	}
}

export namespace MessageComponentSelectMenuInteraction {
	export type Type = APIMessageComponentSelectMenuInteraction;
}

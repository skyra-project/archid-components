import type { APIMessageApplicationCommandInteraction } from 'discord-api-types/v10';
import { CommandInteraction } from './base/CommandInteraction';

export class MessageContextMenuCommandInteraction extends CommandInteraction<MessageContextMenuCommandInteraction.Type> {}

export namespace MessageContextMenuCommandInteraction {
	export type Type = APIMessageApplicationCommandInteraction;
}

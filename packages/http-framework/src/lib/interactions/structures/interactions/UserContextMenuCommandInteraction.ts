import type { APIUserApplicationCommandInteraction } from 'discord-api-types/v10';
import { CommandInteraction } from './base/CommandInteraction';

export class UserContextMenuCommandInteraction extends CommandInteraction<UserContextMenuCommandInteraction.Type> {}

export namespace UserContextMenuCommandInteraction {
	export type Type = APIUserApplicationCommandInteraction;
}

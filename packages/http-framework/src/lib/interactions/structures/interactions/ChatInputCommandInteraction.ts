import type { APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';
import { CommandInteraction } from './base/CommandInteraction';

export class ChatInputCommandInteraction extends CommandInteraction<ChatInputCommandInteraction.Type> {}

export namespace ChatInputCommandInteraction {
	export type Type = APIChatInputApplicationCommandInteraction;
}

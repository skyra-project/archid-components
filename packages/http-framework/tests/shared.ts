import {
	ApplicationCommandType,
	ComponentType,
	InteractionType,
	MessageType,
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionGuildMember,
	type APIMessage,
	type APIMessageApplicationCommandInteraction,
	type APIMessageComponentButtonInteraction,
	type APIModalSubmitInteraction,
	type APIUser,
	type APIUserApplicationCommandInteraction,
	type LocaleString,
	type Permissions
} from 'discord-api-types/v10';
import type { ServerResponse } from 'node:http';
import { Writable } from 'node:stream';
import type {
	MessageComponentChannelSelectInteraction,
	MessageComponentMentionableSelectInteraction,
	MessageComponentRoleSelectInteraction,
	MessageComponentStringSelectInteraction,
	MessageComponentUserSelectInteraction
} from '../src';

export const UserData: Readonly<APIUser> = {
	id: '266624760782258186',
	avatar: 'ff8999f720494835d6fe6c0172bd1791',
	username: 'Skyra',
	discriminator: '7023',
	public_flags: 65536,
	bot: true,
	verified: true
};

export const InteractionGuildMemberData: Readonly<APIInteractionGuildMember> = {
	user: UserData,
	deaf: false,
	mute: false,
	permissions: '1090921168887',
	roles: [],
	joined_at: '2019-02-03T21:57:10.354Z'
};

export const MessageData: Readonly<APIMessage> = {
	id: '1013917972986867862',
	channel_id: '737142071319855105',
	author: UserData,
	content: 'Foo Bar',
	attachments: [],
	embeds: [],
	edited_timestamp: null,
	mention_everyone: true,
	mention_roles: [],
	mentions: [],
	pinned: false,
	timestamp: '2022-08-29T21:08:02.445Z',
	tts: false,
	type: MessageType.Default
};

export const PermissionsData: Permissions = '8';
export const LocaleData: LocaleString = 'en-US';

export const BaseInteractionData = {
	id: '254360814063058944',
	application_id: '737141877803057244',
	member: InteractionGuildMemberData,
	token: 'my-very-nice-token',
	version: 1,
	app_permissions: PermissionsData,
	locale: LocaleData,
	guild_locale: LocaleData,
	guild_id: '737141877803057244'
} as const;

export const ApplicationCommandAutocompleteInteractionData: APIApplicationCommandAutocompleteInteraction = {
	...BaseInteractionData,
	type: InteractionType.ApplicationCommandAutocomplete,
	data: { id: '0', name: 'foo', type: ApplicationCommandType.ChatInput, options: [] }
};

export const ChatInputApplicationCommandInteractionData: APIChatInputApplicationCommandInteraction = {
	...BaseInteractionData,
	type: InteractionType.ApplicationCommand,
	data: { id: '0', name: 'foo', type: ApplicationCommandType.ChatInput, options: [] },
	channel_id: '737142209639350343'
};

export const MessageApplicationCommandInteractionData: APIMessageApplicationCommandInteraction = {
	...BaseInteractionData,
	type: InteractionType.ApplicationCommand,
	data: {
		id: '0',
		name: 'foo',
		type: ApplicationCommandType.Message,
		target_id: MessageData.id,
		resolved: { messages: { [MessageData.id]: MessageData } }
	},
	channel_id: MessageData.channel_id
};

export const UserApplicationCommandInteractionData: APIUserApplicationCommandInteraction = {
	...BaseInteractionData,
	type: InteractionType.ApplicationCommand,
	data: { id: '0', name: 'foo', type: ApplicationCommandType.User, target_id: UserData.id, resolved: { users: { [UserData.id]: UserData } } },
	channel_id: MessageData.channel_id,
	message: MessageData
};

export const MessageComponentButtonInteractionData: APIMessageComponentButtonInteraction = {
	...BaseInteractionData,
	type: InteractionType.MessageComponent,
	data: { component_type: ComponentType.Button, custom_id: 'button:foo:bar' },
	channel_id: MessageData.channel_id,
	message: MessageData
};

export const MessageComponentChannelSelectInteractionData: MessageComponentChannelSelectInteraction.Type = {
	...BaseInteractionData,
	type: InteractionType.MessageComponent,
	data: { component_type: ComponentType.ChannelSelect, custom_id: 'select:channel:foo', values: [], resolved: { channels: {} } },
	channel_id: MessageData.channel_id,
	message: MessageData
};

export const MessageComponentMentionableSelectInteractionData: MessageComponentMentionableSelectInteraction.Type = {
	...BaseInteractionData,
	type: InteractionType.MessageComponent,
	data: {
		component_type: ComponentType.MentionableSelect,
		custom_id: 'select:mentionable:foo',
		values: [],
		resolved: { users: {}, members: {}, roles: {} }
	},
	channel_id: MessageData.channel_id,
	message: MessageData
};

export const MessageComponentRoleSelectInteractionData: MessageComponentRoleSelectInteraction.Type = {
	...BaseInteractionData,
	type: InteractionType.MessageComponent,
	data: { component_type: ComponentType.RoleSelect, custom_id: 'select:role:foo', values: [], resolved: { roles: {} } },
	channel_id: MessageData.channel_id,
	message: MessageData
};

export const MessageComponentStringSelectInteractionData: MessageComponentStringSelectInteraction.Type = {
	...BaseInteractionData,
	type: InteractionType.MessageComponent,
	data: { component_type: ComponentType.StringSelect, custom_id: 'select:string:foo', values: [] },
	channel_id: MessageData.channel_id,
	message: MessageData
};

export const MessageComponentUserSelectInteractionData: MessageComponentUserSelectInteraction.Type = {
	...BaseInteractionData,
	type: InteractionType.MessageComponent,
	data: { component_type: ComponentType.UserSelect, custom_id: 'select:user:foo', values: [], resolved: { users: {} } },
	channel_id: MessageData.channel_id,
	message: MessageData
};

export const ModalSubmitInteractionData: APIModalSubmitInteraction = {
	...BaseInteractionData,
	type: InteractionType.ModalSubmit,
	data: { custom_id: 'modal:foo:bar', components: [] },
	channel_id: MessageData.channel_id,
	message: MessageData
};

export function makeResponse() {
	const response = new Writable();
	response._write = (_chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null) => void) => callback();
	return response as ServerResponse;
}

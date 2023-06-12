import type { AutocompleteInteraction } from './AutocompleteInteraction.js';
import type { ChatInputCommandInteraction } from './ChatInputCommandInteraction.js';
import type { MessageComponentButtonInteraction } from './MessageComponentButtonInteraction.js';
import type { MessageComponentChannelSelectInteraction } from './MessageComponentChannelSelectInteraction.js';
import type { MessageComponentMentionableSelectInteraction } from './MessageComponentMentionableSelectInteraction.js';
import type { MessageComponentRoleSelectInteraction } from './MessageComponentRoleSelectInteraction.js';
import type { MessageComponentStringSelectInteraction } from './MessageComponentStringSelectInteraction.js';
import type { MessageComponentUserSelectInteraction } from './MessageComponentUserSelectInteraction.js';
import type { MessageContextMenuCommandInteraction } from './MessageContextMenuCommandInteraction.js';
import type { ModalSubmitInteraction } from './ModalSubmitInteraction.js';
import type { UserContextMenuCommandInteraction } from './UserContextMenuCommandInteraction.js';

export namespace Interactions {
	export type Autocomplete = AutocompleteInteraction;

	export type ChatInputCommand = ChatInputCommandInteraction;
	export type MessageContextMenuCommand = MessageContextMenuCommandInteraction;
	export type UserContextMenuCommand = UserContextMenuCommandInteraction;

	export type MessageComponentButton = MessageComponentButtonInteraction;
	export type MessageComponentChannelSelect = MessageComponentChannelSelectInteraction;
	export type MessageComponentMentionableSelect = MessageComponentMentionableSelectInteraction;
	export type MessageComponentRoleSelect = MessageComponentRoleSelectInteraction;
	export type MessageComponentStringSelect = MessageComponentStringSelectInteraction;
	export type MessageComponentUserSelect = MessageComponentUserSelectInteraction;
	export type MessageComponentSelectMenu =
		| MessageComponentChannelSelect
		| MessageComponentMentionableSelect
		| MessageComponentRoleSelect
		| MessageComponentStringSelect
		| MessageComponentUserSelect;
	export type ModalSubmit = ModalSubmitInteraction;

	export type MessageComponent = MessageComponentButton | MessageComponentSelectMenu | ModalSubmit;
	export type ContextMenuCommand = MessageContextMenuCommand | UserContextMenuCommand;
	export type ApplicationCommand = ChatInputCommand | ContextMenuCommand;

	export type Any =
		| Autocomplete
		| ChatInputCommand
		| MessageContextMenuCommand
		| UserContextMenuCommand
		| MessageComponentButton
		| MessageComponentSelectMenu
		| ModalSubmit;
}

export type Interaction = Interactions.Any;

export * from './AutocompleteInteraction.js';
export * from './base/BaseInteraction.js';
export * from './base/CommandInteraction.js';
export * from './base/common.js';
export * from './base/MessageComponentInteraction.js';
export * from './ChatInputCommandInteraction.js';
export * from './MessageComponentButtonInteraction.js';
export * from './MessageComponentChannelSelectInteraction.js';
export * from './MessageComponentMentionableSelectInteraction.js';
export * from './MessageComponentRoleSelectInteraction.js';
export * from './MessageComponentStringSelectInteraction.js';
export * from './MessageComponentUserSelectInteraction.js';
export * from './MessageContextMenuCommandInteraction.js';
export * from './ModalSubmitInteraction.js';
export * from './UserContextMenuCommandInteraction.js';

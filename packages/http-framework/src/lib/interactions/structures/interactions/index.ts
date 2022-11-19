import type { AutocompleteInteraction } from './AutocompleteInteraction';
import type { ChatInputCommandInteraction } from './ChatInputCommandInteraction';
import type { MessageComponentButtonInteraction } from './MessageComponentButtonInteraction';
import type { MessageComponentChannelSelectInteraction } from './MessageComponentChannelSelectInteraction';
import type { MessageComponentMentionableSelectInteraction } from './MessageComponentMentionableSelectInteraction';
import type { MessageComponentRoleSelectInteraction } from './MessageComponentRoleSelectInteraction';
import type { MessageComponentStringSelectInteraction } from './MessageComponentStringSelectInteraction';
import type { MessageComponentUserSelectInteraction } from './MessageComponentUserSelectInteraction';
import type { MessageContextMenuCommandInteraction } from './MessageContextMenuCommandInteraction';
import type { ModalSubmitInteraction } from './ModalSubmitInteraction';
import type { UserContextMenuCommandInteraction } from './UserContextMenuCommandInteraction';

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

export * from './AutocompleteInteraction';
export * from './base/BaseInteraction';
export * from './base/CommandInteraction';
export * from './base/common';
export * from './base/MessageComponentInteraction';
export * from './ChatInputCommandInteraction';
export * from './MessageComponentButtonInteraction';
export * from './MessageComponentChannelSelectInteraction';
export * from './MessageComponentMentionableSelectInteraction';
export * from './MessageComponentRoleSelectInteraction';
export * from './MessageComponentStringSelectInteraction';
export * from './MessageComponentUserSelectInteraction';
export * from './MessageContextMenuCommandInteraction';
export * from './ModalSubmitInteraction';
export * from './UserContextMenuCommandInteraction';

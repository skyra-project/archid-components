import type { EventHandlerRequest, H3Event } from 'h3';
import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	makeInteraction,
	MessageComponentButtonInteraction,
	MessageComponentChannelSelectInteraction,
	MessageComponentMentionableSelectInteraction,
	MessageComponentRoleSelectInteraction,
	MessageComponentStringSelectInteraction,
	MessageComponentUserSelectInteraction,
	MessageContextMenuCommandInteraction,
	ModalSubmitInteraction,
	UserContextMenuCommandInteraction
} from '../../../../src/index.js';
import {
	ApplicationCommandAutocompleteInteractionData,
	ChatInputApplicationCommandInteractionData,
	MessageApplicationCommandInteractionData,
	MessageComponentButtonInteractionData,
	MessageComponentChannelSelectInteractionData,
	MessageComponentMentionableSelectInteractionData,
	MessageComponentRoleSelectInteractionData,
	MessageComponentStringSelectInteractionData,
	MessageComponentUserSelectInteractionData,
	ModalSubmitInteractionData,
	UserApplicationCommandInteractionData
} from '../../../shared.js';

describe('util', () => {
	describe('makeInteraction', () => {
		const event = null! as H3Event<EventHandlerRequest>;

		test('GIVEN THEN returns AutocompleteInteraction instance', () => {
			const interaction = makeInteraction(event, ApplicationCommandAutocompleteInteractionData);

			expect<AutocompleteInteraction>(interaction).toBeInstanceOf(AutocompleteInteraction);
		});

		test('GIVEN THEN returns ChatInputCommandInteraction instance', () => {
			const interaction = makeInteraction(event, ChatInputApplicationCommandInteractionData);

			expect<ChatInputCommandInteraction>(interaction).toBeInstanceOf(ChatInputCommandInteraction);
		});

		test('GIVEN THEN returns MessageContextMenuCommandInteraction instance', () => {
			const interaction = makeInteraction(event, MessageApplicationCommandInteractionData);

			expect<MessageContextMenuCommandInteraction>(interaction).toBeInstanceOf(MessageContextMenuCommandInteraction);
		});

		test('GIVEN THEN returns UserContextMenuCommandInteraction instance', () => {
			const interaction = makeInteraction(event, UserApplicationCommandInteractionData);

			expect<UserContextMenuCommandInteraction>(interaction).toBeInstanceOf(UserContextMenuCommandInteraction);
		});

		test('GIVEN THEN returns MessageComponentButtonInteraction instance', () => {
			const interaction = makeInteraction(event, MessageComponentButtonInteractionData);

			expect<MessageComponentButtonInteraction>(interaction).toBeInstanceOf(MessageComponentButtonInteraction);
		});

		test('GIVEN THEN returns MessageComponentChannelSelectInteraction instance', () => {
			const interaction = makeInteraction(event, MessageComponentChannelSelectInteractionData);

			expect<MessageComponentChannelSelectInteraction>(interaction).toBeInstanceOf(MessageComponentChannelSelectInteraction);
		});

		test('GIVEN THEN returns MessageComponentMentionableSelectInteraction instance', () => {
			const interaction = makeInteraction(event, MessageComponentMentionableSelectInteractionData);

			expect<MessageComponentMentionableSelectInteraction>(interaction).toBeInstanceOf(MessageComponentMentionableSelectInteraction);
		});

		test('GIVEN THEN returns MessageComponentRoleSelectInteraction instance', () => {
			const interaction = makeInteraction(event, MessageComponentRoleSelectInteractionData);

			expect<MessageComponentRoleSelectInteraction>(interaction).toBeInstanceOf(MessageComponentRoleSelectInteraction);
		});

		test('GIVEN THEN returns MessageComponentStringSelectInteraction instance', () => {
			const interaction = makeInteraction(event, MessageComponentStringSelectInteractionData);

			expect<MessageComponentStringSelectInteraction>(interaction).toBeInstanceOf(MessageComponentStringSelectInteraction);
		});

		test('GIVEN THEN returns MessageComponentUserSelectInteraction instance', () => {
			const interaction = makeInteraction(event, MessageComponentUserSelectInteractionData);

			expect<MessageComponentUserSelectInteraction>(interaction).toBeInstanceOf(MessageComponentUserSelectInteraction);
		});

		test('GIVEN THEN returns ModalSubmitInteraction instance', () => {
			const interaction = makeInteraction(event, ModalSubmitInteractionData);

			expect<ModalSubmitInteraction>(interaction).toBeInstanceOf(ModalSubmitInteraction);
		});
	});
});

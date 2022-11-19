import type { ServerResponse } from 'node:http';
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
} from '../../../../src';
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
} from '../../../shared';

describe('util', () => {
	describe('makeInteraction', () => {
		const response = null! as ServerResponse;

		test('GIVEN THEN returns AutocompleteInteraction instance', () => {
			const interaction = makeInteraction(response, ApplicationCommandAutocompleteInteractionData);

			expect<AutocompleteInteraction>(interaction).toBeInstanceOf(AutocompleteInteraction);
		});

		test('GIVEN THEN returns ChatInputCommandInteraction instance', () => {
			const interaction = makeInteraction(response, ChatInputApplicationCommandInteractionData);

			expect<ChatInputCommandInteraction>(interaction).toBeInstanceOf(ChatInputCommandInteraction);
		});

		test('GIVEN THEN returns MessageContextMenuCommandInteraction instance', () => {
			const interaction = makeInteraction(response, MessageApplicationCommandInteractionData);

			expect<MessageContextMenuCommandInteraction>(interaction).toBeInstanceOf(MessageContextMenuCommandInteraction);
		});

		test('GIVEN THEN returns UserContextMenuCommandInteraction instance', () => {
			const interaction = makeInteraction(response, UserApplicationCommandInteractionData);

			expect<UserContextMenuCommandInteraction>(interaction).toBeInstanceOf(UserContextMenuCommandInteraction);
		});

		test('GIVEN THEN returns MessageComponentButtonInteraction instance', () => {
			const interaction = makeInteraction(response, MessageComponentButtonInteractionData);

			expect<MessageComponentButtonInteraction>(interaction).toBeInstanceOf(MessageComponentButtonInteraction);
		});

		test('GIVEN THEN returns MessageComponentChannelSelectInteraction instance', () => {
			const interaction = makeInteraction(response, MessageComponentChannelSelectInteractionData);

			expect<MessageComponentChannelSelectInteraction>(interaction).toBeInstanceOf(MessageComponentChannelSelectInteraction);
		});

		test('GIVEN THEN returns MessageComponentMentionableSelectInteraction instance', () => {
			const interaction = makeInteraction(response, MessageComponentMentionableSelectInteractionData);

			expect<MessageComponentMentionableSelectInteraction>(interaction).toBeInstanceOf(MessageComponentMentionableSelectInteraction);
		});

		test('GIVEN THEN returns MessageComponentRoleSelectInteraction instance', () => {
			const interaction = makeInteraction(response, MessageComponentRoleSelectInteractionData);

			expect<MessageComponentRoleSelectInteraction>(interaction).toBeInstanceOf(MessageComponentRoleSelectInteraction);
		});

		test('GIVEN THEN returns MessageComponentStringSelectInteraction instance', () => {
			const interaction = makeInteraction(response, MessageComponentStringSelectInteractionData);

			expect<MessageComponentStringSelectInteraction>(interaction).toBeInstanceOf(MessageComponentStringSelectInteraction);
		});

		test('GIVEN THEN returns MessageComponentUserSelectInteraction instance', () => {
			const interaction = makeInteraction(response, MessageComponentUserSelectInteractionData);

			expect<MessageComponentUserSelectInteraction>(interaction).toBeInstanceOf(MessageComponentUserSelectInteraction);
		});

		test('GIVEN THEN returns ModalSubmitInteraction instance', () => {
			const interaction = makeInteraction(response, ModalSubmitInteractionData);

			expect<ModalSubmitInteraction>(interaction).toBeInstanceOf(ModalSubmitInteraction);
		});
	});
});

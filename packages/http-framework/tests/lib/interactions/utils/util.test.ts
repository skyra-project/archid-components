import type { ServerResponse } from 'node:http';
import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	makeInteraction,
	MessageComponentButtonInteraction,
	MessageComponentSelectMenuInteraction,
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
	MessageComponentSelectMenuInteractionData,
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

		test('GIVEN THEN returns MessageComponentSelectMenuInteraction instance', () => {
			const interaction = makeInteraction(response, MessageComponentSelectMenuInteractionData);

			expect<MessageComponentSelectMenuInteraction>(interaction).toBeInstanceOf(MessageComponentSelectMenuInteraction);
		});

		test('GIVEN THEN returns MessageComponentSelectMenuInteraction instance', () => {
			const interaction = makeInteraction(response, MessageComponentChannelSelectInteractionData);

			expect<MessageComponentSelectMenuInteraction>(interaction).toBeInstanceOf(MessageComponentSelectMenuInteraction);
		});

		test('GIVEN THEN returns ModalSubmitInteraction instance', () => {
			const interaction = makeInteraction(response, ModalSubmitInteractionData);

			expect<ModalSubmitInteraction>(interaction).toBeInstanceOf(ModalSubmitInteraction);
		});
	});
});

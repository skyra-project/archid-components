import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import {
	ChatInputCommandInteraction,
	PartialMessage,
	type DeferResponseOptions,
	type MessageResponseOptions,
	type ModalResponseOptions
} from '../../../../../src/index.js';
import { ChatInputApplicationCommandInteractionData, makeResponse } from '../../../../shared.js';

// NOTE: The reason why we use `spy.mock.calls[0][0]` is because `toHaveBeenCalledWith` would need to match
// a function, which is impossible to do in tests, so we hack into the mock's calls and match the first
// parameter.

describe('CommandInteraction', () => {
	const AlreadyRepliedMessage = 'Cannot send response, the request has already been replied.';

	describe('reply', () => {
		const data: MessageResponseOptions = { content: 'Hello There' };

		test('GIVEN one call THEN sends data correctly', async () => {
			const response = makeResponse();
			const instance = new ChatInputCommandInteraction(response, ChatInputApplicationCommandInteractionData);

			const spy = vi.spyOn(response, 'end');
			const message = await instance.reply(data);

			expect(spy).toHaveBeenCalledOnce();
			expect(spy.mock.calls[0][0]).toBe(JSON.stringify({ type: InteractionResponseType.ChannelMessageWithSource, data }));
			expect<PartialMessage<ChatInputCommandInteraction>>(message).toBeInstanceOf(PartialMessage);
		});

		test('GIVEN two calls THEN the second throws', async () => {
			const instance = new ChatInputCommandInteraction(makeResponse(), ChatInputApplicationCommandInteractionData);

			await instance.reply(data);
			await expect(instance.reply(data)).rejects.toThrowError(AlreadyRepliedMessage);
		});
	});

	describe('defer', () => {
		const data: DeferResponseOptions = { flags: MessageFlags.Ephemeral };
		test('GIVEN one call THEN sends data correctly', async () => {
			const response = makeResponse();
			const instance = new ChatInputCommandInteraction(response, ChatInputApplicationCommandInteractionData);

			const spy = vi.spyOn(response, 'end');
			const message = await instance.defer(data);

			expect(spy).toHaveBeenCalledOnce();
			expect(spy.mock.calls[0][0]).toBe(JSON.stringify({ type: InteractionResponseType.DeferredChannelMessageWithSource, data }));
			expect<PartialMessage<ChatInputCommandInteraction>>(message).toBeInstanceOf(PartialMessage);
		});

		test('GIVEN two calls THEN the second throws', async () => {
			const instance = new ChatInputCommandInteraction(makeResponse(), ChatInputApplicationCommandInteractionData);

			await instance.defer(data);
			await expect(instance.defer(data)).rejects.toThrowError(AlreadyRepliedMessage);
		});
	});

	describe('showModal', () => {
		const data: ModalResponseOptions = { title: 'Foo', custom_id: 'modal:test', components: [] };
		test('GIVEN one call THEN sends data correctly', async () => {
			const response = makeResponse();
			const instance = new ChatInputCommandInteraction(response, ChatInputApplicationCommandInteractionData);

			const spy = vi.spyOn(response, 'end');
			await instance.showModal(data);

			expect(spy).toHaveBeenCalledOnce();
			expect(spy.mock.calls[0][0]).toBe(JSON.stringify({ type: InteractionResponseType.Modal, data }));
		});

		test('GIVEN two calls THEN the second throws', async () => {
			const instance = new ChatInputCommandInteraction(makeResponse(), ChatInputApplicationCommandInteractionData);

			await instance.defer({ flags: MessageFlags.Ephemeral });
			await expect(instance.defer({ flags: MessageFlags.Ephemeral })).rejects.toThrowError(AlreadyRepliedMessage);
		});
	});

	describe.todo('followup');
});

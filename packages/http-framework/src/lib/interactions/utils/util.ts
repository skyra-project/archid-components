import { container } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';
import {
	Routes,
	type APIBaseInteraction,
	type APIInteractionResponse,
	type InteractionType,
	type RESTPatchAPIInteractionOriginalResponseResult
} from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import { isGeneratorObject } from 'node:util/types';
import { HttpCodes } from '../../api/HttpCodes';

/**
 * Runs the callback, handling all possible results (awaitable data or generator),
 * and handles all of its errors.
 * @note The function assumes the reply was not used, and will always consume it
 * after execution.
 * @param reply The HTTP request we can reply to.
 * @param interaction The received interaction from Discord.
 * @param cb A callback with the command call result.
 * @returns The reply object.
 */
export async function runner<Type extends InteractionType, Data>(
	reply: FastifyReply,
	interaction: APIBaseInteraction<Type, Data>,
	cb: () => CommandResponse
): Promise<FastifyReply> {
	let result: CommandResponse;
	try {
		result = await cb();
	} catch (error) {
		return handleError(reply, error);
	}

	return isGeneratorObject(result) ? handleGenerator(reply, interaction, result) : reply.status(HttpCodes.OK).send(result);
}

/**
 * Handles a received error. This function must only be called if the HTTP
 * interaction was not replied to.
 *
 * This function has a special case for string errors, which are translated to a
 * regular message with content as the error.
 *
 * When an error is thrown, the error is emitted in client, and a generic error
 * message is sent back to Discord.
 * @param reply The HTTP request we can reply to.
 * @param error The error to handle.
 * @returns The reply object.
 */
export function handleError(reply: FastifyReply, error: unknown): FastifyReply {
	if (typeof error === 'string') {
		return reply.status(HttpCodes.OK).send({ content: error });
	}

	container.client.emit('error', error);
	return reply.status(HttpCodes.InternalServerError).send({ message: 'Received an internal error' });
}

/**
 * Sends an original interaction message response patch HTTP request.
 * @param interaction The received interaction from Discord.
 * @param body The body to be sent in the HTTP call.
 * @returns An API message.
 */
function patchMessage<Type extends InteractionType, Data>(interaction: APIBaseInteraction<Type, Data>, body: APIInteractionResponse) {
	return container.rest.patch(Routes.webhookMessage(interaction.application_id, interaction.token), {
		body,
		auth: false
	}) as Promise<RESTPatchAPIInteractionOriginalResponseResult>;
}

/**
 * Handles a generator object from a command call.
 * @param reply The HTTP request we can reply to.
 * @param interaction The received interaction from Discord.
 * @param generator The generator object we use to receive more information from.
 * @returns The reply object.
 */
async function handleGenerator<Type extends InteractionType, Data>(
	reply: FastifyReply,
	interaction: APIBaseInteraction<Type, Data>,
	generator: CommandGeneratorResponse
): Promise<FastifyReply> {
	let result = await generator.next();

	// If the method was a generator...
	if (result.done) {
		// ... but returned data, then reply the HTTP request and finish execution:
		if (result.value) return reply.status(HttpCodes.OK).send(result.value);

		// ... but did not return data, then throw as this is potentially a bug:
		return handleError(reply, new Error('The generator returned too early'));
	}

	// Reply the HTTP request with the first yielded value (likely a defer):
	await reply.status(HttpCodes.OK).send(result.value);

	// At this point, the method is a generator that is still returning more data,
	// the first call will NOT receive data back, because it's an HTTP response,
	// and we don't get the result from it.
	//
	// However, subsequent `yield` will indeed receive a response, since they
	// come from HTTP requests made by the framework. The way this works,
	// `generator.next(...)` goes to the next yield, but does not continue it.
	// The returned value of the `yield` will be the data returned in the next
	// `generator.next(...)` call. As such, the following code works:
	//
	//     yield this.defer(); // null
	//     yield this.message({ content: 'Hello There' }); // APIMessage
	//     yield this.message({ content: 'General Kenobi!' }); // APIMessage
	//
	// We also add a last case to read the result of the returned iterator, this
	// way, the following code is also supported as intended:
	//
	//     return this.message({ content: 'My job here is done' });
	//
	// For starters, we will need to store the last response, so it can be
	// passed in the next `generator.next(...)` call.
	let lastResponse: RESTPatchAPIInteractionOriginalResponseResult | null = null;
	try {
		// Handle `yield`:
		while (!(result = await generator.next(lastResponse)).done) {
			lastResponse = await patchMessage(interaction, result.value);
		}

		// Handle `return`:
		if (result.value) {
			await patchMessage(interaction, result.value);
		}
	} catch (error) {
		// Handle `throw`:
		container.client.emit('error', error);
	}

	return reply;
}

export type SyncInteractionGenerator = Generator<
	APIInteractionResponse,
	APIInteractionResponse | undefined,
	RESTPatchAPIInteractionOriginalResponseResult | null
>;

export type AsyncInteractionGenerator = AsyncGenerator<
	APIInteractionResponse,
	APIInteractionResponse | undefined,
	RESTPatchAPIInteractionOriginalResponseResult | null
>;

export type CommandAwaitableResponse = APIInteractionResponse;
export type CommandGeneratorResponse = SyncInteractionGenerator | AsyncInteractionGenerator;

export type CommandResponse = Awaitable<APIInteractionResponse | CommandGeneratorResponse>;

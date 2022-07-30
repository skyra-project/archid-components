import type { RawFile } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import type { Awaitable, NonNullObject } from '@sapphire/utilities';
import {
	Routes,
	type APIBaseInteraction,
	type APIInteraction,
	type APIInteractionResponse,
	type APIPingInteraction,
	type InteractionType,
	type RESTPatchAPIInteractionOriginalResponseJSONBody,
	type RESTPatchAPIInteractionOriginalResponseResult,
	type RESTPostAPIInteractionFollowupJSONBody,
	type RESTPostAPIInteractionFollowupResult
} from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import FormData from 'form-data';
import { isGeneratorObject } from 'node:util/types';
import { HttpCodes } from '../../api/HttpCodes';

export type NonPingInteraction = Exclude<APIInteraction, APIPingInteraction>;

/**
 * Runs the callback, handling all possible results (awaitable data or generator),
 * and handles all of its errors.
 * @note The function assumes the reply was not used, and will always consume it
 * after execution.
 * @param reply The HTTP request we can reply to.
 * @param interaction The received interaction from Discord.
 * @param cb A callback with the interaction handler call result.
 * @returns The reply object.
 */
export async function runner(reply: FastifyReply, interaction: NonPingInteraction, cb: () => InteractionHandlerResponse): Promise<FastifyReply> {
	let result: InteractionHandlerResponse;
	try {
		result = await cb();
	} catch (error) {
		return handleError(reply, error);
	}

	return isGeneratorObject(result) ? handleGenerator(reply, interaction, result) : handleResponse(reply, result);
}

function hasFiles(data: NonNullObject): data is { files: RawFile[] } {
	return Array.isArray((data as any).files) && (data as any).files.length > 0;
}

/**
 * Handles a response message. This function must only be called if the HTTP
 * interaction was not replied to.
 *
 * This function has a special case for when `data` has a non-empty `files`
 * array, where the data is sent as `multipart/form-data` rather than
 * `application/json`.
 * @param reply The HTTP request we can reply to.
 * @param data The data to be sent.
 * @returns The reply object.
 */
export function handleResponse(reply: FastifyReply, data: NonNullObject): FastifyReply {
	if (hasFiles(data)) {
		const { files, ...rest } = data;
		const form = new FormData();
		for (const [index, file] of files.entries()) {
			form.append(file.key ?? `files[${index}]`, file.data, file.name);
		}

		form.append('payload_json', JSON.stringify(rest));
		return reply.status(HttpCodes.OK).header('content-type', form.getHeaders()['content-type']).send(form);
	}

	return reply.status(HttpCodes.OK).header('content-type', 'application/json').send(data);
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
		return handleResponse(reply, { content: error });
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
export function postMessage<Type extends InteractionType, Data>(interaction: APIBaseInteraction<Type, Data>, { files, ...body }: PostMessageOptions) {
	return container.rest.post(Routes.webhook(interaction.application_id, interaction.token), {
		body,
		files,
		auth: false
	}) as Promise<RESTPostAPIInteractionFollowupResult>;
}

export type AddFiles<T> = T & { files?: RawFile[] };

export type PostMessageOptions = AddFiles<RESTPostAPIInteractionFollowupJSONBody>;

/**
 * Sends an original interaction message response patch HTTP request.
 * @param interaction The received interaction from Discord.
 * @param body The body to be sent in the HTTP call.
 * @returns An API message.
 */
export function patchMessage(interaction: NonPingInteraction, { files, ...body }: InteractionUpdateMessageWithFiles) {
	return container.rest.patch(Routes.webhookMessage(interaction.application_id, interaction.token), {
		body,
		files,
		auth: false
	}) as Promise<RESTPatchAPIInteractionOriginalResponseResult>;
}

export type InteractionResponseWithFiles = AddFiles<APIInteractionResponse | RESTPatchAPIInteractionOriginalResponseJSONBody>;
export type InteractionUpdateMessageWithFiles = AddFiles<RESTPatchAPIInteractionOriginalResponseJSONBody>;

/**
 * Handles a generator object from a command call.
 * @param reply The HTTP request we can reply to.
 * @param interaction The received interaction from Discord.
 * @param generator The generator object we use to receive more information from.
 * @returns The reply object.
 */
async function handleGenerator(
	reply: FastifyReply,
	interaction: NonPingInteraction,
	generator: InteractionHandlerGeneratorResponse
): Promise<FastifyReply> {
	let result;
	try {
		result = await generator.next();
	} catch (error) {
		return handleError(reply, error);
	}

	// If the method was a generator...
	if (result.done) {
		// ... but returned data, then reply the HTTP request and finish execution:
		if (result.value) return handleResponse(reply, result.value);

		// ... but did not return data, then throw as this is potentially a bug:
		return handleError(reply, new Error('The generator returned too early'));
	}

	// Reply the HTTP request with the first yielded value (likely a defer):
	await handleResponse(reply, result.value);

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
	//     yield this.updateResponse({ content: 'Hello There' }); // APIMessage
	//     yield this.updateResponse({ content: 'General Kenobi!' }); // APIMessage
	//
	// We also add a last case to read the result of the returned iterator, this
	// way, the following code is also supported as intended:
	//
	//     return this.updateResponse({ content: 'My job here is done' });
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
	InteractionResponseWithFiles,
	InteractionResponseWithFiles | InteractionUpdateMessageWithFiles | undefined,
	InteractionResponseWithFiles | InteractionUpdateMessageWithFiles | null
>;
export type AsyncInteractionGenerator = AsyncGenerator<
	InteractionResponseWithFiles,
	InteractionResponseWithFiles | InteractionUpdateMessageWithFiles | undefined,
	InteractionResponseWithFiles | InteractionUpdateMessageWithFiles | null
>;

export type InteractionHandlerInteractionResponse = InteractionResponseWithFiles;
export type InteractionHandlerGeneratorResponse = SyncInteractionGenerator | AsyncInteractionGenerator;

export type InteractionHandlerResponse = Awaitable<InteractionResponseWithFiles | InteractionHandlerGeneratorResponse>;
export type AsyncInteractionHandlerResponse = Promise<InteractionResponseWithFiles | InteractionHandlerGeneratorResponse>;

import { container } from '@sapphire/pieces';
import { err, ok, Result } from '@sapphire/result';
import { isNullishOrEmpty } from '@sapphire/utilities';
import { getRequestHeader, type EventHandlerRequest, type H3Event } from 'h3';
import { ErrorMessages } from './constants.js';

/**
 * Safely reads the {@link EventHandlerRequest incoming message}'s body as a string.
 * @param event The incoming message to get the data from.
 * @returns The string, if it's within the body size limit.
 */
export async function getSafeTextBody(event: H3Event<EventHandlerRequest>): Promise<Result.Err<string> | Result.Ok<string>> {
	let limit = container.client.bodySizeLimit;

	const contentLengthHeader = getRequestHeader(event, 'content-length');

	// Validate the Content-Length header:
	if (!isNullishOrEmpty(contentLengthHeader)) {
		const parsed = Number(contentLengthHeader);
		if (!Number.isSafeInteger(parsed)) return err(ErrorMessages.InvalidContentLengthInteger);
		if (parsed <= 0) return err(ErrorMessages.InvalidContentLengthNegative);
		if (parsed > limit) return err(ErrorMessages.InvalidContentLengthTooBig);

		// If it's a valid length, set the limit to it.
		limit = parsed;
	}

	const decoder = new TextDecoder();

	let output = '';
	for await (const chunk of event.node.req) {
		const part = typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true });
		if (part.length + output.length > limit) return err(ErrorMessages.InvalidBodySize);

		output += part;
	}

	// Flush the streaming TextDecoder so that any pending
	// incomplete multibyte characters are handled.
	const part = decoder.decode(undefined, { stream: false });
	if (part.length + output.length > limit) return err(ErrorMessages.InvalidBodySize);

	output += part;
	return ok(output);
}

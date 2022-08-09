import { isNullish } from '@sapphire/utilities';
import type { FastifyError, FastifyReply, FastifyRequest, RequestPayload, RouteOptions } from 'fastify';
import { TextDecoder } from 'node:util';

const decoder = new TextDecoder();

export function assignRawData(options: RouteOptions) {
	if (options.method !== 'POST') return;

	if (isNullish(options.preParsing)) {
		options.preParsing = [addRawBody];
	} else if (typeof options.preParsing === 'function') {
		options.preParsing = [addRawBody, options.preParsing];
	} else {
		options.preParsing = [addRawBody, ...options.preParsing];
	}
}

function addRawBody(
	request: FastifyRequest,
	_reply: FastifyReply,
	payload: RequestPayload,
	done: <TError extends Error = FastifyError>(err?: TError | null, res?: RequestPayload) => void
) {
	let received = 0;
	const limit = request.server.initialConfig.bodyLimit ?? Number.MAX_SAFE_INTEGER;
	const stream = payload ?? request.raw;

	let output = '';
	stream //
		.on('data', onData)
		.on('close', cleanup)
		.on('end', onEnd)
		.on('error', cleanup);
	done(null, payload);

	function onData(chunk: string | Uint8Array | Buffer) {
		const part = typeof chunk === 'string' ? chunk : decoder.decode(chunk);

		received += part.length;
		if (received > limit) cleanup();
		else output += part;
	}

	function onEnd() {
		request.rawBody = output;
		cleanup();
	}

	function cleanup() {
		stream //
			.off('data', onData)
			.off('close', cleanup)
			.off('end', onEnd)
			.off('error', cleanup);
	}
}

declare module 'fastify' {
	interface FastifyRequest {
		rawBody?: string | Buffer;
	}
}

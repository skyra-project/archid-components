import { isNullishOrEmpty } from '@sapphire/utilities';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { subtle, type webcrypto } from 'node:crypto';
import { HttpCodes } from '../api/HttpCodes';

export type HeaderValue = string | string[];
export type Key = webcrypto.CryptoKey;

const AlgorithmName = 'Ed25519';

function headerToString(header: HeaderValue): string {
	return typeof header === 'string' ? header : header[0];
}

export function makeKey(key: string): Promise<Key> {
	return subtle.importKey('raw', Buffer.from(key, 'hex'), { name: AlgorithmName }, true, ['verify']);
}

/**
 * Validates a payload from Discord against its signature and key.
 * @param request The fastify request.
 * @param reply The fastify response.
 * @param key The public key from the Discord developer dashboard, generated by {@link makeKey}
 */
export async function handleSecurityHook(request: FastifyRequest, reply: FastifyReply, key: Key) {
	// We don't want to check GET requests to our root url
	if (request.method !== 'POST') return;

	const body = request.rawBody;
	const signature = request.headers['x-signature-ed25519'];
	const timestamp = request.headers['x-signature-timestamp'];

	if (isNullishOrEmpty(body) || isNullishOrEmpty(signature) || isNullishOrEmpty(timestamp)) {
		return reply.status(HttpCodes.Unauthorized).send({ message: 'Missing signature information' });
	}

	const signatureData = Buffer.from(headerToString(signature), 'hex');
	const data = Buffer.isBuffer(body)
		? Buffer.concat([Buffer.from(headerToString(timestamp)), body])
		: Buffer.from(`${headerToString(timestamp)}${body}`);

	const valid = await subtle.verify(AlgorithmName, key, signatureData, Buffer.from(data));
	if (!valid) return reply.status(HttpCodes.Unauthorized).send({ message: 'The signature is incorrect' });

	return undefined;
}
import type { webcrypto } from 'node:crypto';

export type HeaderValue = string | string[];
export type Key = webcrypto.CryptoKey;

const AlgorithmName = 'Ed25519';

function headerToString(header: HeaderValue): string {
	return typeof header === 'string' ? header : header[0];
}

export function makeKey(key: string): Promise<Key> {
	return crypto.subtle.importKey('raw', Buffer.from(key, 'hex'), { name: AlgorithmName }, true, ['verify']);
}

/**
 * Validates a payload from Discord against its signature and key.
 * @param body The request body.
 * @param signature The value of the `x-signature-ed25519` header.
 * @param signature The value of the `x-signature-timestamp` header.
 * @param key The public key from the Discord developer dashboard, generated by {@link makeKey}
 */
export async function verifyBody(body: string, signature: string | string[], timestamp: string | string[], key: Key) {
	const signatureData = Buffer.from(headerToString(signature), 'hex');
	const data = Buffer.isBuffer(body)
		? Buffer.concat([Buffer.from(headerToString(timestamp)), body])
		: Buffer.from(`${headerToString(timestamp)}${body}`);

	return crypto.subtle.verify(AlgorithmName, key, signatureData, Buffer.from(data));
}

declare global {
	const crypto: typeof webcrypto;
}

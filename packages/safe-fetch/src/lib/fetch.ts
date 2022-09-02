import { err, ok, type Result } from '@sapphire/result';
import type { Awaitable, NonNullObject } from '@sapphire/utilities';
import { HttpError } from './errors/HttpError';

export async function safeFetch(input: RequestInfo | URL, init?: RequestInit): Promise<FetchResult<Response>> {
	try {
		const response = await fetch(input, init);
		if (response.ok) return ok(response);
		return err(new HttpError(response, await response.text()));
	} catch (error) {
		return err(error as AbortError);
	}
}

export async function safeTimedFetch(input: RequestInfo | URL, ms: number, init?: Omit<RequestInit, 'signal'>): Promise<FetchResult<Response>> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), ms);
	const result = await safeFetch(input, { ...init, signal: controller.signal });
	clearTimeout(timer);
	return result;
}

export async function Text(result: Awaitable<FetchResult<Response>>): Promise<FetchResult<string>> {
	return (await result).map((response) => response.text()).intoPromise();
}

export async function Json<T extends NonNullObject>(result: Awaitable<FetchResult<Response>>): Promise<FetchResult<T>> {
	return (await result).map((response) => response.json()).intoPromise();
}

export async function Blob(result: Awaitable<FetchResult<Response>>): Promise<FetchResult<Blob>> {
	return (await result).map((response) => response.blob()).intoPromise();
}

export async function ArrayBuffer(result: Awaitable<FetchResult<Response>>): Promise<FetchResult<ArrayBuffer>> {
	return (await result).map((response) => response.arrayBuffer()).intoPromise();
}

export async function FormData(result: Awaitable<FetchResult<Response>>): Promise<FetchResult<FormData>> {
	return (await result).map((response) => response.formData()).intoPromise();
}

export function isAbortError(error: Error): error is AbortError {
	return error.name === 'AbortError';
}

export type AbortError = Error & { name: 'AbortError' };
export type FetchError = HttpError | AbortError;
export type FetchResult<T> = Result<T, FetchError>;

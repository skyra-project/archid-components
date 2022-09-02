// eslint-disable-next-line spaced-comment
/// <reference lib="dom" />

import { none, some, type Option } from '@sapphire/result';

export class HttpError extends Error {
	public readonly response: Response;
	public readonly body: string;
	private json: Option<unknown> = none;

	public constructor(response: Response, body: string) {
		super('Received a non-OK HTTP response code');
		this.response = response;
		this.body = body;
	}

	public get url() {
		return this.response.url;
	}

	public get code() {
		return this.response.status;
	}

	public get jsonBody(): unknown {
		return this.json.match({
			some: (value) => value,
			none: () => (this.json = some(JSON.parse(this.body)).unwrap())
		});
	}
}

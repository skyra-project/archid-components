import { InteractionResponseType, type APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/v10';
import { BaseInteraction } from './base/BaseInteraction.js';
import type { AutocompleteResponseData, AutocompleteResponseOptions } from './base/common.js';

export class AutocompleteInteraction extends BaseInteraction<AutocompleteInteraction.Type> {
	/**
	 * Responds to the interaction with an autocomplete result.
	 * @param data The data to be sent.
	 */
	public reply(data: AutocompleteResponseOptions): Promise<void> {
		const body: AutocompleteResponseData = { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data };
		return this._sendReply(body);
	}

	/**
	 * Responds to the interaction with an empty autocomplete result.
	 */
	public replyEmpty(): Promise<void> {
		return this.reply({ choices: [] });
	}
}

export namespace AutocompleteInteraction {
	export type Type = APIApplicationCommandAutocompleteInteraction;
}

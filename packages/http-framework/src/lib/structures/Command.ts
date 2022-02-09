import { Collection } from '@discordjs/collection';
import { Piece } from '@sapphire/pieces';
import type { APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/payloads/v9/_interactions/autocomplete';
import {
	type APIApplicationCommandAutocompleteResponse,
	type APIApplicationCommandInteraction,
	type APICommandAutocompleteInteractionResponseCallbackData,
	type APIInteractionResponse,
	type APIInteractionResponseCallbackData,
	type APIInteractionResponseChannelMessageWithSource,
	ApplicationCommandOptionType,
	InteractionResponseType,
	type APIChatInputApplicationCommandInteractionData,
	type APIContextMenuInteractionData
} from 'discord-api-types/v9';
import { chatInputCommandRegistry, contextMenuCommandRegistry } from '../interactions';
import { getMethod } from '../interactions/shared/link';

export abstract class Command extends Piece {
	private chatInputRouter = new Collection<string, string | Collection<string, string>>();
	private contextMenuRouter = new Collection<string, string>();
	public override onLoad() {
		this.populateChatInputRouter();
		this.populateContextMenuRouter();
	}

	/**
	 * Responds to the interaction with an autocomplete result.
	 * @param data The data to be sent.
	 */
	protected autocomplete(data: APICommandAutocompleteInteractionResponseCallbackData): APIApplicationCommandAutocompleteResponse {
		return { type: InteractionResponseType.ApplicationCommandAutocompleteResult, data };
	}

	/**
	 * Responds to the interaction with a message.
	 * @param data The data to be sent.
	 */
	protected message(data: APIInteractionResponseCallbackData): APIInteractionResponseChannelMessageWithSource {
		return { type: InteractionResponseType.ChannelMessageWithSource, data };
	}

	protected routeChatInputInteraction(data: APIChatInputApplicationCommandInteractionData): string | null {
		if (!data.options) return 'chatInputRun';

		const [firstOption] = data.options;
		if (firstOption.type === ApplicationCommandOptionType.Subcommand) {
			const possible = this.chatInputRouter.get(firstOption.name);
			return typeof possible === 'string' ? possible : null;
		}

		if (firstOption.type === ApplicationCommandOptionType.SubcommandGroup) {
			const possibleGroup = this.chatInputRouter.get(firstOption.name);
			if (!(possibleGroup instanceof Collection)) return null;

			const [firstSubOption] = firstOption.options;
			const possible = this.chatInputRouter.get(firstSubOption.name);
			return typeof possible === 'string' ? possible : null;
		}

		return 'chatInputRun';
	}

	protected routeContextMenuInteraction(data: APIContextMenuInteractionData): string | null {
		const possible = this.contextMenuRouter.get(data.name);
		return typeof possible === 'string' ? possible : null;
	}

	private populateChatInputRouter() {
		const data = chatInputCommandRegistry.get(this.constructor as typeof Command);
		if (!data?.options?.length) return;

		for (const option of data.options) {
			if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
				// If a subcommand group has no subcommands, skip:
				if (!option.options?.length) continue;

				// If a subcommand group already existed, throw an error:
				if (this.chatInputRouter.has(option.name)) throw new Error(`Duplicated chat input SubcommandGroup named "${option.name}"`);

				const subcommands = new Collection<string, string>();
				for (const subOption of option.options) {
					const method = getMethod(subOption);
					if (method && typeof Reflect.get(this, method) === 'function') {
						subcommands.set(subOption.name, method);
					} else {
						throw new Error(
							`Chat input subcommand named "${option.name}" (inside SubcommandGroup named "${option.name}") is not linked to a method`
						);
					}
				}

				this.chatInputRouter.set(option.name, subcommands);
			} else if (option.type === ApplicationCommandOptionType.Subcommand) {
				// If a subcommand group already existed, throw an error:
				if (this.chatInputRouter.has(option.name)) throw new Error(`Duplicated Subcommand named "${option.name}"`);

				const method = getMethod(option);
				if (method && typeof Reflect.get(this, method) === 'function') this.chatInputRouter.set(option.name, method);
				else throw new Error(`Chat input subcommand named "${option.name}" is not linked to a method`);
			}
		}
	}

	private populateContextMenuRouter() {
		const entries = contextMenuCommandRegistry.get(this.constructor as typeof Command);
		if (!entries?.length) return;

		for (const entry of entries) {
			const method = getMethod(entry);
			if (method && typeof Reflect.get(this, method) === 'function') this.chatInputRouter.set(entry.name, method);
			else throw new Error(`Context menu command named "${entry.name}" is not linked to a method`);
		}
	}
}

export namespace Command {
	export type Response = APIInteractionResponse;
	export type ResponseAsync = PromiseLike<Response>;
	export type AwaitableResponse = Response | ResponseAsync;

	export type Interaction =
		| APIApplicationCommandInteraction
		| (APIApplicationCommandAutocompleteInteraction & {
				data: NonNullable<APIApplicationCommandAutocompleteInteraction['data']> & { name: string };
		  });
	export type InteractionData = Interaction['data'];
}

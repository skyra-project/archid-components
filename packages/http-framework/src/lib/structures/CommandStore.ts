import { container, Store } from '@sapphire/pieces';
import { Result } from '@sapphire/result';
import type { Awaitable } from '@sapphire/utilities';
import {
	ApplicationCommandType,
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteraction,
	type APIApplicationCommandInteractionData,
	type APIPrimaryEntryPointCommandInteraction
} from 'discord-api-types/v10';
import type { ServerResponse } from 'node:http';
import { HttpCodes } from '../api/HttpCodes.js';
import {
	transformAutocompleteInteraction,
	transformInteraction,
	transformMessageInteraction,
	transformUserInteraction
} from '../interactions/index.js';
import { handleError, makeInteraction } from '../interactions/utils/util.js';
import { ErrorMessages } from '../utils/constants.js';
import { Command } from './Command.js';
import { CommandLoaderStrategy } from './CommandLoaderStrategy.js';
import { CommandStoreRouter } from './CommandStoreRouter.js';

export class CommandStore extends Store<Command, 'commands'> {
	/**
	 * The router instance for handling commands in the CommandStore.
	 *
	 * @since 2.0.0
	 */
	public router = new CommandStoreRouter();

	public constructor() {
		super(Command, { name: 'commands', strategy: new CommandLoaderStrategy() });
	}

	/**
	 * Runs an application command.
	 *
	 * @since 1.0.0
	 * @param response - The server response object.
	 * @param interaction - The API application command interaction object.
	 * @returns A promise that resolves to the server response.
	 */
	public async runApplicationCommand(
		response: ServerResponse,
		interaction: Exclude<APIApplicationCommandInteraction, APIPrimaryEntryPointCommandInteraction>
	): Promise<ServerResponse> {
		const command = this.router.get(interaction);
		if (!command) {
			container.client.emit('commandNameUnknown', interaction, response);
			response.statusCode = HttpCodes.NotImplemented;
			return response.end(ErrorMessages.UnknownCommandName);
		}

		const context = { command, interaction, response };
		const method = this.#routeCommandMethodName(command, interaction.data);
		if (!method) {
			container.client.emit('commandMethodUnknown', context);
			response.statusCode = HttpCodes.NotImplemented;
			return response.end(ErrorMessages.UnknownCommandHandler);
		}

		container.client.emit('commandRun', context);
		const result = await Result.fromAsync(() => this.#runCommandMethod(command, method, makeInteraction(response, interaction)));
		result
			.inspect((value) => container.client.emit('commandSuccess', context, value))
			.inspectErr((error) => (container.client.emit('commandError', error, context), handleError(response, error)));

		container.client.emit('commandFinish', context);
		return response;
	}

	/**
	 * Runs the application command autocomplete.
	 *
	 * @since 1.0.0
	 * @param response - The server response object.
	 * @param interaction - The API application command autocomplete interaction object.
	 * @returns A promise that resolves to the server response.
	 */
	public async runApplicationCommandAutocomplete(
		response: ServerResponse,
		interaction: APIApplicationCommandAutocompleteInteraction
	): Promise<ServerResponse> {
		if (!interaction.data?.name) {
			container.client.emit('commandNameMissing', interaction, response);
			response.statusCode = HttpCodes.BadRequest;
			return response.end(ErrorMessages.MissingCommandName);
		}

		const command = this.router.getChatInput(interaction.data.name);
		if (!command) {
			container.client.emit('commandNameUnknown', interaction, response);
			response.statusCode = HttpCodes.NotImplemented;
			return response.end(ErrorMessages.UnknownCommandName);
		}

		const context = { command, interaction, response };
		const options = transformAutocompleteInteraction(interaction.data.resolved ?? {}, interaction.data.options);

		container.client.emit('autocompleteRun', context);
		const result = await Result.fromAsync(() => command.autocompleteRun(makeInteraction(response, interaction), options));
		result
			.inspect((value) => container.client.emit('autocompleteSuccess', context, value))
			.inspectErr((error) => (container.client.emit('autocompleteError', error, context), handleError(response, error)));

		container.client.emit('autocompleteFinish', context);
		return response;
	}

	/**
	 * Executes a command method on a command object.
	 *
	 * @since 1.0.0
	 * @param command - The command object.
	 * @param method - The name of the method to execute.
	 * @param interaction - The application command interaction.
	 * @returns A promise that resolves to the result of the method execution.
	 */
	#runCommandMethod(command: Command, method: string, interaction: Command.ApplicationCommandInteraction): Awaitable<unknown> {
		return Reflect.apply(Reflect.get(command, method), command, [interaction, this.#createArguments(interaction.data)]);
	}

	/**
	 * Determines the method name to route a command based on the type of interaction data.
	 *
	 * @since 1.0.0
	 * @param command - The command object.
	 * @param data - The interaction data.
	 * @returns The method name to route the command, or null if no method is found.
	 * @throws Error - If the interaction data type is not recognized.
	 */
	#routeCommandMethodName(command: Command, data: Command.ApplicationCommandInteraction['data']): string | null {
		switch (data.type) {
			case ApplicationCommandType.ChatInput:
				return command.router.routeChatInputInteraction(data);
			case ApplicationCommandType.User:
			case ApplicationCommandType.Message:
				return command.router.routeContextMenuInteraction(data);
			default:
				throw new Error('Unreachable');
		}
	}

	/**
	 * Creates arguments based on the provided {@linkcode APIApplicationCommandInteractionData}.
	 *
	 * @since 1.0.0
	 * @param data The {@linkcode APIApplicationCommandInteractionData} object.
	 * @returns The transformed arguments based on the interaction data.
	 * @throws Error - If the {@linkcode ApplicationCommandType} is unsupported.
	 */
	#createArguments(data: APIApplicationCommandInteractionData) {
		switch (data.type) {
			case ApplicationCommandType.ChatInput:
				return transformInteraction(data.resolved ?? {}, data.options ?? []);
			case ApplicationCommandType.User:
				return transformUserInteraction(data);
			case ApplicationCommandType.Message:
				return transformMessageInteraction(data);
			default:
				throw new Error('Unknown ApplicationCommandType');
		}
	}
}

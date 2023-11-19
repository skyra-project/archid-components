import { Collection } from '@discordjs/collection';
import { container, Store } from '@sapphire/pieces';
import { Result } from '@sapphire/result';
import type { Awaitable } from '@sapphire/utilities';
import {
	ApplicationCommandType,
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteraction,
	type APIApplicationCommandInteractionData
} from 'discord-api-types/v10';
import { createError, sendError, type EventHandlerRequest, type H3Event } from 'h3';
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

export class CommandStore extends Store<Command, 'commands'> {
	public contextMenuCommands = new Collection<string, Command>();

	public constructor() {
		super(Command, { name: 'commands' });
	}

	public async runApplicationCommand(event: H3Event<EventHandlerRequest>, interaction: APIApplicationCommandInteraction): Promise<void> {
		const command =
			interaction.data.type === ApplicationCommandType.ChatInput
				? this.get(interaction.data.name)
				: this.contextMenuCommands.get(interaction.data.name);

		if (!command) {
			container.client.emit('commandNameUnknown', interaction, event);
			return sendError(
				event,
				createError({
					statusCode: HttpCodes.NotImplemented,
					message: ErrorMessages.UnknownCommandName
				})
			);
		}

		const context = { command, interaction, event };
		const method = this.routeCommandMethodName(command, interaction.data);
		if (!method) {
			container.client.emit('commandMethodUnknown', context);
			return sendError(
				event,
				createError({
					statusCode: HttpCodes.NotImplemented,
					message: ErrorMessages.UnknownCommandHandler
				})
			);
		}

		container.client.emit('commandRun', context);
		const result = await Result.fromAsync(() => this.runCommandMethod(command, method, makeInteraction(event, interaction)));
		result
			.inspect((value) => container.client.emit('commandSuccess', context, value))
			.inspectErr((error) => (container.client.emit('commandError', error, context), handleError(event, error)));

		container.client.emit('commandFinish', context);
	}

	public async runApplicationCommandAutocomplete(
		event: H3Event<EventHandlerRequest>,
		interaction: APIApplicationCommandAutocompleteInteraction
	): Promise<void> {
		if (!interaction.data?.name) {
			container.client.emit('commandNameMissing', interaction, event);
			return sendError(
				event,
				createError({
					statusCode: HttpCodes.BadRequest,
					message: ErrorMessages.MissingCommandName
				})
			);
		}

		const command = this.get(interaction.data.name);
		if (!command) {
			container.client.emit('commandNameUnknown', interaction, event);
			return sendError(
				event,
				createError({
					statusCode: HttpCodes.NotImplemented,
					message: ErrorMessages.UnknownCommandName
				})
			);
		}

		const context = { command, interaction, event };
		const options = transformAutocompleteInteraction(interaction.data.resolved ?? {}, interaction.data.options);

		container.client.emit('autocompleteRun', context);
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const result = await Result.fromAsync(() => command['autocompleteRun'](makeInteraction(event, interaction), options));
		result
			.inspect((value) => container.client.emit('autocompleteSuccess', context, value))
			.inspectErr((error) => (container.client.emit('autocompleteError', error, context), handleError(event, error)));

		container.client.emit('autocompleteFinish', context);
	}

	private runCommandMethod(command: Command, method: string, interaction: Command.ApplicationCommandInteraction): Awaitable<unknown> {
		return Reflect.apply(Reflect.get(command, method), command, [interaction, this.createArguments(interaction.data)]);
	}

	private routeCommandMethodName(command: Command, data: Command.ApplicationCommandInteraction['data']): string | null | undefined {
		switch (data.type) {
			case ApplicationCommandType.ChatInput: {
				// eslint-disable-next-line @typescript-eslint/dot-notation
				return command['routeChatInputInteraction'](data);
			}
			case ApplicationCommandType.User:
			case ApplicationCommandType.Message: {
				// eslint-disable-next-line @typescript-eslint/dot-notation
				return command['routeContextMenuInteraction'](data);
			}
		}
	}

	private createArguments(data: APIApplicationCommandInteractionData) {
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

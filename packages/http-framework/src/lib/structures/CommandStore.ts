import { Collection } from '@discordjs/collection';
import { Store } from '@sapphire/pieces';
import { Result } from '@sapphire/result';
import type { Awaitable } from '@sapphire/utilities';
import {
	ApplicationCommandType,
	type APIApplicationCommandAutocompleteInteraction,
	type APIApplicationCommandInteraction,
	type APIApplicationCommandInteractionData
} from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import { HttpCodes } from '../api/HttpCodes';
import { transformAutocompleteInteraction, transformInteraction, transformMessageInteraction, transformUserInteraction } from '../interactions';
import { handleError, makeInteraction } from '../interactions/utils/util';
import { Command } from './Command';

export class CommandStore extends Store<Command> {
	public contextMenuCommands = new Collection<string, Command>();

	public constructor() {
		super(Command, { name: 'commands' });
	}

	public async runApplicationCommand(reply: FastifyReply, interaction: APIApplicationCommandInteraction): Promise<FastifyReply> {
		const command =
			interaction.data.type === ApplicationCommandType.ChatInput
				? this.get(interaction.data.name)
				: this.contextMenuCommands.get(interaction.data.name);

		if (!command) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown command name' });

		const method = this.routeCommandMethodName(command, interaction.data);
		if (!method) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown subcommand name' });

		const result = await Result.fromAsync(() => this.runCommandMethod(command, method, makeInteraction(reply, interaction)));
		result.inspectErr((error) => handleError(reply, error));
		return reply;
	}

	public async runApplicationCommandAutocomplete(
		reply: FastifyReply,
		interaction: APIApplicationCommandAutocompleteInteraction
	): Promise<FastifyReply> {
		if (!interaction.data?.name) return reply.status(HttpCodes.NotImplemented).send({ message: 'Missing command name' });

		const command = this.get(interaction.data.name);
		if (!command) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown command name' });

		const options = transformAutocompleteInteraction(interaction.data.resolved ?? {}, interaction.data.options);

		// eslint-disable-next-line @typescript-eslint/dot-notation
		const result = await Result.fromAsync(() => command['autocompleteRun'](makeInteraction(reply, interaction), options));
		result.inspectErr((error) => handleError(reply, error));
		return reply;
	}

	private runCommandMethod(command: Command, method: string, interaction: Command.ApplicationCommandInteraction): Awaitable<unknown> {
		return Reflect.apply(Reflect.get(command, method), command, [interaction, this.createArguments(interaction.data)]);
	}

	private routeCommandMethodName(command: Command, data: Command.ApplicationCommandInteraction['data']): string | null {
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

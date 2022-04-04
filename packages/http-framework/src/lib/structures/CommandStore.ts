import { Store } from '@sapphire/pieces';
import type { APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/payloads/v9/_interactions/autocomplete';
import { ApplicationCommandType, type APIInteractionResponse } from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import { HttpCodes } from '../api/HttpCodes';
import { transformAutocompleteInteraction, transformInteraction } from '../interactions';
import { handleError, handleResponse, runner } from '../interactions/utils/util';
import { Command } from './Command';

export class CommandStore extends Store<Command> {
	public constructor() {
		super(Command as any, { name: 'commands' });
	}

	public async runApplicationCommand(reply: FastifyReply, interaction: Command.Interaction): Promise<FastifyReply> {
		const command = this.get(interaction.data.name);
		if (!command) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown command name' });

		const method = this.routeCommandMethodName(command, interaction.data);
		if (!method) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown subcommand name' });

		const cb = () => this.runCommandMethod(command, method, interaction);
		return runner(reply, interaction as any, cb);
	}

	public async runApplicationCommandAutocomplete(
		reply: FastifyReply,
		interaction: APIApplicationCommandAutocompleteInteraction
	): Promise<FastifyReply> {
		if (!interaction.data?.name) return reply.status(HttpCodes.NotImplemented).send({ message: 'Missing command name' });

		const command = this.get(interaction.data.name);
		if (!command) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown command name' });

		try {
			// eslint-disable-next-line @typescript-eslint/dot-notation
			const response = await command['autocompleteRun'](
				interaction,
				transformAutocompleteInteraction(interaction.data.resolved ?? {}, interaction.data.options)
			);
			return handleResponse(reply, response);
		} catch (error) {
			return handleError(reply, error);
		}
	}

	private runCommandMethod(
		command: Command,
		method: string,
		interaction: Command.Interaction
	): PromiseLike<APIInteractionResponse> | APIInteractionResponse {
		return Reflect.apply(Reflect.get(command, method), command, [interaction, this.createArguments(interaction.data)]);
	}

	private routeCommandMethodName(command: Command, data: Command.InteractionData): string | null {
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

	private createArguments(data: Command.InteractionData) {
		switch (data.type) {
			case ApplicationCommandType.ChatInput:
				return transformInteraction(data.resolved ?? {}, data.options ?? []);
			case ApplicationCommandType.User:
				return { [data.name]: { user: data.resolved.users[data.target_id], member: data.resolved.members?.[data.target_id] } };
			case ApplicationCommandType.Message:
				return { [data.name]: { message: data.resolved.messages[data.target_id] } };
			default:
				throw new Error('Unknown ApplicationCommandType');
		}
	}
}

import { Store } from '@sapphire/pieces';
import { APIApplicationCommandInteraction, APIInteractionResponse, ApplicationCommandType } from 'discord-api-types/v9';
import type { FastifyReply } from 'fastify';
import { HttpCodes } from '../api/HttpCodes';
import { transformInteraction } from '../interactions';
import { Command } from './Command';

export class CommandStore extends Store<Command> {
	public constructor() {
		super(Command, { name: 'commands' });
	}

	public async runApplicationCommand(reply: FastifyReply, interaction: APIApplicationCommandInteraction): Promise<FastifyReply> {
		try {
			// ...
			const command = this.get(interaction.data.name);
			if (!command) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown command name' });

			const method = this.routeCommandMethodName(command, interaction);
			if (!method) return reply.status(HttpCodes.NotImplemented).send({ message: 'Unknown subcommand name' });

			const response = await this.runCommandMethod(command, method, interaction);
			return reply.status(HttpCodes.OK).send(response);
		} catch (error) {
			if (typeof error === 'string') {
				return reply.status(HttpCodes.OK).send({ content: error });
			}

			// Log error

			return reply.status(HttpCodes.InternalServerError).send({ message: 'Received an internal error' });
		}
	}

	private runCommandMethod(
		command: Command,
		method: string,
		interaction: APIApplicationCommandInteraction
	): PromiseLike<APIInteractionResponse> | APIInteractionResponse {
		return Reflect.apply(Reflect.get(command, method), command, [interaction, this.createArguments(interaction.data)]);
	}

	private routeCommandMethodName(command: Command, interaction: APIApplicationCommandInteraction): string | null {
		switch (interaction.data.type) {
			case ApplicationCommandType.ChatInput: {
				// eslint-disable-next-line @typescript-eslint/dot-notation
				return command['routeChatInputInteraction'](interaction.data);
			}
			case ApplicationCommandType.User:
			case ApplicationCommandType.Message: {
				// eslint-disable-next-line @typescript-eslint/dot-notation
				return command['routeContextMenuInteraction'](interaction.data);
			}
		}
	}

	private createArguments(data: APIApplicationCommandInteraction['data']) {
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

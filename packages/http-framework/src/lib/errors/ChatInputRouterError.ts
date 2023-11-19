import type { APIApplicationCommandSubcommandGroupOption, APIApplicationCommandSubcommandOption } from 'discord-api-types/v10';
import type { Command } from '../structures/Command.js';

/**
 * Represents an error that is thrown when a {@link ChatInputRouter} encounters an error.
 * @since 2.0.0
 */
export class ChatInputRouterError<Options extends Command.Options = Command.Options> extends Error {
	/**
	 * The key identifying the error.
	 * @since 2.0.0
	 */
	public readonly key: keyof typeof ChatInputRouterErrors;

	/**
	 * The command that was being processed when the error was thrown.
	 * @since 2.0.0
	 */
	public readonly command: Command<Options>;

	/**
	 * The subcommand group that was being processed when the error was thrown, if any.
	 * @since 2.0.0
	 */
	public readonly group: APIApplicationCommandSubcommandGroupOption | null;

	/**
	 * The subcommand that was being processed when the error was thrown, if any.
	 * @since 2.0.0
	 */
	public readonly subcommand: APIApplicationCommandSubcommandOption | null;

	public constructor(
		key: keyof typeof ChatInputRouterErrors,
		command: Command<Options>,
		group?: APIApplicationCommandSubcommandGroupOption | null,
		subcommand?: APIApplicationCommandSubcommandOption | null
	) {
		super(ChatInputRouterErrors[key](command.name, group?.name ?? '', subcommand?.name ?? ''));
		this.key = key;
		this.command = command;
		this.group = group ?? null;
		this.subcommand = subcommand ?? null;
	}

	/**
	 * The path of the command that was being processed when the error was thrown.
	 * @since 2.0.0
	 */
	public get path() {
		return `${this.command.name}${this.group ? `/${this.group.name}` : ''}${this.subcommand ? `/${this.subcommand.name}` : ''}`;
	}
}

export const ChatInputRouterErrors = {
	DuplicatedSubcommandGroup: (command: string, subcommandGroup: string) =>
		`Duplicated subcommand group named '${subcommandGroup}' in command '${command}'`,
	DuplicatedSubcommand: (command: string, subcommandGroup: string, subcommand: string) =>
		`Duplicated subcommand named '${subcommand}' in subcommand group '${subcommandGroup}' in command '${command}'`,
	SubcommandGroupLinkInvalid: (command: string, subcommandGroup: string) =>
		`Subcommand group named '${subcommandGroup}' in command '${command}' is not linked to a method`,
	SubcommandLinkInvalid: (command: string, subcommandGroup: string, subcommand: string) =>
		`Subcommand named '${subcommand}' ${
			subcommandGroup ? `in subcommand group '${subcommandGroup}' ` : ''
		}in command '${command}' is not linked to a method`
} as const;

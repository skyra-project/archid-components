import { isFunction } from '@sapphire/utilities';
import type { APIApplicationCommandSubcommandOption } from 'discord-api-types/v10';
import { ChatInputRouterError } from '../../errors/ChatInputRouterError';
import type { Command } from '../../structures/Command.js';
import type { CommandRouterSubcommandGroup } from './CommandRouterSubcommandGroup';

/**
 * Represents a subcommand in a command router.
 *
 * @template Options - The options type for the command.
 * @internal
 */
export class CommandRouterSubcommand<Options extends Command.Options = Command.Options> {
	#subcommandMapping: string | null = null;

	/**
	 * Checks if the subcommand is a subcommand group.
	 *
	 * @returns True if the subcommand is a subcommand group, false otherwise.
	 */
	public isSubcommandGroup(): this is CommandRouterSubcommandGroup {
		return false;
	}

	/**
	 * Checks if the subcommand is a subcommand.
	 *
	 * @returns True if the subcommand is a subcommand, false otherwise.
	 */
	public isSubcommand(): this is CommandRouterSubcommand {
		return true;
	}

	/**
	 * Throws an error indicating that the subcommand is a subcommand group.
	 *
	 * @throws Error - Cannot assert subcommand on a subcommand group.
	 */
	public assertSubcommandGroup(): never {
		throw new Error('Cannot assert subcommand on a subcommand group');
	}

	/**
	 * Asserts that the subcommand is a subcommand.
	 *
	 * @returns The current subcommand instance.
	 */
	public assertSubcommand(): this {
		return this;
	}

	/**
	 * Gets the subcommand mapping.
	 *
	 * @returns The subcommand mapping.
	 */
	public getSubcommandMapping(): string | null {
		return this.#subcommandMapping;
	}

	/**
	 * Sets the subcommand mapping.
	 *
	 * @param command - The command instance.
	 * @param subcommand - The subcommand option.
	 * @param method - The method name.
	 * @returns The current subcommand instance.
	 * @throws ChatInputRouterError - Throws an error if the method is not a function.
	 */
	public setSubcommandMapping(command: Command<Options>, subcommand: APIApplicationCommandSubcommandOption, method: string) {
		if (!isFunction(Reflect.get(command, method))) {
			throw new ChatInputRouterError('SubcommandLinkInvalid', command, null, subcommand);
		}

		this.#subcommandMapping = method;
		return this;
	}
}

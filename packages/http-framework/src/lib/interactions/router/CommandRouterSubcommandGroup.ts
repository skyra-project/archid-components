import { Collection } from '@discordjs/collection';
import { isFunction } from '@sapphire/utilities';
import type { APIApplicationCommandSubcommandGroupOption, APIApplicationCommandSubcommandOption } from 'discord-api-types/v10';
import { ChatInputRouterError } from '../../errors/ChatInputRouterError';
import type { Command } from '../../structures/Command.js';
import type { CommandRouterSubcommand } from './CommandRouterSubcommand';

/**
 * Represents a subcommand group in a command router.
 *
 * @template Options - The options type for the command.
 * @internal
 */
export class CommandRouterSubcommandGroup<Options extends Command.Options = Command.Options> {
	#subcommandGroupMapping: string | null = null;
	#subcommandMapping = new Collection<string, string>();

	/**
	 * Checks if this instance is a subcommand group.
	 *
	 * @returns True if this instance is a subcommand group, false otherwise.
	 */
	public isSubcommandGroup(): this is CommandRouterSubcommandGroup {
		return true;
	}

	/**
	 * Checks if this instance is a subcommand.
	 *
	 * @returns True if this instance is a subcommand, false otherwise.
	 */
	public isSubcommand(): this is CommandRouterSubcommand {
		return false;
	}

	/**
	 * Asserts that this instance is a subcommand group.
	 *
	 * @returns The current instance.
	 */
	public assertSubcommandGroup(): this {
		return this;
	}

	/**
	 * Throws an error indicating that this instance cannot be asserted as a subcommand.
	 * @throws Error - An error indicating that subcommand cannot be asserted on a subcommand group.
	 */
	public assertSubcommand(): never {
		throw new Error('Cannot assert subcommand on a subcommand group');
	}

	/**
	 * Gets the subcommand group mapping.
	 *
	 * @returns The subcommand group mapping.
	 */
	public getSubcommandGroupMapping(): string | null {
		return this.#subcommandGroupMapping;
	}

	/**
	 * Gets the subcommand mapping for the specified subcommand.
	 *
	 * @param subcommand - The name of the subcommand.
	 * @returns The subcommand mapping.
	 */
	public getSubcommandMapping(subcommand: string): string | null {
		return this.#subcommandMapping.get(subcommand) ?? null;
	}

	/**
	 * Sets the subcommand group mapping.
	 *
	 * @param command - The command instance.
	 * @param group - The subcommand group option.
	 * @param method - The method name.
	 * @returns The current instance.
	 * @throws ChatInputRouterError - If the method is not a function on the command instance.
	 */
	public setSubcommandGroupMapping(command: Command<Options>, group: APIApplicationCommandSubcommandGroupOption, method: string) {
		if (!isFunction(Reflect.get(command, method))) {
			throw new ChatInputRouterError('SubcommandGroupLinkInvalid', command, group, null);
		}

		this.#subcommandGroupMapping = method;
		return this;
	}

	/**
	 * Sets the subcommand mapping.
	 *
	 * @param command - The command instance.
	 * @param group - The subcommand group option.
	 * @param subcommand - The subcommand option.
	 * @param method - The method name.
	 * @returns The current instance.
	 * @throws ChatInputRouterError - If the method is not a function on the command instance.
	 */
	public setSubcommandMapping(
		command: Command<Options>,
		group: APIApplicationCommandSubcommandGroupOption,
		subcommand: APIApplicationCommandSubcommandOption,
		method: string
	) {
		if (!isFunction(Reflect.get(command, method))) {
			throw new ChatInputRouterError('SubcommandLinkInvalid', command, group, subcommand);
		}

		this.#subcommandMapping.set(subcommand.name, method);
		return this;
	}
}

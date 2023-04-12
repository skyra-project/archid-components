import type { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v10';
import type { Command } from '../../structures/Command.js';
import { normalizeContextMenuCommand, type ContextMenuCommandDataResolvable } from '../../utils/normalizeInput.js';
import { link } from '../shared/link.js';
import { contextMenuCommandRegistry } from './shared.js';

/**
 * Registers a user command.
 * @param data The command to register.
 * @example
 * ```typescript
 * export class UserCommand extends Command {
 * 	(at)RegisterUserCommand(createData())
 * 	public run(interaction: Command.UserInteraction, data: TransformedArguments.User) {
 * 		// ...
 * 	}
 * }
 * ```
 * @returns A method decorator function, does not override the method.
 */
export function RegisterUserCommand(
	data: ContextMenuCommandDataResolvable | ((builder: ContextMenuCommandBuilder) => ContextMenuCommandDataResolvable)
) {
	const builtData = normalizeContextMenuCommand(data, ApplicationCommandType.User);

	return function decorate(target: Command, method: string) {
		const commands = contextMenuCommandRegistry.ensure(target.constructor as typeof Command, () => []);
		commands.push(link(builtData, method));
	};
}

/**
 * Registers a message command.
 * @param data The command to register.
 * @example
 * ```typescript
 * export class UserCommand extends Command {
 * 	(at)RegisterMessageCommand(createData())
 * 	public run(interaction: Command.MessageInteraction, data: TransformedArguments.Message) {
 * 		// ...
 * 	}
 * }
 * ```
 * @returns A method decorator function, does not override the method.
 */
export function RegisterMessageCommand(
	data: ContextMenuCommandDataResolvable | ((builder: ContextMenuCommandBuilder) => ContextMenuCommandDataResolvable)
) {
	const builtData = normalizeContextMenuCommand(data, ApplicationCommandType.Message);

	return function decorate(target: Command, method: string) {
		const commands = contextMenuCommandRegistry.ensure(target.constructor as typeof Command, () => []);
		commands.push(link(builtData, method));
	};
}

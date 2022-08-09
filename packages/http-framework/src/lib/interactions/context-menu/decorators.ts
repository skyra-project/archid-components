import type { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v10';
import type { Command } from '../../structures/Command';
import { normalizeContextMenuCommand } from '../../utils/normalizeInput';
import { link } from '../shared/link';
import { contextMenuCommandRegistry, type ContextMenuOptions } from './shared';

/**
 * Registers a user command.
 * @param command The command to register.
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
	command: ContextMenuOptions | ContextMenuCommandBuilder | ((builder: ContextMenuCommandBuilder) => ContextMenuCommandBuilder)
) {
	const builtData = normalizeContextMenuCommand(command, ApplicationCommandType.User);

	return function decorate(target: Command, method: string) {
		const commands = contextMenuCommandRegistry.ensure(target.constructor as typeof Command, () => []);
		commands.push(link(builtData, method));
	};
}

/**
 * Registers a message command.
 * @param command The command to register.
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
	command: ContextMenuOptions | ContextMenuCommandBuilder | ((builder: ContextMenuCommandBuilder) => ContextMenuCommandBuilder)
) {
	const builtData = normalizeContextMenuCommand(command, ApplicationCommandType.Message);

	return function decorate(target: Command, method: string) {
		const commands = contextMenuCommandRegistry.ensure(target.constructor as typeof Command, () => []);
		commands.push(link(builtData, method));
	};
}

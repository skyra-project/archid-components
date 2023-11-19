import { container } from '@sapphire/pieces';
import { ApplicationCommandType } from 'discord-api-types/v10';
import type { Command } from '../../structures/Command.js';
import type { ContextMenuCommandResolver } from './ContextMenuCommandResolver.js';

function ensureContextMenuCommandResolver(target: typeof Command<Command.Options>): ContextMenuCommandResolver {
	return container.applicationCommandRegistry.ensure(target).makeContextMenu();
}

/**
 * Registers a user command.
 *
 * @template Options - The options type for the command.
 * @param data - The command to register.
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
export function RegisterUserCommand<Options extends Command.Options = Command.Options>(data: ContextMenuCommandResolver.CommandData) {
	return function decorate(target: Command<Options>, method: string) {
		ensureContextMenuCommandResolver(target.constructor as typeof Command).setCommand(data, ApplicationCommandType.User, method);
	};
}

/**
 * Registers a message command.
 *
 * @template Options - The options type for the command.
 * @param data - The command to register.
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
export function RegisterMessageCommand<Options extends Command.Options = Command.Options>(data: ContextMenuCommandResolver.CommandData) {
	return function decorate(target: Command<Options>, method: string) {
		ensureContextMenuCommandResolver(target.constructor as typeof Command).setCommand(data, ApplicationCommandType.Message, method);
	};
}

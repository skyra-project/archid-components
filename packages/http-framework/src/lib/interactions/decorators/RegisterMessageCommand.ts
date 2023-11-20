import { ApplicationCommandType } from 'discord-api-types/v10';
import type { Command } from '../../structures/Command';
import type { ContextMenuCommandResolver } from '../resolvers/ContextMenuCommandResolver';
import { ensureContextMenuCommandResolver } from './_shared';

/**
 * Registers a message command.
 *
 * @template Options - The options type for the command.
 * @param data - The command to register.
 * @returns A method decorator function, does not override the method.
 * @example
 * ```typescript
 * export class UserCommand extends Command {
 * 	(at)RegisterMessageCommand(createData())
 * 	public run(interaction: Command.MessageInteraction, data: TransformedArguments.Message) {
 * 		// ...
 * 	}
 * }
 * ```
 */
export function RegisterMessageCommand<Options extends Command.Options = Command.Options>(data: ContextMenuCommandResolver.CommandData) {
	return function decorate(target: Command<Options>, method: string) {
		ensureContextMenuCommandResolver(target.constructor as typeof Command).setCommand(data, ApplicationCommandType.Message, method);
	};
}

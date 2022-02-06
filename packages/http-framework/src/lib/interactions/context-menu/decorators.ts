import { ApplicationCommandType } from 'discord-api-types/v9';
import type { Command } from '../../structures/Command';
import { link } from '../shared/link';
import { contextMenuCommandRegistry, type ContextMenuOptions } from './shared';

export function RegisterUserCommand(data: ContextMenuOptions) {
	return function decorate(target: Command, method: string) {
		const commands = contextMenuCommandRegistry.ensure(target.constructor as typeof Command, () => []);
		commands.push(link({ type: ApplicationCommandType.User, ...data }, method));
	};
}

export function RegisterMessageCommand(data: ContextMenuOptions) {
	return function decorate(target: Command, method: string) {
		const commands = contextMenuCommandRegistry.ensure(target.constructor as typeof Command, () => []);
		commands.push(link({ type: ApplicationCommandType.Message, ...data }, method));
	};
}

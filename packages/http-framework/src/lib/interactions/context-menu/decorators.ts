import type { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';
import type { Command } from '../../structures/Command';
import { normalizeContextMenuCommand } from '../../utils/normalizeInput';
import { link } from '../shared/link';
import { contextMenuCommandRegistry, type ContextMenuOptions } from './shared';

export function RegisterUserCommand(
	command: ContextMenuOptions | ContextMenuCommandBuilder | ((builder: ContextMenuCommandBuilder) => ContextMenuCommandBuilder)
) {
	const builtData = normalizeContextMenuCommand(command);

	return function decorate(target: Command, method: string) {
		const commands = contextMenuCommandRegistry.ensure(target.constructor as typeof Command, () => []);
		commands.push(link({ type: ApplicationCommandType.User, ...builtData }, method));
	};
}

export function RegisterMessageCommand(
	command: ContextMenuOptions | ContextMenuCommandBuilder | ((builder: ContextMenuCommandBuilder) => ContextMenuCommandBuilder)
) {
	const builtData = normalizeContextMenuCommand(command);

	return function decorate(target: Command, method: string) {
		const commands = contextMenuCommandRegistry.ensure(target.constructor as typeof Command, () => []);
		commands.push(link({ type: ApplicationCommandType.Message, ...builtData }, method));
	};
}

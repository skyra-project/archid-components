import { SlashCommandSubcommandBuilder } from '@discordjs/builders';
import { container, VirtualPath } from '@sapphire/pieces';
import type { Constructor } from '@sapphire/utilities';
import { applicationCommandRegistry, type Command } from '../../src';

export function buildSubcommand(name: string, description: string) {
	return new SlashCommandSubcommandBuilder() //
		.setName(name)
		.setDescription(description);
}

export function getAndDelete<Options extends Command.Options>(command: typeof Command<Options>) {
	const entry = applicationCommandRegistry.get(command);
	expect(entry).toBeDefined();

	applicationCommandRegistry.delete(command);
	return entry!;
}

export function makeCommand<Options extends Command.Options>(CommandClass: Constructor<Command<Options>>): Command<Options> {
	return new CommandClass({ name: 'test-command', path: VirtualPath, root: VirtualPath, store: container.stores.get('commands') });
}

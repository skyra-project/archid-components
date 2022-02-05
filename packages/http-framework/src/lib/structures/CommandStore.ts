import { Store } from '@sapphire/pieces';
import { Command } from './Command';

export class CommandStore extends Store<Command> {
	public constructor() {
		super(Command, { name: 'commands' });
	}
}

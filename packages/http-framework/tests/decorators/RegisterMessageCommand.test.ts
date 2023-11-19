import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType, type RESTPostAPIContextMenuApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { Command, RegisterMessageCommand, type ApplicationCommandRegistryEntry } from '../../src';
import { getAndDelete, makeCommand } from '../util/util';

describe('RegisterMessageCommand', () => {
	function validate(entry: ApplicationCommandRegistryEntry) {
		expect(entry.chatInput).toBeNull();
		expect(entry.contextMenu).toHaveLength(1);

		const json: RESTPostAPIContextMenuApplicationCommandsJSONBody = {
			name: 'quote',
			type: ApplicationCommandType.Message
		};
		expect(entry.toJSON()).toEqual([json]);
		expect(entry.contextMenu[0].toJSON()).toEqual(json);
		return entry;
	}

	test('GIVEN new instance of ContextMenuCommandBuilder THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterMessageCommand(new ContextMenuCommandBuilder().setName('quote').setType(ApplicationCommandType.Message))
			public runQuote(interaction: Command.MessageInteraction) {
				return interaction.reply({ content: 'Some content' });
			}
		}

		validate(getAndDelete(UserCommand));
	});

	test('GIVEN ContextMenuCommandBuilder callback THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterMessageCommand((builder) => builder.setName('quote').setType(ApplicationCommandType.Message))
			public runQuote(interaction: Command.MessageInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		validate(getAndDelete(UserCommand));
	});

	test('GIVEN command with raw object THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterMessageCommand({ name: 'quote' })
			public runQuote(interaction: Command.MessageInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		validate(getAndDelete(UserCommand));
	});

	describe('lazy', () => {
		test('GIVEN a callback THEN calls the callback on construction', () => {
			const cb = vi.fn((builder: ContextMenuCommandBuilder) => builder.setName('quote').setType(ApplicationCommandType.Message));

			class UserCommand extends Command {
				@RegisterMessageCommand(cb)
				public runQuote(interaction: Command.MessageInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			expect(cb).not.toHaveBeenCalled();

			const command = makeCommand(UserCommand);
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb).toHaveBeenCalledWith(expect.any(ContextMenuCommandBuilder));
			expect(command.registry).not.toBeNull();
		});
	});
});

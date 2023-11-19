import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType, type RESTPostAPIContextMenuApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { ApplicationCommandRegistryEntry, Command, RegisterUserCommand } from '../../src';
import { getAndDelete, makeCommand } from '../util/util';

describe('RegisterUserCommand', () => {
	function validate(entry: ApplicationCommandRegistryEntry) {
		expect(entry.chatInput).toBeNull();
		expect(entry.contextMenu).toHaveLength(1);

		const json: RESTPostAPIContextMenuApplicationCommandsJSONBody = {
			name: 'name',
			type: ApplicationCommandType.User
		};
		expect(entry.toJSON()).toEqual([json]);
		expect(entry.contextMenu[0].toJSON()).toEqual(json);
		return entry;
	}

	test('GIVEN new instance of ContextMenuCommandBuilder THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterUserCommand(new ContextMenuCommandBuilder().setName('name').setType(ApplicationCommandType.User))
			public runName(interaction: Command.UserInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		validate(getAndDelete(UserCommand));
	});

	test('GIVEN ContextMenuCommandBuilder callback THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterUserCommand((builder) => builder.setName('name'))
			public runName(interaction: Command.UserInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		validate(getAndDelete(UserCommand));
	});

	test('GIVEN command with raw object THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterUserCommand({ name: 'name' })
			public runName(interaction: Command.UserInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		validate(getAndDelete(UserCommand));
	});

	describe('lazy', () => {
		test('GIVEN a callback THEN calls the callback on construction', () => {
			const cb = vi.fn((builder: ContextMenuCommandBuilder) => builder.setName('name').setType(ApplicationCommandType.User));

			class UserCommand extends Command {
				@RegisterUserCommand(cb)
				public runName(interaction: Command.UserInteraction) {
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

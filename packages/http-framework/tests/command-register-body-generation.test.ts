import { SlashCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandOptionType, ApplicationCommandType, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v9';
import { chatInputCommandRegistry, Command, RegisterCommand, RegisterSubCommand } from '../src';
import { buildSubcommand } from './util/util';

describe('User Context Menu Command', () => {
	// Should be straightforward because there are no subcommands and no options

	test('GIVEN new instance of ContextMenuCommandBuilder THEN returns expected body', () => {
		// Use "new ContextMenuCommandBuilder()" to create a new instance of SlashCommandBuilder
		// Then expect the body
	});

	test('GIVEN ContextMenuCommandBuilder callback THEN returns expected body', () => {
		// Use (builder) => builder.setName(...) etc
	});

	test('GIVEN command with raw object THEN returns expected body', () => {
		// Just a JSON object
	});
});

describe('Message Context Menu Command', () => {
	// Should be straightforward because there are no subcommands and no options

	test('GIVEN new instance of ContextMenuCommandBuilder THEN returns expected body', () => {
		// Use "new ContextMenuCommandBuilder()" to create a new instance of SlashCommandBuilder
		// Then expect the body
	});

	test('GIVEN ContextMenuCommandBuilder callback THEN returns expected body', () => {
		// Use (builder) => builder.setName(...) etc
	});

	test('GIVEN command with raw object THEN returns expected body', () => {
		// Just a JSON object
	});
});

describe('Chat Input Commands', () => {
	afterEach(() => chatInputCommandRegistry.clear());

	describe('Command without options', () => {
		test('GIVEN command without options THEN returns expected body', () => {
			@RegisterCommand({ name: 'ping', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				public override chatInputRun(): Command.Response {
					return this.message({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toStrictEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				default_permission: undefined,
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: undefined,
				type: ApplicationCommandType.ChatInput
			});
		});
	});

	describe('Command using SlashCommandBuilder', () => {
		test('GIVEN new instance of SlashCommandBuilder THEN returns expected body', () => {
			@RegisterCommand(new SlashCommandBuilder().setName('ping').setDescription('Runs a network connection test with me'))
			class UserCommand extends Command {
				public override chatInputRun(): Command.Response {
					return this.message({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toStrictEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				default_permission: undefined,
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [],
				type: ApplicationCommandType.ChatInput
			});
		});

		test('GIVEN SlashCommandBuilder callback THEN returns expected body', () => {
			@RegisterCommand((builder) => builder.setName('ping').setDescription('Runs a network connection test with me'))
			class UserCommand extends Command {
				public override chatInputRun(): Command.Response {
					return this.message({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toStrictEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				default_permission: undefined,
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [],
				type: ApplicationCommandType.ChatInput
			});
		});
	});

	describe('Command with options', () => {
		test('GIVEN all option types THEN returns expected body', () => {
			// Test where the command has all different command options. That way we can test all the different types in the same test.
		});

		test('GIVEN option with autocomplete THEN returns expected body', () => {
			// Test where the command has an autocomplete option.
		});

		test('GIVEN required string option THEN returns expected body', () => {
			// Test where the command has a required string option.
		});

		test('GIVEN string, integer and number choices THEN returns expected body', () => {
			// Test where the command has a string choices, integer choices and number choices options.
		});
	});

	describe('Command with subcommands', () => {
		test('GIVEN command with a single subcommand THEN returns expected body', () => {
			@RegisterCommand({ name: 'ping', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				@RegisterSubCommand((builder) => builder.setName('latency').setDescription('Runs a network latency test with me'))
				public latency(): Command.Response {
					return this.message({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toStrictEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				default_permission: undefined,
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [
					{
						name: 'latency',
						description: 'Runs a network latency test with me',
						type: ApplicationCommandOptionType.Subcommand,
						options: []
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});

		test('GIVEN command with multiple subcommands THEN returns expected body', () => {
			@RegisterCommand({ name: 'ping', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				@RegisterSubCommand((builder) => builder.setName('latency').setDescription('Runs a network latency test with me'))
				public latency(): Command.Response {
					return this.message({ content: 'Pong!' });
				}

				@RegisterSubCommand((builder) => builder.setName('dashboard').setDescription('Runs a network latency test with my dashboard'))
				public dashboard(): Command.Response {
					return this.message({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toStrictEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				default_permission: undefined,
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [
					{
						name: 'latency',
						description: 'Runs a network latency test with me',
						type: ApplicationCommandOptionType.Subcommand,
						options: []
					},
					{
						name: 'dashboard',
						description: 'Runs a network latency test with my dashboard',
						type: ApplicationCommandOptionType.Subcommand,
						options: []
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});
	});

	describe('Command with subcommand group and subcommands', () => {
		test('GIVEN command with single subcommand group and single subcommand THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder
					.setName('ping')
					.setDescription('Runs a network connection test with me')
					.addSubcommandGroup((group) => group.setName('network').setDescription('Network tests'))
			)
			class UserCommand extends Command {
				@RegisterSubCommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'network')
				public latency(): Command.Response {
					return this.message({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toStrictEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				default_permission: undefined,
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [
					{
						name: 'network',
						description: 'Network tests',
						type: ApplicationCommandOptionType.SubcommandGroup,
						options: [
							{
								name: 'latency',
								description: 'Runs a network latency test with me',
								type: ApplicationCommandOptionType.Subcommand,
								options: []
							}
						]
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});

		test('GIVEN command with single subcommand group and multiple subcommands THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder
					.setName('ping')
					.setDescription('Runs a network connection test with me')
					.addSubcommandGroup((group) => group.setName('network').setDescription('Network tests'))
			)
			class UserCommand extends Command {
				@RegisterSubCommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'network')
				public latency(): Command.Response {
					return this.message({ content: 'Pong!' });
				}

				@RegisterSubCommand(buildSubcommand('dashboard', 'Runs a network latency test with my dashboard'), 'network')
				public dashboard(): Command.Response {
					return this.message({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toStrictEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				default_permission: undefined,
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [
					{
						name: 'network',
						description: 'Network tests',
						type: ApplicationCommandOptionType.SubcommandGroup,
						options: [
							{
								name: 'latency',
								description: 'Runs a network latency test with me',
								type: ApplicationCommandOptionType.Subcommand,
								options: []
							},
							{
								name: 'dashboard',
								description: 'Runs a network latency test with my dashboard',
								type: ApplicationCommandOptionType.Subcommand,
								options: []
							}
						]
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});
	});

	describe('Command with multiple subcommand groups and subcommands', () => {
		test('GIVEN command with multiple subcommand groups and single subcommand THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder
					.setName('ping')
					.setDescription('Runs a network connection test with me')
					.addSubcommandGroup((group) => group.setName('discord').setDescription('Discord network tests'))
					.addSubcommandGroup((group) => group.setName('dashboard').setDescription('Dashboard network tests'))
			)
			class UserCommand extends Command {
				@RegisterSubCommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'discord')
				public latency(): Command.Response {
					return this.message({ content: 'Pong!' });
				}

				@RegisterSubCommand(buildSubcommand('latency', 'Runs a network latency test with my dashboard'), 'dashboard')
				public dashboard(): Command.Response {
					return this.message({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toStrictEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				default_permission: undefined,
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [
					{
						name: 'discord',
						description: 'Discord network tests',
						type: ApplicationCommandOptionType.SubcommandGroup,
						options: [
							{
								name: 'latency',
								description: 'Runs a network latency test with me',
								type: ApplicationCommandOptionType.Subcommand,
								options: []
							}
						]
					},
					{
						name: 'dashboard',
						description: 'Dashboard network tests',
						type: ApplicationCommandOptionType.SubcommandGroup,
						options: [
							{
								name: 'latency',
								description: 'Runs a network latency test with my dashboard',
								type: ApplicationCommandOptionType.Subcommand,
								options: []
							}
						]
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});

		test('GIVEN command with multiple subcommand groups and multiple subcommands THEN returns expected body', () => {
			// Test with multiple subcommand groups and multiple subcommands
		});
	});
});

import { ContextMenuCommandBuilder, SlashCommandBuilder } from '@discordjs/builders';
import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	type RESTPostAPIContextMenuApplicationCommandsJSONBody
} from 'discord-api-types/v10';
import {
	Command,
	RegisterCommand,
	RegisterMessageCommand,
	RegisterSubCommand,
	RegisterUserCommand,
	chatInputCommandRegistry,
	contextMenuCommandRegistry
} from '../src/index.js';
import { buildSubcommand } from './util/util.js';

describe('User Context Menu Command', () => {
	afterEach(() => contextMenuCommandRegistry.clear());

	test('GIVEN new instance of ContextMenuCommandBuilder THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterUserCommand(new ContextMenuCommandBuilder().setName('name').setType(ApplicationCommandType.User))
			public userName(interaction: Command.UserInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		const entries = contextMenuCommandRegistry.get(UserCommand);
		expect(entries).toBeDefined();
		expect(entries).toHaveLength(1);
		expect(entries![0]).toEqual<RESTPostAPIContextMenuApplicationCommandsJSONBody>({
			name: 'name',
			type: ApplicationCommandType.User
		});
	});

	test('GIVEN ContextMenuCommandBuilder callback THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterUserCommand((builder) => builder.setName('name').setType(ApplicationCommandType.User))
			public userName(interaction: Command.UserInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		const entries = contextMenuCommandRegistry.get(UserCommand);
		expect(entries).toBeDefined();
		expect(entries).toHaveLength(1);
		expect(entries![0]).toEqual<RESTPostAPIContextMenuApplicationCommandsJSONBody>({
			name: 'name',
			type: ApplicationCommandType.User
		});
	});

	test('GIVEN command with raw object THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterUserCommand({ name: 'name' })
			public userName(interaction: Command.UserInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		const entries = contextMenuCommandRegistry.get(UserCommand);
		expect(entries).toBeDefined();
		expect(entries).toHaveLength(1);
		expect(entries![0]).toEqual<RESTPostAPIContextMenuApplicationCommandsJSONBody>({
			name: 'name',
			type: ApplicationCommandType.User
		});
	});
});

describe('Message Context Menu Command', () => {
	afterEach(() => contextMenuCommandRegistry.clear());

	test('GIVEN new instance of ContextMenuCommandBuilder THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterMessageCommand(new ContextMenuCommandBuilder().setName('quote').setType(ApplicationCommandType.Message))
			public userName(interaction: Command.MessageInteraction) {
				return interaction.reply({ content: 'Some content' });
			}
		}

		const entries = contextMenuCommandRegistry.get(UserCommand);
		expect(entries).toBeDefined();
		expect(entries).toHaveLength(1);
		expect(entries![0]).toEqual<RESTPostAPIContextMenuApplicationCommandsJSONBody>({
			name: 'quote',
			type: ApplicationCommandType.Message
		});
	});

	test('GIVEN ContextMenuCommandBuilder callback THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterMessageCommand((builder) => builder.setName('quote').setType(ApplicationCommandType.Message))
			public userName(interaction: Command.MessageInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		const entries = contextMenuCommandRegistry.get(UserCommand);
		expect(entries).toBeDefined();
		expect(entries).toHaveLength(1);
		expect(entries![0]).toEqual<RESTPostAPIContextMenuApplicationCommandsJSONBody>({
			name: 'quote',
			type: ApplicationCommandType.Message
		});
	});

	test('GIVEN command with raw object THEN returns expected body', () => {
		class UserCommand extends Command {
			@RegisterMessageCommand({ name: 'quote' })
			public userName(interaction: Command.MessageInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		const entries = contextMenuCommandRegistry.get(UserCommand);
		expect(entries).toBeDefined();
		expect(entries).toHaveLength(1);
		expect(entries![0]).toEqual<RESTPostAPIContextMenuApplicationCommandsJSONBody>({
			name: 'quote',
			type: ApplicationCommandType.Message
		});
	});
});

describe('Chat Input Commands', () => {
	afterEach(() => chatInputCommandRegistry.clear());

	describe('Command without options', () => {
		test('GIVEN command without options THEN returns expected body', () => {
			@RegisterCommand({ name: 'ping', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				name: 'ping',
				description: 'Runs a network connection test with me',
				type: ApplicationCommandType.ChatInput
			});
		});
	});

	describe('Command using SlashCommandBuilder', () => {
		test('GIVEN new instance of SlashCommandBuilder THEN returns expected body', () => {
			@RegisterCommand(new SlashCommandBuilder().setName('ping').setDescription('Runs a network connection test with me'))
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				description: 'Runs a network connection test with me',
				name: 'ping',
				options: [],
				type: ApplicationCommandType.ChatInput
			});
		});

		test('GIVEN SlashCommandBuilder callback THEN returns expected body', () => {
			@RegisterCommand((builder) => builder.setName('ping').setDescription('Runs a network connection test with me'))
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [],
				type: ApplicationCommandType.ChatInput
			});
		});
	});

	describe('Command with options', () => {
		test('GIVEN all option types THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder //
					.setName('test')
					.setDescription('Tests all options')
					.addBooleanOption((option) => option.setName('boolean').setDescription('A boolean'))
					.addChannelOption((option) => option.setName('channel').setDescription('A channel'))
					.addIntegerOption((option) => option.setName('integer').setDescription('An integer'))
					.addMentionableOption((option) => option.setName('mentionable').setDescription('A mentionable'))
					.addNumberOption((option) => option.setName('number').setDescription('A number'))
					.addRoleOption((option) => option.setName('role').setDescription('A role'))
					.addStringOption((option) => option.setName('string').setDescription('A string'))
					.addUserOption((option) => option.setName('user').setDescription('A user'))
			)
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				name: 'test',
				description: 'Tests all options',
				options: [
					{
						description: 'A boolean',
						name: 'boolean',
						required: false,
						type: ApplicationCommandOptionType.Boolean
					},
					{
						description: 'A channel',
						name: 'channel',
						required: false,
						type: ApplicationCommandOptionType.Channel
					},
					{
						description: 'An integer',
						name: 'integer',
						required: false,
						type: ApplicationCommandOptionType.Integer
					},
					{
						description: 'A mentionable',
						name: 'mentionable',
						required: false,
						type: ApplicationCommandOptionType.Mentionable
					},
					{
						description: 'A number',
						name: 'number',
						required: false,
						type: ApplicationCommandOptionType.Number
					},
					{
						description: 'A role',
						name: 'role',
						required: false,
						type: ApplicationCommandOptionType.Role
					},
					{
						description: 'A string',
						name: 'string',
						required: false,
						type: ApplicationCommandOptionType.String
					},
					{
						description: 'A user',
						name: 'user',
						required: false,
						type: ApplicationCommandOptionType.User
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});

		test('GIVEN option with autocomplete THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder //
					.setName('tag')
					.setDescription('Send a tag by name or by alias')
					.addStringOption((option) =>
						option //
							.setName('query')
							.setDescription('The name or alias of the tag to send')
							.setRequired(true)
							.setAutocomplete(true)
					)
			)
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				name: 'tag',
				description: 'Send a tag by name or by alias',
				options: [
					{
						autocomplete: true,
						description: 'The name or alias of the tag to send',
						name: 'query',
						required: true,
						type: ApplicationCommandOptionType.String
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});

		test('GIVEN required string option THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder //
					.setName('tag')
					.setDescription('Send a tag by name or by alias')
					.addStringOption((option) =>
						option //
							.setName('query')
							.setDescription('The name or alias of the tag to send')
							.setRequired(true)
					)
			)
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				name: 'tag',
				description: 'Send a tag by name or by alias',
				options: [
					{
						description: 'The name or alias of the tag to send',
						name: 'query',
						required: true,
						type: ApplicationCommandOptionType.String
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});

		test('GIVEN string, integer and number choices THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder //
					.setName('random')
					.setDescription('Does something')
					.addStringOption((option) =>
						option //
							.setName('query')
							.setDescription('A string')
							.setChoices({ name: 'foo', value: 'foo' }, { name: 'bar', value: 'bar' })
					)
					.addNumberOption((option) =>
						option //
							.setName('query')
							.setDescription('A number')
							.setChoices({ name: 'half', value: 0.5 }, { name: 'quarter', value: 0.25 })
					)
					.addIntegerOption((option) =>
						option //
							.setName('query')
							.setDescription('An integer')
							.setChoices({ name: 'one', value: 1 }, { name: 'life', value: 42 })
					)
			)
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
				name: 'random',
				description: 'Does something',
				options: [
					{
						choices: [
							{
								name: 'foo',
								value: 'foo'
							},
							{
								name: 'bar',
								value: 'bar'
							}
						],
						description: 'A string',
						name: 'query',
						required: false,
						type: ApplicationCommandOptionType.String
					},
					{
						choices: [
							{
								name: 'half',
								value: 0.5
							},
							{
								name: 'quarter',
								value: 0.25
							}
						],
						description: 'A number',
						name: 'query',
						required: false,
						type: ApplicationCommandOptionType.Number
					},
					{
						choices: [
							{
								name: 'one',
								value: 1
							},
							{
								name: 'life',
								value: 42
							}
						],
						description: 'An integer',
						name: 'query',
						required: false,
						type: ApplicationCommandOptionType.Integer
					}
				],
				type: ApplicationCommandType.ChatInput
			});
		});
	});

	describe('Command with subcommands', () => {
		test('GIVEN command with a single subcommand THEN returns expected body', () => {
			@RegisterCommand({ name: 'ping', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				@RegisterSubCommand((builder) => builder.setName('latency').setDescription('Runs a network latency test with me'))
				public latency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
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
				public latency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubCommand((builder) => builder.setName('dashboard').setDescription('Runs a network latency test with my dashboard'))
				public dashboard(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
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
				public networkLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
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
				public discordLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubCommand(buildSubcommand('dashboard', 'Runs a network latency test with my dashboard'), 'network')
				public dashboardLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
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
				public discordLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubCommand(buildSubcommand('latency', 'Runs a network latency test with my dashboard'), 'dashboard')
				public dashboardLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
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
			@RegisterCommand((builder) =>
				builder
					.setName('ping')
					.setDescription('Runs a network connection test with me')
					.addSubcommandGroup((group) => group.setName('discord').setDescription('Discord network tests'))
					.addSubcommandGroup((group) => group.setName('dashboard').setDescription('Dashboard network tests'))
			)
			class UserCommand extends Command {
				@RegisterSubCommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'discord')
				public discordLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubCommand(buildSubcommand('status', 'Checks whether or not Discord is ok'), 'discord')
				public discordStatus(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubCommand(buildSubcommand('latency', 'Runs a network latency test with my dashboard'), 'dashboard')
				public dashboardLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubCommand(buildSubcommand('status', 'Checks whether or not my dashboard is ok'), 'dashboard')
				public dashboardStatus(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = chatInputCommandRegistry.get(UserCommand);
			expect(entry).toEqual<RESTPostAPIChatInputApplicationCommandsJSONBody>({
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
							},
							{
								name: 'status',
								description: 'Checks whether or not Discord is ok',
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
							},
							{
								name: 'status',
								description: 'Checks whether or not my dashboard is ok',
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
});

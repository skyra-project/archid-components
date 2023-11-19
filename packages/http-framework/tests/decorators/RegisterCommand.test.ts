import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';
import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord-api-types/v10';
import { ApplicationCommandRegistryEntry, Command, RegisterCommand, RegisterSubcommand, RegisterSubcommandGroup } from '../../src/index.js';
import { ChatInputRouterError } from '../../src/lib/errors/ChatInputRouterError.js';
import { buildSubcommand, getAndDelete, makeCommand } from '../util/util.js';

describe('RegisterCommand', () => {
	function validate(entry: ApplicationCommandRegistryEntry) {
		expect(entry.chatInput).not.toBeNull();
		expect(entry.contextMenu).toHaveLength(0);
		return entry;
	}

	describe('lazy', () => {
		test('GIVEN a callback THEN calls the callback on construction', () => {
			const cb = vi.fn((builder: SlashCommandBuilder) => builder.setName('ping').setDescription('Runs a network connection test with me'));

			@RegisterCommand(cb)
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			expect(cb).not.toHaveBeenCalled();

			const command = makeCommand(UserCommand);
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb).toHaveBeenCalledWith(expect.any(SlashCommandBuilder));
			expect(command.registry).not.toBeNull();
		});
	});

	describe('without options', () => {
		test('GIVEN command without options THEN returns expected body', () => {
			@RegisterCommand({ name: 'ping', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
				name: 'ping',
				description: 'Runs a network connection test with me',
				type: ApplicationCommandType.ChatInput
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});
	});

	describe('without options using SlashCommandBuilder', () => {
		test.each([
			[
				'new SlashCommandBuilder instance', //
				new SlashCommandBuilder().setName('ping').setDescription('Runs a network connection test with me')
			],
			[
				'JSON version of new SlashCommandBuilder instance',
				new SlashCommandBuilder().setName('ping').setDescription('Runs a network connection test with me')
			],
			[
				'SlashCommandBuilder callback',
				(builder: SlashCommandBuilder) => builder.setName('ping').setDescription('Runs a network connection test with me')
			],
			[
				'JSON-returning SlashCommandBuilder callback',
				(builder: SlashCommandBuilder) => builder.setName('ping').setDescription('Runs a network connection test with me').toJSON()
			],
			[
				'non-returning SlashCommandBuilder callback',
				(builder: SlashCommandBuilder) => {
					builder.setName('ping').setDescription('Runs a network connection test with me');
				}
			]
		])('GIVEN %s THEN returns expected body', (_, resolvable) => {
			@RegisterCommand(resolvable)
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [],
				type: ApplicationCommandType.ChatInput
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});
	});

	describe('with options', () => {
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

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
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

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
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

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
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

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
				name: 'random',
				description: 'Does something',
				options: [
					{
						choices: [
							{ name: 'foo', value: 'foo' },
							{ name: 'bar', value: 'bar' }
						],
						description: 'A string',
						name: 'query',
						required: false,
						type: ApplicationCommandOptionType.String
					},
					{
						choices: [
							{ name: 'half', value: 0.5 },
							{ name: 'quarter', value: 0.25 }
						],
						description: 'A number',
						name: 'query',
						required: false,
						type: ApplicationCommandOptionType.Number
					},
					{
						choices: [
							{ name: 'one', value: 1 },
							{ name: 'life', value: 42 }
						],
						description: 'An integer',
						name: 'query',
						required: false,
						type: ApplicationCommandOptionType.Integer
					}
				],
				type: ApplicationCommandType.ChatInput
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});
	});

	describe('with subcommands', () => {
		test('GIVEN command with a single subcommand THEN returns expected body', () => {
			@RegisterCommand({ name: 'ping', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				@RegisterSubcommand((builder) => builder.setName('latency').setDescription('Runs a network latency test with me'))
				public latency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});

		test('GIVEN command with multiple subcommands THEN returns expected body', () => {
			@RegisterCommand({ name: 'ping', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				@RegisterSubcommand((builder) => builder.setName('latency').setDescription('Runs a network latency test with me'))
				public latency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubcommand((builder) => builder.setName('dashboard').setDescription('Runs a network latency test with my dashboard'))
				public dashboard(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});

		test('GIVEN subcommands without command THEN throws error', () => {
			class UserCommand extends Command {
				@RegisterSubcommand((builder) => builder.setName('latency').setDescription('Runs a network latency test with me'))
				public latency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			expect(() => makeCommand(UserCommand)).toThrow(new Error('Could not normalize command data'));
		});

		test.each([
			[
				'new SlashCommandBuilder instance', //
				new SlashCommandSubcommandBuilder().setName('ping').setDescription('Runs a network connection test with me')
			],
			[
				'JSON version of new SlashCommandBuilder instance',
				new SlashCommandSubcommandBuilder().setName('ping').setDescription('Runs a network connection test with me').toJSON()
			],
			[
				'SlashCommandBuilder callback',
				(builder: SlashCommandSubcommandBuilder) => builder.setName('ping').setDescription('Runs a network connection test with me')
			],
			[
				'JSON-returning SlashCommandBuilder callback',
				(builder: SlashCommandSubcommandBuilder) => builder.setName('ping').setDescription('Runs a network connection test with me').toJSON()
			],
			[
				'non-returning SlashCommandBuilder callback',
				(builder: SlashCommandSubcommandBuilder) => {
					builder.setName('ping').setDescription('Runs a network connection test with me');
				}
			]
		])('GIVEN command with %s THEN returns expected body', (_, resolvable) => {
			@RegisterCommand((builder) => builder.setName('ping').setDescription('Runs a network connection test with me'))
			class UserCommand extends Command {
				@RegisterSubcommand(resolvable)
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: 'ping',
						description: 'Runs a network connection test with me',
						options: []
					}
				],
				type: ApplicationCommandType.ChatInput
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});
	});

	describe('with subcommand groups', () => {
		test('GIVEN command with single subcommand group and single subcommand THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder
					.setName('ping')
					.setDescription('Runs a network connection test with me')
					.addSubcommandGroup((group) => group.setName('network').setDescription('Network tests'))
			)
			class UserCommand extends Command {
				@RegisterSubcommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'network')
				public networkLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});

		test('GIVEN command with single subcommand group and multiple subcommands THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder
					.setName('ping')
					.setDescription('Runs a network connection test with me')
					.addSubcommandGroup((group) => group.setName('network').setDescription('Network tests'))
			)
			class UserCommand extends Command {
				@RegisterSubcommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'network')
				public discordLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubcommand(buildSubcommand('dashboard', 'Runs a network latency test with my dashboard'), 'network')
				public dashboardLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});

		test('GIVEN command with inexistent subcommand parent THEN throws a validation error', () => {
			@RegisterCommand((builder) => builder.setName('ping').setDescription('Runs a network connection test with me'))
			class UserCommand extends Command {
				@RegisterSubcommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'network')
				public networkLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			expect(() => makeCommand(UserCommand)).toThrow(new Error(`The command 'ping' has no subcommand group named 'network'`));
		});

		test('GIVEN command with invalid subcommand parent type THEN throws a validation error', () => {
			@RegisterCommand((builder) =>
				builder
					.setName('ping')
					.setDescription('Runs a network connection test with me')
					.addBooleanOption((option) => option.setName('network').setDescription('Network tests'))
			)
			class UserCommand extends Command {
				@RegisterSubcommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'network')
				public networkLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			expect(() => makeCommand(UserCommand)).toThrow(new Error(`The command 'ping' has an option named 'network' that is not a group`));
		});

		test.each([
			[
				'new SlashCommandBuilder instance', //
				new SlashCommandSubcommandGroupBuilder().setName('ping').setDescription('Runs a network connection test with me')
			],
			[
				'JSON version of new SlashCommandBuilder instance',
				new SlashCommandSubcommandGroupBuilder().setName('ping').setDescription('Runs a network connection test with me').toJSON()
			],
			[
				'SlashCommandBuilder callback',
				(builder: SlashCommandSubcommandGroupBuilder) => builder.setName('ping').setDescription('Runs a network connection test with me')
			],
			[
				'JSON-returning SlashCommandBuilder callback',
				(builder: SlashCommandSubcommandGroupBuilder) =>
					builder.setName('ping').setDescription('Runs a network connection test with me').toJSON()
			],
			[
				'non-returning SlashCommandBuilder callback',
				(builder: SlashCommandSubcommandGroupBuilder) => {
					builder.setName('ping').setDescription('Runs a network connection test with me');
				}
			]
		])('GIVEN command with %s THEN returns expected body', (_, resolvable) => {
			@RegisterCommand((builder) => builder.setName('ping').setDescription('Runs a network connection test with me'))
			class UserCommand extends Command {
				@RegisterSubcommandGroup(resolvable)
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
				name: 'ping',
				description: 'Runs a network connection test with me',
				options: [
					{
						type: ApplicationCommandOptionType.SubcommandGroup,
						name: 'ping',
						description: 'Runs a network connection test with me',
						options: []
					}
				],
				type: ApplicationCommandType.ChatInput
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});
	});

	describe('with multiple subcommand groups and subcommands', () => {
		test('GIVEN command with multiple subcommand groups and single subcommand THEN returns expected body', () => {
			@RegisterCommand((builder) =>
				builder
					.setName('ping')
					.setDescription('Runs a network connection test with me')
					.addSubcommandGroup((group) => group.setName('discord').setDescription('Discord network tests'))
					.addSubcommandGroup((group) => group.setName('dashboard').setDescription('Dashboard network tests'))
			)
			class UserCommand extends Command {
				@RegisterSubcommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'discord')
				public discordLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubcommand(buildSubcommand('latency', 'Runs a network latency test with my dashboard'), 'dashboard')
				public dashboardLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
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
				@RegisterSubcommand(buildSubcommand('latency', 'Runs a network latency test with me'), 'discord')
				public discordLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubcommand(buildSubcommand('status', 'Checks whether or not Discord is ok'), 'discord')
				public discordStatus(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubcommand(buildSubcommand('latency', 'Runs a network latency test with my dashboard'), 'dashboard')
				public dashboardLatency(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubcommand(buildSubcommand('status', 'Checks whether or not my dashboard is ok'), 'dashboard')
				public dashboardStatus(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const entry = validate(getAndDelete(UserCommand));
			const json: RESTPostAPIChatInputApplicationCommandsJSONBody = {
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
			};
			expect(entry.toJSON()).toEqual([json]);
			expect(entry.chatInput!.toJSON()).toEqual(json);
		});
	});

	describe('edge cases', () => {
		test("GIVEN command with RegisterSubcommand's target being a property THEN throws an error", () => {
			@RegisterCommand({ name: 'network', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				@RegisterSubcommand((builder) => builder.setName('latency').setDescription('Runs a network latency test with me'))
				public networkLatency = null;
			}

			try {
				makeCommand(UserCommand);
			} catch (error) {
				expect(error).toBeInstanceOf(ChatInputRouterError);

				const casted = error as ChatInputRouterError;
				expect(casted.message).toBe("Subcommand named 'latency' in command 'test-command' is not linked to a method");
				expect(casted.key).toBe('SubcommandLinkInvalid');
				expect(casted.command).toBeInstanceOf(UserCommand);
				expect(casted.group).toBeNull();
				expect(casted.subcommand).toEqual<APIApplicationCommandSubcommandOption>({
					name: 'latency',
					description: 'Runs a network latency test with me',
					options: [],
					type: ApplicationCommandOptionType.Subcommand
				});
				expect(casted.path).toBe('test-command/latency');
				return;
			}

			throw new Error('Failed to throw');
		});

		test("GIVEN command with RegisterSubcommand's target being a property THEN throws an error", () => {
			@RegisterCommand({ name: 'network', description: 'Runs a network connection test with me' })
			class UserCommand extends Command {
				@RegisterSubcommandGroup((builder) => builder.setName('latency').setDescription('Runs a network latency test with me'))
				public networkLatency = null;
			}

			try {
				makeCommand(UserCommand);
			} catch (error) {
				expect(error).toBeInstanceOf(ChatInputRouterError);

				const casted = error as ChatInputRouterError;
				expect(casted.message).toBe("Subcommand group named 'latency' in command 'test-command' is not linked to a method");
				expect(casted.key).toBe('SubcommandGroupLinkInvalid');
				expect(casted.command).toBeInstanceOf(UserCommand);
				expect(casted.group).toEqual<APIApplicationCommandSubcommandGroupOption>({
					name: 'latency',
					description: 'Runs a network latency test with me',
					options: [],
					type: ApplicationCommandOptionType.SubcommandGroup
				});
				expect(casted.subcommand).toBeNull();
				expect(casted.path).toBe('test-command/latency');
				return;
			}

			throw new Error('Failed to throw');
		});
	});
});

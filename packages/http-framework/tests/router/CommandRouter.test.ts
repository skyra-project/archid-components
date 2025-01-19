import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIChatInputApplicationCommandInteractionData,
	type APIContextMenuInteractionData
} from 'discord-api-types/v10';
import {
	Command,
	RegisterCommand,
	RegisterMessageCommand,
	RegisterSubcommand,
	RegisterSubcommandGroup,
	RegisterUserCommand
} from '../../src/index.js';
import {
	ChatInputApplicationCommandInteractionData,
	MessageApplicationCommandInteractionData,
	UserApplicationCommandInteractionData
} from '../shared.js';
import { makeCommand } from '../util/util.js';

describe('CommandRouter', () => {
	const ChatInputInteraction: APIChatInputApplicationCommandInteractionData = {
		...ChatInputApplicationCommandInteractionData.data,
		name: 'test'
	};
	const ChatInputInteractionSubcommand: APIChatInputApplicationCommandInteractionData = {
		...ChatInputApplicationCommandInteractionData.data,
		name: 'test',
		options: [{ name: 'sub', type: ApplicationCommandOptionType.Subcommand, options: [] }]
	};
	const ChatInputInteractionSubcommandGroup: APIChatInputApplicationCommandInteractionData = {
		...ChatInputApplicationCommandInteractionData.data,
		name: 'test',
		options: [
			{
				name: 'group',
				type: ApplicationCommandOptionType.SubcommandGroup,
				options: [{ name: 'sub', type: ApplicationCommandOptionType.Subcommand, options: [] }]
			}
		]
	};
	const ChatInputInteractionOption: APIChatInputApplicationCommandInteractionData = {
		...ChatInputApplicationCommandInteractionData.data,
		name: 'test',
		options: [
			{
				name: 'group',
				type: ApplicationCommandOptionType.Boolean,
				value: true
			}
		]
	};
	const MessageInteraction: APIContextMenuInteractionData = { ...MessageApplicationCommandInteractionData.data, name: 'test' };
	const UserInteraction: APIContextMenuInteractionData = { ...UserApplicationCommandInteractionData.data, name: 'test' };

	describe('ChatInput', () => {
		test('GIVEN a plain command THEN always returns chatInputRun', () => {
			@RegisterCommand({ name: 'test', description: 'Tests' })
			class UserCommand extends Command {
				public override chatInputRun(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const command = makeCommand(UserCommand);
			expect(command.router.chatInputName).toBe('test');
			expect(command.router.contextMenuNames).toEqual([]);
			expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBeNull();
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBeNull();
			expect(command.router.routeChatInputInteraction(ChatInputInteractionOption)).toBe('chatInputRun');
			expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBeNull();
			expect(command.router.routeContextMenuInteraction(UserInteraction)).toBeNull();
		});

		test('GIVEN a subcommand THEN returns the subcommand linked method', () => {
			@RegisterCommand({ name: 'test', description: 'Tests' })
			class UserCommand extends Command {
				@RegisterSubcommand({ name: 'sub', description: 'Tests a subcommand' })
				public runSubcommand(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const command = makeCommand(UserCommand);
			expect(command.router.chatInputName).toBe('test');
			expect(command.router.contextMenuNames).toEqual([]);
			expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBe('runSubcommand');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBeNull();
			expect(command.router.routeChatInputInteraction(ChatInputInteractionOption)).toBe('chatInputRun');
			expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBeNull();
			expect(command.router.routeContextMenuInteraction(UserInteraction)).toBeNull();
		});

		test('GIVEN a subcommand in a group THEN returns the subcommand linked method', () => {
			@RegisterCommand({ name: 'test', description: 'Tests' })
			class UserCommand extends Command {
				@RegisterSubcommandGroup({ name: 'subs', description: 'Tests a subcommand group' })
				@RegisterSubcommand({ name: 'sub', description: 'Tests a subcommand' }, 'subs')
				public runSubs(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubcommandGroup({ name: 'group', description: 'Tests a subcommand group' })
				public runSubcommandGroup(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterSubcommand({ name: 'sub', description: 'Tests a subcommand' }, 'group')
				public runSubcommand(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const command = makeCommand(UserCommand);
			expect(command.router.chatInputName).toBe('test');
			expect(command.router.contextMenuNames).toEqual([]);
			expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBeNull();
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBe('runSubcommand');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionOption)).toBe('chatInputRun');
			expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBeNull();
			expect(command.router.routeContextMenuInteraction(UserInteraction)).toBeNull();
		});

		test('GIVEN an unlinked subcommand in a group THEN returns the subcommand linked method', () => {
			@RegisterCommand({ name: 'test', description: 'Tests' })
			class UserCommand extends Command {
				@RegisterSubcommandGroup((group) =>
					group
						.setName('group')
						.setDescription('Tests a subcommand group')
						.addSubcommand((subcommand) => subcommand.setName('sub').setDescription('Tests a subcommand'))
				)
				public runSubcommandGroup(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const command = makeCommand(UserCommand);
			expect(command.router.chatInputName).toBe('test');
			expect(command.router.contextMenuNames).toEqual([]);
			expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBeNull();
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBe('runSubcommandGroup');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionOption)).toBe('chatInputRun');
			expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBeNull();
			expect(command.router.routeContextMenuInteraction(UserInteraction)).toBeNull();
		});

		describe('edge cases', () => {
			test('GIVEN a subcommand and a subcommand group with the same name THEN throws an error', () => {
				@RegisterCommand({ name: 'test', description: 'Tests' })
				class UserCommand extends Command {
					@RegisterSubcommandGroup({ name: 'group', description: 'Tests a subcommand group' })
					@RegisterSubcommand({ name: 'group', description: 'Tests a subcommand' })
					public runSubcommandGroup(interaction: Command.ChatInputInteraction) {
						return interaction.reply({ content: 'Pong!' });
					}
				}

				expect(() => makeCommand(UserCommand)).toThrow(
					new TypeError(`Mismatching types, expected 'SubcommandGroup', but received 'Subcommand'`)
				);
			});

			test('GIVEN a duplicated subcommand with the same method THEN merges', () => {
				@RegisterCommand({ name: 'test', description: 'Tests' })
				class UserCommand extends Command {
					@RegisterSubcommand({ name: 'sub', description: 'Tests a subcommand' })
					@RegisterSubcommand({ name: 'sub', description: 'Whoops', required: true })
					public runSubcommand(interaction: Command.ChatInputInteraction) {
						return interaction.reply({ content: 'Pong!' });
					}
				}

				const command = makeCommand(UserCommand);
				expect(command.registry).not.toBeNull();
				expect(command.registry!.chatInput).not.toBeNull();
				expect(command.registry!.chatInput!.toJSON()).toEqual({
					name: 'test',
					description: 'Tests',
					options: [{ name: 'sub', description: 'Tests a subcommand', required: true, type: ApplicationCommandOptionType.Subcommand }],
					type: ApplicationCommandType.ChatInput
				});

				expect(command.router.chatInputName).toBe('test');
				expect(command.router.contextMenuNames).toEqual([]);
				expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
				expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBe('runSubcommand');
				expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBeNull();
				expect(command.router.routeChatInputInteraction(ChatInputInteractionOption)).toBe('chatInputRun');
				expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBeNull();
				expect(command.router.routeContextMenuInteraction(UserInteraction)).toBeNull();
			});

			test('GIVEN a duplicated subcommand groups with the same method THEN merges', () => {
				@RegisterCommand({ name: 'test', description: 'Tests' })
				class UserCommand extends Command {
					@RegisterSubcommandGroup({ name: 'group', description: 'Tests a subcommand' })
					@RegisterSubcommandGroup({ name: 'group', description: 'Whoops' })
					@RegisterSubcommand({ name: 'sub', description: 'Tests a subcommand' }, 'group')
					public runSubcommand(interaction: Command.ChatInputInteraction) {
						return interaction.reply({ content: 'Pong!' });
					}
				}

				const command = makeCommand(UserCommand);
				expect(command.registry).not.toBeNull();
				expect(command.registry!.chatInput).not.toBeNull();
				expect(command.registry!.chatInput!.toJSON()).toEqual({
					name: 'test',
					description: 'Tests',
					options: [
						{
							name: 'group',
							description: 'Tests a subcommand',
							options: [{ name: 'sub', description: 'Tests a subcommand', type: ApplicationCommandOptionType.Subcommand }],
							type: ApplicationCommandOptionType.SubcommandGroup
						}
					],
					type: ApplicationCommandType.ChatInput
				});

				expect(command.router.chatInputName).toBe('test');
				expect(command.router.contextMenuNames).toEqual([]);
				expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
				expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBeNull();
				expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBe('runSubcommand');
				expect(command.router.routeChatInputInteraction(ChatInputInteractionOption)).toBe('chatInputRun');
				expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBeNull();
				expect(command.router.routeContextMenuInteraction(UserInteraction)).toBeNull();
			});

			test('GIVEN a duplicated subcommand with different methods THEN throws', () => {
				@RegisterCommand({ name: 'test', description: 'Tests' })
				class UserCommand extends Command {
					@RegisterSubcommand({ name: 'sub', description: 'Tests a subcommand' })
					public runGroup(interaction: Command.ChatInputInteraction) {
						return interaction.reply({ content: 'Pong!' });
					}

					@RegisterSubcommand({ name: 'sub', description: 'Whoops', required: true })
					public runSubcommand(interaction: Command.ChatInputInteraction) {
						return interaction.reply({ content: 'Pong!' });
					}
				}

				expect(() => makeCommand(UserCommand)).toThrow(
					new Error(`The command 'test' has a subcommand named 'sub' that was already linked to 'runGroup'`)
				);
			});
		});
	});

	describe('ContextMenu', () => {
		test('GIVEN message context command THEN returns the linked method', () => {
			class UserCommand extends Command {
				@RegisterMessageCommand({ name: 'test' })
				public runTest(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const command = makeCommand(UserCommand);
			expect(command.router.chatInputName).toBeNull();
			expect(command.router.contextMenuNames).toEqual(['test']);
			expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBeNull();
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBeNull();
			expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBe('runTest');
			expect(command.router.routeContextMenuInteraction(UserInteraction)).toBeNull();
		});

		test('GIVEN user context command THEN returns the linked method', () => {
			class UserCommand extends Command {
				@RegisterUserCommand({ name: 'test' })
				public runTest(interaction: Command.ChatInputInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const command = makeCommand(UserCommand);
			expect(command.router.chatInputName).toBeNull();
			expect(command.router.contextMenuNames).toEqual(['test']);
			expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBeNull();
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBeNull();
			expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBeNull();
			expect(command.router.routeContextMenuInteraction(UserInteraction)).toBe('runTest');
		});

		test('GIVEN both context commands with same name THEN returns the correct linked method', () => {
			class UserCommand extends Command {
				@RegisterMessageCommand({ name: 'test' })
				public runMessage(interaction: Command.MessageInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}

				@RegisterUserCommand({ name: 'test' })
				public runUser(interaction: Command.UserInteraction) {
					return interaction.reply({ content: 'Pong!' });
				}
			}

			const command = makeCommand(UserCommand);
			expect(command.router.chatInputName).toBeNull();
			expect(command.router.contextMenuNames).toEqual(['test', 'test']);
			expect(command.router.routeChatInputInteraction(ChatInputInteraction)).toBe('chatInputRun');
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommand)).toBeNull();
			expect(command.router.routeChatInputInteraction(ChatInputInteractionSubcommandGroup)).toBeNull();
			expect(command.router.routeContextMenuInteraction(MessageInteraction)).toBe('runMessage');
			expect(command.router.routeContextMenuInteraction(UserInteraction)).toBe('runUser');
		});
	});

	test('GIVEN command without registry THEN logs a warning', () => {
		class UserCommand extends Command {
			public override chatInputRun(interaction: Command.ChatInputInteraction) {
				return interaction.reply({ content: 'Pong!' });
			}
		}

		const warn = vi.spyOn(console, 'warn');
		const command = makeCommand(UserCommand);
		expect(warn).toHaveBeenCalledTimes(1);
		expect(warn).toHaveBeenCalledWith(`CommandRouter: No entry found for command '${command.name}'`);
		expect(command.registry).toBeNull();
		expect(command.router.chatInputName).toBeNull();
		expect(command.router.contextMenuNames).toEqual([]);

		warn.mockClear();
	});
});

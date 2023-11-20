import { Collection } from '@discordjs/collection';
import { container } from '@sapphire/pieces';
import { isFunction } from '@sapphire/utilities';
import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIChatInputApplicationCommandInteractionData,
	type APIContextMenuInteractionData
} from 'discord-api-types/v10';
import type { Command } from '../../structures/Command.js';
import type { ChatInputCommandResolver } from '../resolvers/ChatInputCommandResolver.js';
import type { ContextMenuCommandResolver } from '../resolvers/ContextMenuCommandResolver.js';
import { getLinkedMethod } from '../shared/link.js';
import { CommandRouterSubcommand } from './CommandRouterSubcommand.js';
import { CommandRouterSubcommandGroup } from './CommandRouterSubcommandGroup.js';

/**
 * Represents a command router that handles routing of interactions for a specific command.
 *
 * @since 2.0.0
 * @template Options - The options type for the command.
 */
export class CommandRouter<Options extends Command.Options = Command.Options> {
	#command: Command<Options>;
	#chatInputName: string | null = null;
	#chatInputRouter = new Collection<string, CommandRouterSubcommandGroup | CommandRouterSubcommand>();
	#messageContextMenuRouter = new Collection<string, string>();
	#userContextMenuRouter = new Collection<string, string>();

	public constructor(command: Command<Options>) {
		this.#command = command;

		const entry = container.applicationCommandRegistry.get(command.constructor as typeof Command<Options>);
		if (entry === null) {
			console.warn(`CommandRouter: No entry found for command '${command.name}'`);
		} else {
			this.#populateChatInputRouter(entry.chatInput);
			this.#populateContextMenuRouter(entry.contextMenu);
		}
	}

	/**
	 * The name of the registered chat input command for this command, if any.
	 *
	 * @since 2.0.0
	 */
	public get chatInputName(): string | null {
		return this.#chatInputName;
	}

	/**
	 * The names of the registered context menu commands for this command, if any.
	 *
	 * @since 2.0.0
	 */
	public get contextMenuNames(): string[] {
		return [...this.#messageContextMenuRouter.keys(), ...this.#userContextMenuRouter.keys()];
	}

	/**
	 * Routes a chat input interaction based on the provided data.
	 *
	 * @since 2.0.0
	 * @param data - The data of the chat input interaction.
	 * @returns The mapped command name or `null` if no mapping is found.
	 */
	public routeChatInputInteraction(data: APIChatInputApplicationCommandInteractionData): string | null {
		if (!data.options?.length) return 'chatInputRun';

		const [firstOption] = data.options;
		if (firstOption.type === ApplicationCommandOptionType.Subcommand) {
			const entry = this.#chatInputRouter.get(firstOption.name);
			return entry?.isSubcommand() ? entry.getSubcommandMapping() : null;
		}

		if (firstOption.type === ApplicationCommandOptionType.SubcommandGroup) {
			const entry = this.#chatInputRouter.get(firstOption.name);
			return entry?.isSubcommandGroup() ? entry.getSubcommandMapping(firstOption.options[0].name) ?? entry.getSubcommandGroupMapping() : null;
		}

		return 'chatInputRun';
	}

	/**
	 * Routes a context menu interaction based on the provided data.
	 *
	 * @since 2.0.0
	 * @param data - The data for the context menu interaction.
	 * @returns The result of the context menu interaction, or null if no result is found.
	 */
	public routeContextMenuInteraction(data: APIContextMenuInteractionData): string | null {
		return this.#getContextMenuCollection(data.type)?.get(data.name) ?? null;
	}

	#populateChatInputRouter(entry: ChatInputCommandResolver | null) {
		if (entry === null) return;

		const data = entry.toJSON();
		this.#chatInputName = data.name;
		if (!data.options?.length) return;

		const command = this.#command;
		const chatInputRouter = this.#chatInputRouter;
		for (const option of data.options) {
			if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
				const entry = chatInputRouter.ensure(option.name, () => new CommandRouterSubcommandGroup()).assertSubcommandGroup();
				const subcommandGroupMethod = getLinkedMethod(option);
				if (subcommandGroupMethod) entry.setSubcommandGroupMapping(command, option, subcommandGroupMethod);

				for (const subOption of option.options ?? []) {
					const subcommandMethod = getLinkedMethod(subOption);
					if (subcommandMethod) entry.setSubcommandMapping(command, option, subOption, subcommandMethod);
				}
			} else if (option.type === ApplicationCommandOptionType.Subcommand) {
				const entry = chatInputRouter.ensure(option.name, () => new CommandRouterSubcommand()).assertSubcommand();
				const subcommandMethod = getLinkedMethod(option);
				if (subcommandMethod) entry.setSubcommandMapping(command, option, subcommandMethod);
			}
		}
	}

	#populateContextMenuRouter(entries: ContextMenuCommandResolver[]) {
		const command = this.#command;
		for (const entry of entries) {
			const data = entry.toJSON();
			const method = getLinkedMethod(data);
			if (!method) continue;

			if (isFunction(Reflect.get(command, method))) {
				this.#getContextMenuCollection(data.type)?.set(data.name, method);
			} else {
				throw new Error(`Context menu command named "${data.name}" is not linked to a method`);
			}
		}
	}

	#getContextMenuCollection(type: ApplicationCommandType) {
		switch (type) {
			case ApplicationCommandType.Message:
				return this.#messageContextMenuRouter;
			case ApplicationCommandType.User:
				return this.#userContextMenuRouter;
			default:
				return null;
		}
	}
}

import { Collection } from '@discordjs/collection';
import { REST, type RESTOptions, type RequestData } from '@discordjs/rest';
import { container } from '@sapphire/pieces';
import {
	Routes,
	type RESTPostAPIApplicationCommandsJSONBody,
	type RESTPutAPIApplicationCommandsJSONBody,
	type RESTPutAPIApplicationCommandsResult,
	type RESTPutAPIApplicationGuildCommandsJSONBody,
	type RESTPutAPIApplicationGuildCommandsResult
} from 'discord-api-types/v10';
import type { LoadOptions } from './Client.js';
import { chatInputCommandRegistry, contextMenuCommandRegistry, restrictedGuildIdRegistry } from './interactions/index.js';
import { filterUndefined, flattenIterableOfArrays, guardUndefined } from './utils/generators.js';

export class Registry {
	public readonly clientId: string;
	public readonly rest: REST;

	private authPrefix: RequestData['authPrefix'];

	public constructor({ clientId, token, authPrefix, ...options }: RegistryOptions) {
		token ??= process.env.DISCORD_TOKEN;
		if (!token) throw new Error('A token must be set');

		this.authPrefix = authPrefix ?? 'Bot';

		this.clientId = clientId ?? process.env.DISCORD_CLIENT_ID ?? Buffer.from(token.split('.')[0], 'base64').toString();
		this.rest = new REST(options).setToken(token);
	}

	public get allCommands(): RESTPostAPIApplicationCommandsJSONBody[] {
		return [...chatInputCommandRegistry.values(), ...flattenIterableOfArrays(contextMenuCommandRegistry.values())];
	}

	public get globalCommands(): RESTPostAPIApplicationCommandsJSONBody[] {
		return [
			...chatInputCommandRegistry.filter((_, command) => !restrictedGuildIdRegistry.get(command)?.length).values(),
			...flattenIterableOfArrays(contextMenuCommandRegistry.filter((_, command) => !restrictedGuildIdRegistry.get(command)?.length).values())
		];
	}

	public get guildCommands(): Collection<string, RESTPostAPIApplicationCommandsJSONBody[]> {
		const collection = new Collection<string, RESTPostAPIApplicationCommandsJSONBody[]>();

		for (const [command, guildIds] of restrictedGuildIdRegistry) {
			const generator = filterUndefined<RESTPostAPIApplicationCommandsJSONBody>(
				chatInputCommandRegistry.get(command),
				...guardUndefined(contextMenuCommandRegistry.get(command))
			);

			const commands = [...generator];
			for (const guildId of guildIds) {
				const existing = collection.get(guildId);
				if (existing) existing.push(...commands);
				else collection.set(guildId, commands);
			}
		}

		return collection;
	}

	/**
	 * Loads all the commands.
	 * @param options The load options.
	 */
	public async load(options: LoadOptions = {}) {
		// Register the user directory if not null:
		if (options.baseUserDirectory !== null) {
			container.stores.registerPath(options.baseUserDirectory);
		}

		await container.stores.load();
	}

	/**
	 * Registers all the non guild-restricted commands globally.
	 * @returns The raw result from registering the commands globally.
	 */
	public registerGlobalCommands() {
		const body: RESTPutAPIApplicationCommandsJSONBody = this.globalCommands;
		return this.rest.put(Routes.applicationCommands(this.clientId), {
			body,
			authPrefix: this.authPrefix
		}) as Promise<RESTPutAPIApplicationCommandsResult>;
	}

	/**
	 * Registers all the non guild-restricted commands in a single guild.
	 * @param guildId The guild to register the commands at.
	 * @returns The raw result from registering the commands in the specified guild.
	 */
	public registerGlobalCommandsInGuild(guildId: string) {
		const body: RESTPutAPIApplicationGuildCommandsJSONBody = this.globalCommands;
		return this.rest.put(Routes.applicationGuildCommands(this.clientId, guildId), {
			body,
			authPrefix: this.authPrefix
		}) as Promise<RESTPutAPIApplicationGuildCommandsResult>;
	}

	/**
	 * Registers all the commands including guild-restricted ones in a single guild.
	 * @param guildId The guild to register the commands at.
	 * @returns The raw result from registering the commands in the specified guild.
	 */
	public registerAllCommandsInGuild(guildId: string) {
		const body: RESTPutAPIApplicationGuildCommandsJSONBody = this.allCommands;
		return this.rest.put(Routes.applicationGuildCommands(this.clientId, guildId), {
			body,
			authPrefix: this.authPrefix
		}) as Promise<RESTPutAPIApplicationGuildCommandsResult>;
	}

	/**
	 * Registers all the guild-restricted commands in their respective guilds.
	 * @returns The settled promises from all the guild command registrations.
	 */
	public registerGuildRestrictedCommands(): Promise<PromiseSettledResult<RESTPutAPIApplicationGuildCommandsResult>[]> {
		const promises = this.guildCommands.map((commands, guildId) => {
			const body: RESTPutAPIApplicationGuildCommandsJSONBody = commands;
			return this.rest.put(Routes.applicationGuildCommands(this.clientId, guildId), {
				body,
				authPrefix: this.authPrefix
			}) as Promise<RESTPutAPIApplicationGuildCommandsResult>;
		});

		return Promise.allSettled(promises);
	}
}

export interface RegistryOptions extends Partial<RESTOptions>, Pick<RequestData, 'authPrefix'> {
	/**
	 * The ID of the client.
	 * @default process.env.DISCORD_CLIENT_ID ?? Buffer.from(token.split('.')[0], 'base64').toString()
	 */
	clientId?: string;

	/**
	 * The token to use for registering commands.
	 * @default process.env.DISCORD_TOKEN
	 */
	token?: string;
}

export namespace Registry {
	export type Options = RegistryOptions;
}

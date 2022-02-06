import {
	type APIApplicationCommandOption,
	type APIApplicationCommandSubcommandOption,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIApplicationCommandSubcommandGroupOption,
	type RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord-api-types/v9';
import type { Command } from '../../structures/Command';
import { link } from '../shared/link';
import { chatInputCommandRegistry } from './shared';

export function RegisterCommand(data: RESTPostAPIChatInputApplicationCommandsJSONBody) {
	return function decorate(target: typeof Command) {
		chatInputCommandRegistry.set(target, { type: ApplicationCommandType.ChatInput, ...chatInputCommandRegistry.get(target), ...data });
	};
}

export function RegisterSubCommandGroup(data: APIApplicationCommandOption) {
	return function decorate(target: Command, method: string) {
		const existing = chatInputCommandRegistry.ensure(target.constructor as typeof Command, () => ({
			type: ApplicationCommandType.ChatInput,
			name: '',
			description: ''
		}));

		existing.options ??= [];
		existing.options.push(link(data, method));
	};
}

export function RegisterSubCommand(data: APIApplicationCommandSubcommandOption, subCommandGroupName?: string | null) {
	return function decorate(target: Command, method: string) {
		const existing = chatInputCommandRegistry.get(target.constructor as typeof Command);
		if (!existing?.options) throw new Error('Expected at least one SubCommandGroup to be registered, but it is not.');

		if (subCommandGroupName) {
			const subCommandGroup = existing.options.find(
				(option) => option.type === ApplicationCommandOptionType.SubcommandGroup && option.name === subCommandGroupName
			) as APIApplicationCommandSubcommandGroupOption | undefined;
			if (!subCommandGroup) throw new Error('Expected the specified SubCommandGroup to be registered, but it is not.');

			subCommandGroup.options ??= [];
			subCommandGroup.options.push(link(data, method));
		} else {
			existing.options ??= [];
			existing.options.push(link(data, method));
		}
	};
}

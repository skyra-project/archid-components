import { Collection } from '@discordjs/collection';
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v9';
import type { Command } from '../../structures/Command';

export const chatInputCommandRegistry = new Collection<typeof Command, RESTPostAPIChatInputApplicationCommandsJSONBody>();

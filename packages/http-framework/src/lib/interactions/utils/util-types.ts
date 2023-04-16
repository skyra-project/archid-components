import type { DiscordAPIError, HTTPError, RawFile } from '@discordjs/rest';
import { Result } from '@sapphire/result';
import type { APIInteraction, APIPingInteraction } from 'discord-api-types/v10';

export type DiscordResult<T> = Result<T, DiscordError>;
export type AsyncDiscordResult<T> = Promise<DiscordResult<T>>;

export type AddFiles<T> = T & { files?: RawFile[] };

export type AbortError = Error & { name: 'AbortError' };
export type DiscordError = HTTPError | DiscordAPIError | AbortError;

export type NonPingInteraction = Exclude<APIInteraction, APIPingInteraction>;

import type {
	APIApplicationCommandAutocompleteInteraction,
	APIApplicationCommandInteraction,
	APIMessageComponentInteraction,
	APIModalSubmitInteraction
} from 'discord-api-types/v10';
import type { ServerResponse } from 'node:http';
import type { Command } from './structures/Command';
import type { InteractionHandler } from './structures/InteractionHandler';

export interface ClientEventCommandContext {
	command: Command;
	interaction: APIApplicationCommandInteraction;
	response: ServerResponse;
}

export interface ClientEventAutocompleteContext {
	command: Command;
	interaction: APIApplicationCommandAutocompleteInteraction;
	response: ServerResponse;
}

export interface ClientEventInteractionHandlerContext {
	handler: InteractionHandler;
	interaction: APIMessageComponentInteraction | APIModalSubmitInteraction;
	response: ServerResponse;
}

export interface ClientEvents {
	commandNameMissing: [interaction: APIApplicationCommandAutocompleteInteraction, response: ServerResponse];
	commandNameUnknown: [interaction: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction, response: ServerResponse];
	commandMethodUnknown: [context: ClientEventCommandContext];
	commandRun: [context: ClientEventCommandContext];
	commandSuccess: [context: ClientEventCommandContext, value: unknown];
	commandError: [error: unknown, context: ClientEventCommandContext];
	commandFinish: [context: ClientEventCommandContext];
	autocompleteRun: [context: ClientEventAutocompleteContext];
	autocompleteSuccess: [context: ClientEventAutocompleteContext, value: unknown];
	autocompleteError: [error: unknown, context: ClientEventAutocompleteContext];
	autocompleteFinish: [context: ClientEventAutocompleteContext];
	interactionHandlerNameInvalid: [interaction: APIMessageComponentInteraction | APIModalSubmitInteraction, response: ServerResponse];
	interactionHandlerNameUnknown: [interaction: APIMessageComponentInteraction | APIModalSubmitInteraction, response: ServerResponse];
	interactionHandlerRun: [context: ClientEventInteractionHandlerContext];
	interactionHandlerSuccess: [context: ClientEventInteractionHandlerContext, value: unknown];
	interactionHandlerError: [error: unknown, context: ClientEventInteractionHandlerContext];
	interactionHandlerFinish: [context: ClientEventInteractionHandlerContext];
}

export type MappedClientEvents = { [K in keyof ClientEvents]: ClientEvents[K] };

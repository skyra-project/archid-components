import type {
	APIApplicationCommandAutocompleteInteraction,
	APIApplicationCommandInteraction,
	APIMessageComponentInteraction,
	APIModalSubmitInteraction
} from 'discord-api-types/v10';
import type { EventHandlerRequest, H3Event } from 'h3';
import type { Command } from './structures/Command.js';
import type { InteractionHandler } from './structures/InteractionHandler.js';

export interface ClientEventCommandContext {
	command: Command;
	interaction: APIApplicationCommandInteraction;
	event: H3Event<EventHandlerRequest>;
}

export interface ClientEventAutocompleteContext {
	command: Command;
	interaction: APIApplicationCommandAutocompleteInteraction;
	event: H3Event<EventHandlerRequest>;
}

export interface ClientEventInteractionHandlerContext {
	handler: InteractionHandler;
	interaction: APIMessageComponentInteraction | APIModalSubmitInteraction;
	event: H3Event<EventHandlerRequest>;
}

export interface ClientEvents {
	error: [error: unknown];
	commandNameMissing: [interaction: APIApplicationCommandAutocompleteInteraction, event: H3Event<EventHandlerRequest>];
	commandNameUnknown: [
		interaction: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction,
		event: H3Event<EventHandlerRequest>
	];
	commandMethodUnknown: [context: ClientEventCommandContext];
	commandRun: [context: ClientEventCommandContext];
	commandSuccess: [context: ClientEventCommandContext, value: unknown];
	commandError: [error: unknown, context: ClientEventCommandContext];
	commandFinish: [context: ClientEventCommandContext];
	autocompleteRun: [context: ClientEventAutocompleteContext];
	autocompleteSuccess: [context: ClientEventAutocompleteContext, value: unknown];
	autocompleteError: [error: unknown, context: ClientEventAutocompleteContext];
	autocompleteFinish: [context: ClientEventAutocompleteContext];
	interactionHandlerNameInvalid: [interaction: APIMessageComponentInteraction | APIModalSubmitInteraction, event: H3Event<EventHandlerRequest>];
	interactionHandlerNameUnknown: [interaction: APIMessageComponentInteraction | APIModalSubmitInteraction, event: H3Event<EventHandlerRequest>];
	interactionHandlerRun: [context: ClientEventInteractionHandlerContext];
	interactionHandlerSuccess: [context: ClientEventInteractionHandlerContext, value: unknown];
	interactionHandlerError: [error: unknown, context: ClientEventInteractionHandlerContext];
	interactionHandlerFinish: [context: ClientEventInteractionHandlerContext];
}

export type MappedClientEvents = { [K in keyof ClientEvents]: ClientEvents[K] };

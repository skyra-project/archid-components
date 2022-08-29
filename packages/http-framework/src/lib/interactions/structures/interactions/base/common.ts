import type {
	APIApplicationCommandAutocompleteResponse,
	APIInteractionResponseChannelMessageWithSource,
	APIInteractionResponseDeferredChannelMessageWithSource,
	APIInteractionResponseDeferredMessageUpdate,
	APIInteractionResponseUpdateMessage,
	APIModalInteractionResponse,
	RESTPostAPIInteractionFollowupJSONBody
} from 'discord-api-types/v10';
import type { AddFiles } from '../../../utils/util';

export type AutocompleteResponseData = APIApplicationCommandAutocompleteResponse;
export type AutocompleteResponseOptions = AutocompleteResponseData['data'];

export type MessageResponseData = APIInteractionResponseChannelMessageWithSource;
export type MessageResponseOptions = MessageResponseData['data'];
export type DeferResponseData = APIInteractionResponseDeferredChannelMessageWithSource;
export type DeferResponseOptions = DeferResponseData['data'];
export type ModalResponseData = APIModalInteractionResponse;
export type ModalResponseOptions = ModalResponseData['data'];
export type FollowupOptions = AddFiles<RESTPostAPIInteractionFollowupJSONBody>;

export type DeferUpdateResult = APIInteractionResponseDeferredMessageUpdate;
export type UpdateData = APIInteractionResponseUpdateMessage;
export type UpdateOptions = UpdateData['data'];

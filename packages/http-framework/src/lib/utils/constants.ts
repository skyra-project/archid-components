import { InteractionResponseType } from 'discord-api-types/v10';

export const ErrorMessages = {
	InternalError: JSON.stringify({ message: 'Received an internal error' }),
	InvalidCustomId: JSON.stringify({ message: 'Could not parse the `custom_id` field' }),
	InvalidSignature: JSON.stringify({ message: 'Received invalid signature' }),
	MissingBodyData: JSON.stringify({ message: 'Missing body data' }),
	MissingCommandName: JSON.stringify({ message: 'Missing command name' }),
	MissingSignatureInformation: JSON.stringify({ message: 'Missing signature information' }),
	NotFound: JSON.stringify({ message: 'Not found' }),
	UnknownCommandHandler: JSON.stringify({ message: 'Unknown command handler' }),
	UnknownCommandName: JSON.stringify({ message: 'Unknown command name' }),
	UnknownHandlerName: JSON.stringify({ message: 'Unknown handler name' }),
	UnknownInteractionType: JSON.stringify({ message: 'Received unknown interaction type' }),
	UnsupportedHttpMethod: JSON.stringify({ message: 'Unsupported HTTP method' })
} as const;

export const Payloads = {
	Pong: JSON.stringify({ type: InteractionResponseType.Pong })
} as const;

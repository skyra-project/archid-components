import { Client, type ConnectionOptions } from '@skyra/influx-utilities';
import { InteractionType } from 'discord-api-types/v10';
import { loadInfluxListeners } from '../listeners/_load.js';

export type InteractionCounterKey = Exclude<InteractionType, InteractionType.Ping>;

export class InfluxClient extends Client {
	/**
	 * Represents the count of different types of interactions.
	 */
	public interactionCounters: Record<InteractionCounterKey, number> = {
		[InteractionType.ApplicationCommand]: 0,
		[InteractionType.MessageComponent]: 0,
		[InteractionType.ApplicationCommandAutocomplete]: 0,
		[InteractionType.ModalSubmit]: 0
	};

	public constructor(options: ConnectionOptions = {}) {
		super(options);

		loadInfluxListeners();
	}
}

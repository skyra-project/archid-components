import { Client, type ConnectionOptions } from '@skyra/influx-utilities';
import { loadInfluxListeners } from '../listeners/_load.js';
import { InteractionType } from 'discord-api-types/v10';

export class InfluxClient extends Client {
	/**
	 * Represents the count of different types of interactions.
	 */
	public interactionCounts: Record<InteractionType, number> = {
		[InteractionType.ApplicationCommand]: 0,
		[InteractionType.MessageComponent]: 0,
		[InteractionType.ApplicationCommandAutocomplete]: 0,
		[InteractionType.ModalSubmit]: 0,
		[InteractionType.Ping]: 0
	};

	public constructor(options: ConnectionOptions = {}) {
		super(options);

		loadInfluxListeners();
	}
}

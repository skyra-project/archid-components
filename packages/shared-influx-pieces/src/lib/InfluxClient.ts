import { Client, type ConnectionOptions } from '@skyra/influx-utilities';
import { InteractionType } from 'discord-api-types/v10';
import { loadInfluxListeners } from '../listeners/_load.js';

export type InteractionCounts = Record<InteractionType.MessageComponent | InteractionType.ModalSubmit, number>;

export class InfluxClient extends Client {
	/**
	 * Represents the count of different types of interactions.
	 */
	public interactionCounts: InteractionCounts = {
		[InteractionType.MessageComponent]: 0,
		[InteractionType.ModalSubmit]: 0
	};

	public constructor(options: ConnectionOptions = {}) {
		super(options);

		loadInfluxListeners();
	}
}

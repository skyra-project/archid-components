import { Client, type ConnectionOptions } from '@skyra/influx-utilities';
import { loadInfluxListeners } from '../../listeners/_load.js';

export class InfluxClient extends Client {
	/**
	 * The number of interactions that have occurred.
	 */
	public interactionCount = 0;

	public constructor(options: ConnectionOptions = {}) {
		super(options);

		loadInfluxListeners();
	}
}

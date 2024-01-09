import { Client } from '@skyra/influx-utilities';

export class InfluxClient extends Client {
	/**
	 * The number of interactions that have occurred.
	 */
	public interactionCount = 0;

	/**
	 * Increments the interaction count.
	 */
	public incrementInteractionCount() {
		this.interactionCount++;
	}

	/**
	 * Sets the interaction count.
	 * @param count The interaction count to set. Defaults to 0.
	 */
	public setInteractionCount(count: number = 0) {
		this.interactionCount = count;
	}
}

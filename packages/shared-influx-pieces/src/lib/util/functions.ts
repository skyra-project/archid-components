import { container } from '@skyra/http-framework';

export function isInfluxInitialized() {
	return Boolean(container.influx);
}

# `@skyra/shared-influx-pieces`

The shared influx pieces used in ArchId Network's HTTP-only bots.

## Usage

You can either register after setting the environment parameters:

```typescript
process.env.INFLUX_URL = 'https://influxdb.skyra.pw';
process.env.INFLUX_TOKEN = 'my-secret-token';
process.env.INFLUX_ORG = 'Skyra-Project';
process.env.INFLUX_BUCKET = 'analytics';

import '@skyra/shared-influx-pieces/register';
```

Or register manually:

```typescript
import { container } from '@skyra/http-framework';
import { InfluxClient } from '@skyra/shared-influx-pieces';

container.influx = new InfluxClient({
	url: 'https://influxdb.skyra.pw',
	token: 'my-secret-token',
	org: 'Skyra-Project',
	writeBucket: 'analytics'
});
```

> [!IMPORTANT]
> In order to manual registering to work as intended, you must register the instance in `container.influx` as shown above.

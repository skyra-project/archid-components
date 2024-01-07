# `@skyra/influx-utilities`

A tiny opinionated abstraction layer for InfluxDB for interacting with a single organization, based on [Skyra](https://skyra.pw)'s internal tools.

## Usage

You can provide the configuration for the Influx client in several ways.

-   `INFLUX_URL`: `ConnectionOptions.url`, the base URL to be used.
-   `INFLUX_ORG`: `ConnectionOptions.org`, the organization to use for the query and write APIs.
-   `INFLUX_BUCKET`: `ConnectionOptions.writeBucket`, the bucket to write to in the write API.
-   `INFLUX_TOKEN`: `ConnectionOptions.token`, the authentication token.

### Environment Variables

```typescript
// index.ts
process.env.INFLUX_URL="https://influx.skyra.pw";
process.env.INFLUX_ORG: "Skyra-Project";
process.env.INFLUX_TOKEN: "my-secret-token";
process.env.INFLUX_BUCKET: "analytics";

import { Client } from '@skyra/influx-utilities';

const client = new Client();
```

### `setInfluxVariables`

```typescript
// index.ts
import { Client, setInfluxVariables } from '@skyra/influx-utilities';

setInfluxVariables({
	influxUrl: 'https://influx.skyra.pw',
	influxOrg: 'Skyra-Project',
	influxToken: 'my-secret-token',
	influxBucket: 'analytics'
});

const client = new Client();
```

### Directly through `Client.Options`

```typescript
import { Client } from '@skyra/influx-utilities';

const client = new Client({
	url: 'https://influx.skyra.pw',
	token: 'my-secret-token',
	org: 'Skyra-Project',
	writeBucket: 'analytics'
});
```



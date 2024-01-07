# `@skyra/influx-utilities`

A tiny opinionated abstraction layer for InfluxDB for interacting with a single organization, based on [Skyra](https://skyra.pw)'s internal tools.

## Usage

You can provide the configuration for the Influx client in several ways.

### Environment Variables

```typescript
// index.ts
import { Client } from '@skyra/influx-utilities';

const client = new Client();
```

```sh
# .env
INFLUX_URL="https://influx.skyra.pw";
INFLUX_ORG: "153231";
INFLUX_TOKEN: "my-secret-token";
INFLUX_BUCKET: "analytics";
```

-   `INFLUX_URL`: `ConnectionOptions.url`, the base URL to be used.
-   `INFLUX_PROXY_URL`: `ConnectionOptions.proxyUrl`, the full HTTP web proxy URL including schema.
-   `INFLUX_TIMEOUT`: `ConnectionOptions.timeout`, the socket timeout, defaults to 10 seconds. If defined, this will be parsed and validated to a number.
-   `INFLUX_TOKEN`: `ConnectionOptions.token`, the authentication token.

### `setInfluxVariables`

```typescript
// index.ts
import { Client, setInfluxVariables } from '@skyra/influx-utilities';

setInfluxVariables({
	influxUrl: 'https://influx.skyra.pw',
	influxOrg: '153231',
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
	org: '153231',
	writeBucket: 'analytics'
});
```

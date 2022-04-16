# `@skyra/influx-utilities`

A tiny opinionated abstraction layer for InfluxDB for interacting with a single organization, based on [Skyra](https://skyra.pw)'s internal tools.

## Setup

The first step, is to import the Client from the package:

```typescript
import { Client } from '@skyra/influx-utilities';
```

You can choose between defining the options explictly, in the following manner:

```typescript
const client = new Client({ url: 'https://example.org', token: 'my-secret-token' });
```

Or defining the options via environment variables, they are:

**Client**:
- `INFLUX_OPTIONS_STRING`: A connection string, overrides all the options below.
- `INFLUX_URL`: `ConnectionOptions.url`, the base URL to be used.
- `INFLUX_PROXY_URL`: `ConnectionOptions.proxyUrl`, the full HTTP web proxy URL including schema.
- `INFLUX_TIMEOUT`: `ConnectionOptions.timeout`, the socket timeout, defaults to 10 seconds. If defined, this will be parsed and validated to a number.
- `INFLUX_TOKEN`: `ConnectionOptions.token`, the authentication token.

**API**:
- `INFLUX_ORG`: `Client.Options.org`, the organization to use for the query and write APIs.
- `INFLUX_WRITE_BUCKET`: `Client.Options.writeBucket`, the bucket to write to in the write API.
- `INFLUX_WRITE_PRECISION`: `Client.Options.writePrecision`, the write precision to use in the write API.

> **Note**: If `Client.Options.org` is unset, none of the APIs will be created.

> **Note**: If `Client.Options.writeBucket` is unset, the Write API will not be created.

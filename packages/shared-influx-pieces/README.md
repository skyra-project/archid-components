# `@skyra/shared-influx-pieces`

The shared influx piece used for ArchId Network's HTTP-only bots.

## Usage

You can either register after setting environment parameters:

```typescript
process.env.INFLUX_URL="https://influx.skyra.pw";
process.env.INFLUX_ORG: "153231";
process.env.INFLUX_TOKEN: "my-secret-token";
process.env.INFLUX_BUCKET: "teryl";

import '@skyra/shared-http-pieces/register';
```

Or import its utilities as well as registering:

```typescript
import { initializeInflux } from '@skyra/shared-influx-pieces';
import '@skyra/shared-influx-pieces/register';

initializeInflux({
	url: 'https://influx.skyra.pw',
	org: '153231',
	token: 'my-secret-token',
	writeBucket: 'teryl'
});
```

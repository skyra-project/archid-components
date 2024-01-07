# `@skyra/shared-influx-pieces`

The shared influx piece used for ArchId Network's HTTP-only bots.

## Usage

You can either register after setting environment parameters:

```typescript
process.env.INFLUX_URL = 'https://influx.skyra.pw';
process.env.INFLUX_TOKEN = 'my-secret-token';
process.env.INFLUX_ORG = 'Skyra-Project';
process.env.INFLUX_BUCKET = 'analytics';

import '@skyra/shared-influx-pieces/register';
```

Or import its utilities as well as registering:

```typescript
import { initializeInflux } from '@skyra/shared-influx-pieces';
import '@skyra/shared-influx-pieces/register';

initializeInflux({
	url: 'https://influx.skyra.pw',
	token: 'my-secret-token',
	org: 'Skyra-Project',
	writeBucket: 'analytics'
});
```

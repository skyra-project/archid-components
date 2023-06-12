# `@skyra/shared-http-pieces` [![Crowdin](https://badges.crowdin.net/sharedhttppieces/localized.svg)](https://crowdin.com/project/sharedhttppieces)

The shared commands used for ArchId Network's HTTP-only bots.

## Setup

-   Define `locales/{{lng}}/commands/shared:infoEmbedDescription` as a string. This is the content displayed in `/info`'s embed description.
-   Define the information variables.

## Usage

You can either register after setting environment parameters:

```typescript
process.env.CLIENT_REPOSITORY = 'https://github.com/skyra-project/skyra';
process.env.CLIENT_INVITE =
	'https://discord.com/oauth2/authorize?client_id=266624760782258186&permissions=534185897078&scope=bot%20applications.commands';

import '@skyra/shared-http-pieces/register';
```

Or import its utilities as well as registering:

```typescript
import { setRepository, setInvite } from '@skyra/shared-http-pieces';
import '@skyra/shared-http-pieces/register';

setRepository('skyra'); // setRepository('https://github.com/skyra-project/skyra');
setInvite('266624760782258186', '534185897078');
```

Furthermore, error handling can be enabled by setting the `SENTRY_DSN`, `@skyra/shared-http-pieces` includes a way to register [Sentry](https://docs.sentry.io) and registers handlers to handle errors into Sentry. The plugin also reads `SENTRY_ROOT` to set [`RewriteFrames`](https://docs.sentry.io/platforms/node/configuration/integrations/pluggable-integrations/#rewriteframes)'s root, defaults to `process.cwd()`.

# `@skyra/shared-http-pieces`

The shared commands used for ArchId Network's HTTP-only bots.

## Setup

- Define `locales/{{lng}}/commands/shared:infoEmbedDescription` as a string. This is the content displayed in `/info`'s embed description.
- Define the information variables.

## Usage

You can either register after setting environment parameters:

```typescript
process.env.CLIENT_REPOSITORY = 'https://github.com/skyra-project/skyra';
process.env.CLIENT_INVITE = 'https://discord.com/oauth2/authorize?client_id=266624760782258186&permissions=534185897078&scope=bot%20applications.commands';

import '@skyra/shared-http-pieces/register';
```

Or import its utilities as well as registering:

```typescript
import { setRepository, setInvite } from '@skyra/shared-http-pieces';
import '@skyra/shared-http-pieces/register';

setRepository('skyra'); // setRepository('https://github.com/skyra-project/skyra');
setInvite('266624760782258186', '534185897078');
```

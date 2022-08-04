# `@skyra/logger`

A lightweight logger system with level support.

## Usage

```typescript
import { Logger } from '@skyra/logger';

const logger = new Logger();

logger.info('Hello world');
// [2022/08/04-13:28:58] INFO (19284): Hello World

logger.info('Hello, %s', 'Skyra');
// [2022/08/04-13:29:46] INFO (19284): Hello, Skyra
```

For ease of use, `@skyra/logger` re-exports all the functions from [`colorette`](https://www.npmjs.com/package/colorette).

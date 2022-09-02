# `@skyra/safe-fetch`

A fetch wrapper on top of Rust's Result, powered by [`@sapphire/result`](https://www.npmjs.com/package/@sapphire/result).

## Features

-   Powered by the native `fetch` function
-   CJS and ESM support

## Usage

```typescript
import { safeFetch, json } from '@skyra/safe-fetch';

const data = await json(safeFetch('https://api.example.org'));

console.log(data);
```

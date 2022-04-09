# `@skyra/i18next-backend`

A fast and modern filesystem-based [`i18next`](https://www.npmjs.com/package/i18next) backend for Node.js.

## Usage

```typescript
import { Backend } from '@skyra/i18next-backend';
import i18next from 'i18next';

i18next.use(Backend);

await i18next.init({
	backend: {
		paths: [
			// Using a string:
			'/locales/{{lng}}/{{ns}}.json',
			// Using an URL:
			new URL('/locales/{{lng}}/{{ns}}.json', import.meta.url),
			// Using a function:
			(lng, ns) => `/locales/${lng}/${ns}.json`
		]
	},
	// ... i18next options
})
```

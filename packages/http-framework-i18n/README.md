# `@skyra/http-framework-i18n`

An internationalization layer powered by [`i18next`](https://www.npmjs.com/package/i18next) and [`@skyra/i18next-backend`](https://www.npmjs.com/package/@skyra/i18next-backend) for [`@skyra/http-framework`](https://www.npmjs.com/package/@skyra/http-framework).

## Usage

### Initialization

```typescript
import { addFormatters, init, load } from '@skyra/http-framework-i18n';

// Load the locales from a directory adjacent to the module:
await load(new URL('/locales', import.meta.url));

// Add formatters, those will be added in `i18next.services.formatter`:
addFormatters(
	{ name: 'uppercase', format: (value) => value.toUpperCase() }, //
	{ name: 'lowercase', format: (value) => value.toLowerCase() }
);

// Initialize backend, may take an object with the options:
// NOTE: The following properties are defined by the `load` method:
//       - `InitOptions.backend.paths`
//       - `InitOptions.ns`
//       - `InitOptions.preload`
//
// Furthermore, the following defaults are applied for convenience:
// - `InitOptions.initImmediate`: `false`
// - `InitOptions.interpolation.escapeValue`: `false`
// - `InitOptions.interpolation.skipOnVariables`: `false`
// - `InitOptions.ignoreJSONStructure`: `false`
//
// Passing the aforementioned properties in the options will override the library's defaults.
await init();
```

> **Note**: If you want to customize the options, please check [i18next's TypeScript guide](https://www.i18next.com/overview/typescript) to improve the experience.

### Definition

```typescript
import { T, FT } from '@skyra/http-framework-i18n';

export const InvalidInput = T('path/to/file:invalidInput');
export const AddResult = FT<{ left: number; right: number; result: number }>('path/to/file:addResult');
```

### Consumption

```typescript
import { getSupportedLanguageName, getSupportedUserLanguageName, getT, resolveKey, resolveUserKey } from '@skyra/http-framework-i18n';

// Get the name of the supported guild language, falling back to the user's on DMs:
const guildLanguage = getSupportedLanguageName(interaction);

// Get the name of the supported user language:
const userLanguage = getSupportedUserLanguageName(interaction);

// Get the function to get a translated key:
const t = getT(guildLanguage);

// Resolving a given key, this calls `getT` and `getSupportedLanguageName` under the hood:
const content = resolveKey(interaction, InvalidInput);

// Resolving a given key, this calls `getT` and `getSupportedUserLanguageName` under the hood:
const content = resolveUserKey(interaction, AddResult, { left: 5, right: 10, result: 15 });
```

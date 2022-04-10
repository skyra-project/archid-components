# `@skyra/env-utilities`

Functional utilities for reading and parsing environmental variables, based on [Skyra](https://skyra.pw)'s internal tools.

## Usage

### Setup

To setup `@skyra/env-utilities`, you use the `setup` function exported by the package:

```typescript
import { setup } from '@skyra/env-utilities';

// Set the path as the `.env` file besides the current module:
// NOTE: If not set, it defaults to dotenv's default, `path.resolve(process.cwd(), '.env')`.
setup(new URL('.env', import.meta.url));
```

You can also pass a `string` or if you want to define other options, you may use `EnvSetupOptions`. Optionally, you may configure dotenv via environment variables:

- `DOTENV_DEBUG`: configures `EnvSetupOptions.debug`. If enabled, the library will log to help debug why certain keys or values are not being set as expected.
- `DOTENV_ENCODING`: configures `EnvSetupOptions.encoding`. If set, it will specify the encoding of the files containing the environment variables
- `DOTENV_ENV`: configures `EnvSetupOptions.env`. If set, it will specify a custon environment if `NODE_ENV` is not sufficient.
- `DOTENV_PATH`: configures `EnvSetupOptions.path`. If set, it will specify a custom path to the file containing environment variables, useful for when they are located elsewhere.
- `DOTENV_PREFIX`: configures `EnvSetupOptions.prefix`. If set, it will specify a required prefix for dotenv variables (e.g. `APP_`).

### What `.env` files can be used?

- `.env`: Default.
- `.env.local`: Local overrides. This file is loaded for all environments except test.
- `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
- `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

- `npm start`: `.env.development.local`, `.env.local`, `.env.development`, `.env`
- `npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

[CRA Reference](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used)

### Typing Environment Variables

To add new entries, you augment `Env` from `@skyra/env-utilities/dist/lib/types` using any of the following types:

- `BooleanString`: can be parsed with `envParseBoolean`.
- `IntegerString`: can be parsed with `envParseInteger`.
- `NumberString`: can be parsed with `envParseNumber`.
- `string`: can be parsed with `envParseString` and `envParseArray`.

The above 5 functions will throw an `ReferenceError` instance if a key is missing (unless a default is passed in the second parameter) as well as a `TypeError` instance if a key could not be parsed. The default value is returned as-is and is not validated.

An example of adding more keys is as it follows:

```typescript
import type { BooleanString, IntegerString, NumberString } from '@skyra/env-utilities';

declare module '@skyra/env-utilities' {
	interface Env {
		// Accepts 'true' or 'false':
		ENABLE_TELEMETRY: BooleanString;

		// Accepts any integer, e.g. '10':
		REFRESH_INTERVAL: IntegerString;

		// Accepts any number, e.g. '1.5':
		MINIMUM_SPEED: NumberString;

		// Accepts any string:
		APPLICATION_SECRET: string;
	}
}
```

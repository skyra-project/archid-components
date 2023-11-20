# `@skyra/http-framework`

A powerful HTTP framework for building your Discord bots, powered by [`node:http`], [`@discordjs/rest`], and [`@sapphire/pieces`].

## Features

-   Support for reloading and unloading commands
-   Support for attachment responses
-   Seamless integration with low-level libraries
-   Thin wrapper on top of raw data for maximum performance

## Usage

This library can handle both HTTP interactions and registering commands both globally and per guild using an integrated design powered by decorators.

### Command

The Command is a piece that runs for all chat input and context menu interactions, including auto-complete (since this one is sort of part of the former). Registering the commands happens with decorators:

```typescript
import { Command, RegisterCommand } from '@skyra/http-framework';

@RegisterCommand((builder) =>
	builder //
		.setName('ping')
		.setDescription('Runs a network connection test with me')
)
export class UserCommand extends Command {
	public override chatInputRun(interaction: Command.ChatInputInteraction) {
		return interaction.sendMessage({ content: 'Pong!' });
	}
}
```

You can also register subcommands via decorators:

```typescript
import { Command, RegisterCommand, RegisterSubcommand } from '@skyra/http-framework';

@RegisterCommand((builder) =>
	builder //
		.setName('math')
		.setDescription('Does some maths.')
)
export class UserCommand extends Command {
	@RegisterSubcommand(buildSubcommandBuilders('add', 'Adds the first number to the second number'))
	public add(interaction: Command.ChatInputInteraction, { first, second }: Args) {
		return interaction.sendMessage({
			content: `The result is: ${first + second}`
		});
	}

	@RegisterSubcommand(buildSubcommandBuilders('subtract', 'Subtracts the second number from the first number'))
	public subtract(interaction: Command.ChatInputInteraction, { first, second }: Args) {
		return interaction.sendMessage({
			content: `The result is: ${first - second}`
		});
	}
}

function buildSubcommandBuilders(name: string, description: string) {
	return new SlashCommandSubcommandBuilder() //
		.setName(name)
		.setDescription(description)
		.addNumberOption((builder) =>
			builder //
				.setName('first')
				.setDescription('The first number.')
				.setRequired(true)
		)
		.addNumberOption((builder) =>
			builder //
				.setName('second')
				.setDescription('The second number.')
				.setRequired(true)
		);
}

interface Args {
	first: number;
	second: number;
}
```

### Client

The `Client` class contains the HTTP server, powered by [`node:http`], it also registers a handler that processes whether or not the HTTP request comes from Discord and processes the information accordingly, handling the heavyweight in the background.

```typescript
import { Client } from '@skyra/http-framework';

const client = new Client({
	discordToken: process.env.DISCORD_TOKEN,
	discordPublicKey: process.env.DISCORD_PUBLIC_KEY
});

// Load all the commands and message component handlers:
await client.load();

// Start up the HTTP server;
await client.listen({ port: 3000 });
```

### ApplicationCommandRegistry

The `ApplicationCommandRegistry` is `@skyra/http-framework`'s centralized registry and uses [`@discordjs/rest`] to register them in Discord.

```typescript
// Assuming you have the code above, and that you called `client.load()`:

// Register all global commands:
await client.registry.pushGlobalCommands();

// Register all the guild-restricted commands:
await client.registry.pushGuildRestrictedCommands();
```

However, if you want to use the registry without the client, you can do so:

```typescript
import { applicationCommandRegistry } from '@skyra/http-framework';
import { REST } from '@discordjs/rest';

applicationCommandRegistry.setup({
	rest: new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN),
	clientId: process.env.DISCORD_CLIENT_ID
});

// Load all the commands:
await applicationCommandRegistry.loadCommands();

// Register all global commands:
await applicationCommandRegistry.pushGlobalCommands();

// Register all the guild-restricted commands:
await applicationCommandRegistry.pushGuildRestrictedCommands();
```

> **Note**: calling `applicationCommandRegistry.setup()` is not needed if you are using the `Client` class because it is
> already called automatically for you.

[`node:http`]: https://nodejs.org/api/http.html
[`@discordjs/rest`]: https://www.npmjs.com/package/@discordjs/rest
[`@sapphire/pieces`]: https://www.npmjs.com/package/@sapphire/pieces

# `@skyra/http-framework`

Some stuff to fill in later.

## Features

-   Support for reloading and unloading commands
-   Support for attachment responses
-   Seamless integration with low-level libraries
-   Thin wrapper on top of raw data for maximum performance

## Usage

This library can do both handling HTTP interactions and registering commands both globally and per guild using an integrated design.

### Command

The Command is a piece that runs for all chat input and context-menu interactions, including auto-complete (since this one is sort of part of context-menu). Registering the commands happens with decorators:

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
import { Command, RegisterCommand, RegisterSubCommand } from '@skyra/http-framework';

@RegisterCommand((builder) =>
	builder //
		.setName('math')
		.setDescription('Does some maths.')
)
export class UserCommand extends Command {
	@RegisterSubCommand(buildSubcommandBuilders('add', 'Adds the first number to the second number'))
	public add(interaction: Command.ChatInputInteraction, { first, second }: Args) {
		return interaction.sendMessage({
			content: `The result is: ${first + second}`
		});
	}

	@RegisterSubCommand(buildSubcommandBuilders('subtract', 'Subtracts the second number from the first number'))
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

The `Client` class contains the HTTP server, powered by [`node:http`], it also registers a handler which processes whether or not the HTTP request comes from Discord, then processes the information accordingly, handling the heavy weight in the background.

```typescript
import { Client } from '@skyra/http-framework';

const client = new Client({
	discordPublicKey: process.env.DISCORD_PUBLIC_KEY
});

// Load all the commands and message component handlers:
await client.load();

// Start up the HTTP server;
await client.listen({ port: 3000 });
```

### Registry

The `Registry` class is a wrapper around `@skyra/http-framework`'s internal registries and uses [`@discordjs/rest`] to register them in Discord.

```typescript
import { Registry } from '@skyra/http-framework';

const registry = new Registry({
	token: process.env.DISCORD_TOKEN
});

// Load all the commands and message component handlers:
await registry.load();

// Register all global commands:
await registry.registerGlobalCommands();

// Register all the guild-restricted commands:
await registry.registerGuildRestrictedCommands();
```

[`node:http`]: https://nodejs.org/api/http.html
[`@discordjs/rest`]: https://www.npmjs.com/package/@discordjs/rest

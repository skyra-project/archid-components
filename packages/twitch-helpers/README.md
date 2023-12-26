# `@skyra/twitch-helpers`

Very basic Twitch helper functions for several ArchId bots to ensure we do not duplicate code.

## Features

-   Powered by the `@skyra/safe-fetch` package

## Usage

First of all, you should make sure to define the following environment variables for your process:

-   `TWITCH_CLIENT_ID`: The Client ID of your Twitch application (generated at [Twitch Dev Console](https://dev.twitch.tv/console/apps/))
-   `TWITCH_CLIENT_SECRET`: The Client Secret from your Twitch application (generated at [Twitch Dev Console](https://dev.twitch.tv/console/apps/))
-   `TWITCH_EVENT_SUB_CALLBACK`: A public HTTP callback URL that can be used for the [Twitch EventSub](https://dev.twitch.tv/docs/eventsub)
-   `TWITCH_EVENT_SUB_SECRET`: A unique secret key that is sent to the EventSub system and returned by Twitch then used to validate whether a request is from Twitch or not.

After this, you can use the functions exported from this package to interact with the Twitch API.

# Changelog

All notable changes to this project will be documented in this file.

# [@skyra/http-framework@0.13.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.12.0...@skyra/http-framework@0.13.0) - (2022-10-08)

## 🏠 Refactor

- Support `JSONEncodable<T>` types in registry ([59a57d9](https://github.com/skyra-project/archid-components/commit/59a57d906b5765374d8cf8fc509c32273b477195))
  - 💥 **feat:** `RegisterCommand` now supports any object with `toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody`
  - 💥 **feat:** `RegisterCommand` now supports `Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'type'>` as valid returned value from function overload
  - 💥 **feat:** `RegisterSubCommand` now supports any object with `toJSON(): APIApplicationCommandSubcommandOption`
  - 💥 **feat:** `RegisterSubCommand` now supports `Omit<APIApplicationCommandSubcommandOption, 'type'>` as valid returned value from function overload
  - 💥 **feat:** `RegisterSubCommandGroup` now supports any object with `toJSON(): APIApplicationCommandSubcommandGroupOption`
  - 💥 **feat:** `RegisterSubCommandGroup` now supports `Omit<APIApplicationCommandSubcommandGroupOption, 'type'>` as valid returned value from function overload
  - 💥 **BREAKING CHANGE:** 
  - 💥 **refactor:** removed `makeContextMenuCommand`, it was a remnant from older utilities
  - 💥 **BREAKING CHANGE:** 
  - 💥 **refactor:** removed `ContextMenuOptions` type, use `Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'type'>` instead

# [@skyra/http-framework@0.12.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.11.1...@skyra/http-framework@0.12.0) - (2022-10-02)

## 🐛 Bug Fixes

- **http-framework:** Bump pieces ([be12a2b](https://github.com/skyra-project/archid-components/commit/be12a2b943c90bb3c43d3352b0fe983c75ae7432))
- **http-framework:** Bump sapphire utilities and discord-api-types ([afcc268](https://github.com/skyra-project/archid-components/commit/afcc268c1c443a4eefeb9b19c9004eafd23dca8f))
- **deps:** Update dependency @sapphire/result to ^2.5.0 ([e227a55](https://github.com/skyra-project/archid-components/commit/e227a5550cb619845cb685d669052d9e18509e3f))
- **deps:** Update dependency @discordjs/rest to ^1.2.0 ([095207f](https://github.com/skyra-project/archid-components/commit/095207fbfacfb8f7692d570f7333671003c57cc2))
- **http-framework:** Ensure node16 compatibility (#172) ([a82d88f](https://github.com/skyra-project/archid-components/commit/a82d88fcfe5739ab67e206724700e09de2bca333))

## 🚀 Features

- Add twitch helpers package (#168) ([103160f](https://github.com/skyra-project/archid-components/commit/103160f94898a6842544441a49dd13bb8bacf48f))

# [@skyra/http-framework@0.11.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.11.0...@skyra/http-framework@0.11.1) - (2022-09-02)

## 🐛 Bug Fixes

- **hfx:** Set default emitter (#159) ([f84f1fd](https://github.com/skyra-project/archid-components/commit/f84f1fddc434098e088d7ee4cb04d246e8c47283))
- **hfx:** `Interaction#followup` sending `PATCH` instead of `POST` (#160) ([07a0bca](https://github.com/skyra-project/archid-components/commit/07a0bca6666c3690dad0a0cd99b35efd178cca82))
- **http-framework:** Bump @sapphire/utilities ([948b370](https://github.com/skyra-project/archid-components/commit/948b370a46ccf9f2bd0f8267fae1ed0c943e3231))

# [@skyra/http-framework@0.11.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.10.0...@skyra/http-framework@0.11.0) - (2022-09-01)

## 🏠 Refactor

- **hfx:** Better interaction handling (#157) ([53925e2](https://github.com/skyra-project/archid-components/commit/53925e2c6ad4efff3bb1c5d3a7ed06b0300ae733))
  - 💥 **BREAKING CHANGE:** `BaseInteraction#applicationPermissions` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#channelId` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#guildId` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#guildLocale` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#member` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendEmptyAutocomplete` is renamed to `replyEmpty`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendMessage` is renamed to `reply`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendModal` is not longer available on `ModalSubmit`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendModal` is renamed to `showModal`
  - 💥 **BREAKING CHANGE:** `Interactions.ChatInput` is renamed to `Interactions.ChatInputCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.ChatInput` is renamed to `Interactions.ChatInputCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.Message` is renamed to `Interactions.MessageContextMenuCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.Modal` is renamed to `Interactions.ModalSubmit`
  - 💥 **BREAKING CHANGE:** `Interactions.User` is renamed to `Interactions.UserContextMenuCommand`
  - 💥 **BREAKING CHANGE:** Removed `Interaction` class, it's now an alias of `Interactions.Any`

## 🐛 Bug Fixes

- **hfx:** Bump @sapphire/result to v2.4.1 ([2c4e466](https://github.com/skyra-project/archid-components/commit/2c4e4666597b8203b7e94d0cc6e990faa0d0e328))

# [@skyra/http-framework@0.10.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.9.2...@skyra/http-framework@0.10.0) - (2022-08-29)

## 🏠 Refactor

- **hfx:** Remove `fastify` (#154) ([08911c0](https://github.com/skyra-project/archid-components/commit/08911c029460c0edc733e19505613738394126fa))

## 🐛 Bug Fixes

- Bump discord-api-types ([28a74f0](https://github.com/skyra-project/archid-components/commit/28a74f07a1585bb86adaa2768874400cab841c35))
- **hfx:** Add safe text body reader (#155) ([9b28833](https://github.com/skyra-project/archid-components/commit/9b28833f7b431504c194c66f9d44cb020916a0a3))

## 🚀 Features

- **hfx:** Add `Listener` structure (#156) ([6a61c40](https://github.com/skyra-project/archid-components/commit/6a61c4084d514790c78235573e3d2e7d7cf0eac8))

# [@skyra/http-framework@0.12.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.11.1...@skyra/http-framework@0.12.0) - (2022-10-02)

## 🐛 Bug Fixes

- **http-framework:** Bump pieces ([be12a2b](https://github.com/skyra-project/archid-components/commit/be12a2b943c90bb3c43d3352b0fe983c75ae7432))
- **http-framework:** Bump sapphire utilities and discord-api-types ([afcc268](https://github.com/skyra-project/archid-components/commit/afcc268c1c443a4eefeb9b19c9004eafd23dca8f))
- **deps:** Update dependency @sapphire/result to ^2.5.0 ([e227a55](https://github.com/skyra-project/archid-components/commit/e227a5550cb619845cb685d669052d9e18509e3f))
- **deps:** Update dependency @discordjs/rest to ^1.2.0 ([095207f](https://github.com/skyra-project/archid-components/commit/095207fbfacfb8f7692d570f7333671003c57cc2))
- **http-framework:** Ensure node16 compatibility (#172) ([a82d88f](https://github.com/skyra-project/archid-components/commit/a82d88fcfe5739ab67e206724700e09de2bca333))

## 🚀 Features

- Add twitch helpers package (#168) ([103160f](https://github.com/skyra-project/archid-components/commit/103160f94898a6842544441a49dd13bb8bacf48f))

# [@skyra/http-framework@0.11.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.11.0...@skyra/http-framework@0.11.1) - (2022-09-02)

## 🐛 Bug Fixes

- **hfx:** Set default emitter (#159) ([f84f1fd](https://github.com/skyra-project/archid-components/commit/f84f1fddc434098e088d7ee4cb04d246e8c47283))
- **hfx:** `Interaction#followup` sending `PATCH` instead of `POST` (#160) ([07a0bca](https://github.com/skyra-project/archid-components/commit/07a0bca6666c3690dad0a0cd99b35efd178cca82))
- **http-framework:** Bump @sapphire/utilities ([948b370](https://github.com/skyra-project/archid-components/commit/948b370a46ccf9f2bd0f8267fae1ed0c943e3231))

# [@skyra/http-framework@0.11.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.10.0...@skyra/http-framework@0.11.0) - (2022-09-01)

## 🏠 Refactor

- **hfx:** Better interaction handling (#157) ([53925e2](https://github.com/skyra-project/archid-components/commit/53925e2c6ad4efff3bb1c5d3a7ed06b0300ae733))
  - 💥 **BREAKING CHANGE:** `BaseInteraction#applicationPermissions` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#channelId` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#guildId` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#guildLocale` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#member` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendEmptyAutocomplete` is renamed to `replyEmpty`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendMessage` is renamed to `reply`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendModal` is not longer available on `ModalSubmit`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendModal` is renamed to `showModal`
  - 💥 **BREAKING CHANGE:** `Interactions.ChatInput` is renamed to `Interactions.ChatInputCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.ChatInput` is renamed to `Interactions.ChatInputCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.Message` is renamed to `Interactions.MessageContextMenuCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.Modal` is renamed to `Interactions.ModalSubmit`
  - 💥 **BREAKING CHANGE:** `Interactions.User` is renamed to `Interactions.UserContextMenuCommand`
  - 💥 **BREAKING CHANGE:** Removed `Interaction` class, it's now an alias of `Interactions.Any`

## 🐛 Bug Fixes

- **hfx:** Bump @sapphire/result to v2.4.1 ([2c4e466](https://github.com/skyra-project/archid-components/commit/2c4e4666597b8203b7e94d0cc6e990faa0d0e328))

# [@skyra/http-framework@0.10.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.9.2...@skyra/http-framework@0.10.0) - (2022-08-29)

## 🏠 Refactor

- **hfx:** Remove `fastify` (#154) ([08911c0](https://github.com/skyra-project/archid-components/commit/08911c029460c0edc733e19505613738394126fa))

## 🐛 Bug Fixes

- Bump discord-api-types ([28a74f0](https://github.com/skyra-project/archid-components/commit/28a74f07a1585bb86adaa2768874400cab841c35))
- **hfx:** Add safe text body reader (#155) ([9b28833](https://github.com/skyra-project/archid-components/commit/9b28833f7b431504c194c66f9d44cb020916a0a3))

## 🚀 Features

- **hfx:** Add `Listener` structure (#156) ([6a61c40](https://github.com/skyra-project/archid-components/commit/6a61c4084d514790c78235573e3d2e7d7cf0eac8))

# [@skyra/http-framework@0.11.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.11.0...@skyra/http-framework@0.11.1) - (2022-09-02)

## 🐛 Bug Fixes

- **hfx:** Set default emitter (#159) ([f84f1fd](https://github.com/skyra-project/archid-components/commit/f84f1fddc434098e088d7ee4cb04d246e8c47283))
- **hfx:** `Interaction#followup` sending `PATCH` instead of `POST` (#160) ([07a0bca](https://github.com/skyra-project/archid-components/commit/07a0bca6666c3690dad0a0cd99b35efd178cca82))
- **http-framework:** Bump @sapphire/utilities ([948b370](https://github.com/skyra-project/archid-components/commit/948b370a46ccf9f2bd0f8267fae1ed0c943e3231))

# [@skyra/http-framework@0.11.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.10.0...@skyra/http-framework@0.11.0) - (2022-09-01)

## 🏠 Refactor

- **hfx:** Better interaction handling (#157) ([53925e2](https://github.com/skyra-project/archid-components/commit/53925e2c6ad4efff3bb1c5d3a7ed06b0300ae733))
  - 💥 **BREAKING CHANGE:** `BaseInteraction#applicationPermissions` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#channelId` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#guildId` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#guildLocale` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#member` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendEmptyAutocomplete` is renamed to `replyEmpty`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendMessage` is renamed to `reply`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendModal` is not longer available on `ModalSubmit`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendModal` is renamed to `showModal`
  - 💥 **BREAKING CHANGE:** `Interactions.ChatInput` is renamed to `Interactions.ChatInputCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.ChatInput` is renamed to `Interactions.ChatInputCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.Message` is renamed to `Interactions.MessageContextMenuCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.Modal` is renamed to `Interactions.ModalSubmit`
  - 💥 **BREAKING CHANGE:** `Interactions.User` is renamed to `Interactions.UserContextMenuCommand`
  - 💥 **BREAKING CHANGE:** Removed `Interaction` class, it's now an alias of `Interactions.Any`

## 🐛 Bug Fixes

- **hfx:** Bump @sapphire/result to v2.4.1 ([2c4e466](https://github.com/skyra-project/archid-components/commit/2c4e4666597b8203b7e94d0cc6e990faa0d0e328))

# [@skyra/http-framework@0.10.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.9.2...@skyra/http-framework@0.10.0) - (2022-08-29)

## 🏠 Refactor

- **hfx:** Remove `fastify` (#154) ([08911c0](https://github.com/skyra-project/archid-components/commit/08911c029460c0edc733e19505613738394126fa))

## 🐛 Bug Fixes

- Bump discord-api-types ([28a74f0](https://github.com/skyra-project/archid-components/commit/28a74f07a1585bb86adaa2768874400cab841c35))
- **hfx:** Add safe text body reader (#155) ([9b28833](https://github.com/skyra-project/archid-components/commit/9b28833f7b431504c194c66f9d44cb020916a0a3))

## 🚀 Features

- **hfx:** Add `Listener` structure (#156) ([6a61c40](https://github.com/skyra-project/archid-components/commit/6a61c4084d514790c78235573e3d2e7d7cf0eac8))

# [@skyra/http-framework@0.11.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.10.0...@skyra/http-framework@0.11.0) - (2022-09-01)

## 🏠 Refactor

- **hfx:** Better interaction handling (#157) ([53925e2](https://github.com/skyra-project/archid-components/commit/53925e2c6ad4efff3bb1c5d3a7ed06b0300ae733))
  - 💥 **BREAKING CHANGE:** `BaseInteraction#applicationPermissions` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#channelId` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#guildId` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#guildLocale` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#member` now defaults to raw value (`undefined`)
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendEmptyAutocomplete` is renamed to `replyEmpty`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendMessage` is renamed to `reply`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendModal` is not longer available on `ModalSubmit`
  - 💥 **BREAKING CHANGE:** `BaseInteraction#sendModal` is renamed to `showModal`
  - 💥 **BREAKING CHANGE:** `Interactions.ChatInput` is renamed to `Interactions.ChatInputCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.ChatInput` is renamed to `Interactions.ChatInputCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.Message` is renamed to `Interactions.MessageContextMenuCommand`
  - 💥 **BREAKING CHANGE:** `Interactions.Modal` is renamed to `Interactions.ModalSubmit`
  - 💥 **BREAKING CHANGE:** `Interactions.User` is renamed to `Interactions.UserContextMenuCommand`
  - 💥 **BREAKING CHANGE:** Removed `Interaction` class, it's now an alias of `Interactions.Any`

## 🐛 Bug Fixes

- **hfx:** Bump @sapphire/result to v2.4.1 ([2c4e466](https://github.com/skyra-project/archid-components/commit/2c4e4666597b8203b7e94d0cc6e990faa0d0e328))

# [@skyra/http-framework@0.10.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.9.2...@skyra/http-framework@0.10.0) - (2022-08-29)

## 🏠 Refactor

- **hfx:** Remove `fastify` (#154) ([08911c0](https://github.com/skyra-project/archid-components/commit/08911c029460c0edc733e19505613738394126fa))

## 🐛 Bug Fixes

- Bump discord-api-types ([28a74f0](https://github.com/skyra-project/archid-components/commit/28a74f07a1585bb86adaa2768874400cab841c35))
- **hfx:** Add safe text body reader (#155) ([9b28833](https://github.com/skyra-project/archid-components/commit/9b28833f7b431504c194c66f9d44cb020916a0a3))

## 🚀 Features

- **hfx:** Add `Listener` structure (#156) ([6a61c40](https://github.com/skyra-project/archid-components/commit/6a61c4084d514790c78235573e3d2e7d7cf0eac8))

# [@skyra/http-framework@0.10.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.9.2...@skyra/http-framework@0.10.0) - (2022-08-29)

## 🏠 Refactor

- **hfx:** Remove `fastify` (#154) ([08911c0](https://github.com/skyra-project/archid-components/commit/08911c029460c0edc733e19505613738394126fa))

## 🐛 Bug Fixes

- Bump discord-api-types ([28a74f0](https://github.com/skyra-project/archid-components/commit/28a74f07a1585bb86adaa2768874400cab841c35))
- **hfx:** Add safe text body reader (#155) ([9b28833](https://github.com/skyra-project/archid-components/commit/9b28833f7b431504c194c66f9d44cb020916a0a3))

## 🚀 Features

- **hfx:** Add `Listener` structure (#156) ([6a61c40](https://github.com/skyra-project/archid-components/commit/6a61c4084d514790c78235573e3d2e7d7cf0eac8))

# [@skyra/http-framework@0.9.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.9.0...@skyra/http-framework@0.9.1) - (2022-08-21)

## 🏠 Refactor

- **hfx:** Switch to OOP patterns, remove `form-data` (#147) ([c465c9b](https://github.com/skyra-project/archid-components/commit/c465c9b2ecff704834a17f95a0109aac721fc2df))

# [@skyra/http-framework@0.9.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.8.1...@skyra/http-framework@0.9.0) - (2022-08-15)

## 🚀 Features

- Add attachment support (#145) ([7f3f127](https://github.com/skyra-project/archid-components/commit/7f3f1270d2874a702975904547a0dee58db5b0f0))

# [@skyra/http-framework@0.8.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.8.0...@skyra/http-framework@0.8.1) - (2022-08-09)

## 🏠 Refactor

- Better Ed25519 verification (#143) ([8d34709](https://github.com/skyra-project/archid-components/commit/8d347097ab6ff0698bc96017494fc6d472973cb1))

## 🐛 Bug Fixes

- Add type in context menu register decorators (#141) ([129c4c7](https://github.com/skyra-project/archid-components/commit/129c4c764b4575c7b49b63b78c3bfc61a3f2b9c2))
- Resolved context command routing (#142) ([cc47bdd](https://github.com/skyra-project/archid-components/commit/cc47bdd27550cbf714d2badfd1546af7f8878eac))
- Use the correct Interaction type (#140) ([97f078c](https://github.com/skyra-project/archid-components/commit/97f078ce5e2c561055be08925bfb84e72b7f61e4))

# [@skyra/http-framework@0.8.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.7.2...@skyra/http-framework@0.8.0) - (2022-08-07)

## 🏠 Refactor

- Implement better context command support (#139) ([ff449e5](https://github.com/skyra-project/archid-components/commit/ff449e531b446743ce988cc5bd0859d878bc82a7))
  - 💥 **BREAKING CHANGE:** User command options are not longer nested into `{ [interaction.name]: T }`
  - 💥 **BREAKING CHANGE:** Message command options are not longer nested into `{ [interaction.name]: T }`

* chore: added super-widget 2.0.

# [@skyra/http-framework@0.7.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.6.4...@skyra/http-framework@0.7.0) - (2022-07-30)

## 🚀 Features

- **http-framework-i18n:** Add builder helper methods (#129) ([74b94fd](https://github.com/skyra-project/archid-components/commit/74b94fd650c801b9aa4b0f31581d0933a50808a2))

# [@skyra/http-framework@0.6.4](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.6.3...@skyra/http-framework@0.6.4) - (2022-07-30)

## 🐛 Bug Fixes

- **http-framework:** AsyncGeneratorResponse types (#128) ([fe5e8c8](https://github.com/skyra-project/archid-components/commit/fe5e8c8ad6425eefb832bf1ef7b832247565e13f))

# [@skyra/http-framework@0.6.3](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.6.2...@skyra/http-framework@0.6.3) - (2022-07-30)

## 🐛 Bug Fixes

- **http-framework:** Bump dependencies ([877d04b](https://github.com/skyra-project/archid-components/commit/877d04b8ad42710f65ca3f7e4a0704907f1c9e99))

## 📝 Documentation

- **http-framework:** Update incorrect documentation (#127) ([bb08cc6](https://github.com/skyra-project/archid-components/commit/bb08cc69b4c31eb91043ee7ac199ee5d88c2ca72))

# [@skyra/http-framework@0.6.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.6.0...@skyra/http-framework@0.6.1) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))
- **deps:** Update all non-major dependencies (#123) ([906d844](https://github.com/skyra-project/archid-components/commit/906d844797464bb14a3b5e0ebe87efb7723d362a))

# [@skyra/http-framework@0.6.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.5.8...@skyra/http-framework@0.6.0) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#118) ([86d2f87](https://github.com/skyra-project/archid-components/commit/86d2f87b63d5b9b485387e7b48e2114581a6eafd))
- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))
- **deps:** Update dependency @sapphire/utilities to v3.7.0 ([0dc28c9](https://github.com/skyra-project/archid-components/commit/0dc28c9d15079a2c1a1b8cda60e851939f7a64f0))

## 🚀 Features

- **hfx:** Added `updateResponse` protected method to update replies (#112) ([4ad0be5](https://github.com/skyra-project/archid-components/commit/4ad0be5d30053ba12123eb8f76acdac63828e8a2))

# [@skyra/http-framework@0.5.6](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.5.5...@skyra/http-framework@0.5.6) - (2022-06-20)

## 🐛 Bug Fixes

- **http-framework:** Fix files not uploading (#110) ([cb19ffe](https://github.com/skyra-project/archid-components/commit/cb19ffe1b4cac87c0adb8657652f31e50130bfaf))

# [@skyra/http-framework@0.5.5](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.5.4...@skyra/http-framework@0.5.5) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework@0.5.4](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.5.3...@skyra/http-framework@0.5.4) - (2022-06-19)

## 🏠 Refactor

- Cover fastify deprecated syntax (#105) ([3167d6a](https://github.com/skyra-project/archid-components/commit/3167d6ae5ba75d0755ce876ba80902990d399ba5))

## 🐛 Bug Fixes

- **http-framework:** Bump `@discordjs` dependencies ([00a2f1d](https://github.com/skyra-project/archid-components/commit/00a2f1dff5eaf6d890dbf6ee2ea3171c8d4ceada))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

# [@skyra/http-framework@0.5.3](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.5.2...@skyra/http-framework@0.5.3) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/http-framework@0.5.2](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.5.1...@skyra/http-framework@0.5.2) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/http-framework@0.5.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.5.0...@skyra/http-framework@0.5.1) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **hfx:** Handle errors on first `generator.next()` (#82) ([3a83f69](https://github.com/skyra-project/archid-components/commit/3a83f6917ebc36a7bbcc6c2963a5494e2af2cc16))
- **hfx:** Resolved update message bugs (#81) ([e057cff](https://github.com/skyra-project/archid-components/commit/e057cff4c75b0a1fe5ae86026b9739679367771f))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))
- **hfx:** Route SC from SCG correctly (#80) ([04da4f7](https://github.com/skyra-project/archid-components/commit/04da4f78e303b6b8104beb357dc8aa30697367d7))

# [@skyra/http-framework@0.5.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.4.0...@skyra/http-framework@0.5.0) - (2022-05-19)

## 🐛 Bug Fixes

- **hfx:** Use `Promise` in `IH.AsyncResponse` (#78) ([72b7273](https://github.com/skyra-project/archid-components/commit/72b72731f2d4392ef56960941792e3c4d5d4242b))

## 🚀 Features

- **hfx:** Add `IH.Interaction` and broaden `IH#run` type (#79) ([fbdfba6](https://github.com/skyra-project/archid-components/commit/fbdfba6405548ba07d3818839680ee6a60e6dce8))

# [@skyra/http-framework@0.4.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.3.7...@skyra/http-framework@0.4.0) - (2022-05-18)

## 🚀 Features

- **hfx:** Add `InteractionHandler.AsyncResponse` (#75) ([bcd2db7](https://github.com/skyra-project/archid-components/commit/bcd2db773ccaffc41143ab30d866db309797f669))

# [@skyra/http-framework@0.3.7](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.3.6...@skyra/http-framework@0.3.7) - (2022-04-28)

## Bug Fixes

- **http-framework:** Fix store registry (#64) ([db57108](https://github.com/skyra-project/archid-components/commit/db57108a198901d7995146006ff339645d37637f))

# [@skyra/http-framework@0.3.6](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.3.5...@skyra/http-framework@0.3.6) - (2022-04-24)

## Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/http-framework@0.3.5](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.3.4...@skyra/http-framework@0.3.5) - (2022-04-18)

## Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))

# [@skyra/http-framework@0.3.2](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.3.1...@skyra/http-framework@0.3.2) - (2022-04-12)

## Bug Fixes

- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))

## Refactor

- **http-framework:** Minor enhancements and fixes (#45) ([a51da74](https://github.com/skyra-project/archid-components/commit/a51da743601b93f623a194722da8b216732ca6a8))

# [@skyra/http-framework@0.3.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.3.0...@skyra/http-framework@0.3.1) - (2022-04-12)

## Bug Fixes

- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

# [0.3.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.2.2...@skyra/http-framework@0.3.0) (2022-04-10)

### Bug Fixes

-   **deps:** update all non-major dependencies ([#42](https://github.com/skyra-project/archid-components/issues/42)) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

### Features

-   add editReply and deleteReply ([#41](https://github.com/skyra-project/archid-components/issues/41)) ([2db83c8](https://github.com/skyra-project/archid-components/commit/2db83c8dfbdf2233d2060878fb0f29b2307288d4))

## [0.2.2](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.2.1...@skyra/http-framework@0.2.2) (2022-04-06)

### Bug Fixes

-   bump discordjs dependencies ([140843d](https://github.com/skyra-project/archid-components/commit/140843dd3c4d38579deb0129e505aa787f98da6b))

## [0.2.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.2.0...@skyra/http-framework@0.2.1) (2022-04-06)

### Bug Fixes

-   ensure that `@RestrictGuildIds([])` makes a command global ([#37](https://github.com/skyra-project/archid-components/issues/37)) ([02b7ed7](https://github.com/skyra-project/archid-components/commit/02b7ed70683e4c83c9141defee9a920cae55ad58))

# [0.2.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.1.0...@skyra/http-framework@0.2.0) (2022-04-04)

### Features

-   add file support in responses ([#36](https://github.com/skyra-project/archid-components/issues/36)) ([544407a](https://github.com/skyra-project/archid-components/commit/544407af37a6a7aeaac015019a1cc32d8caf3d75))

# [0.1.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.10...@skyra/http-framework@0.1.0) (2022-04-03)

### Features

-   add `Command.AutocompleteInteraction` ([d76ae75](https://github.com/skyra-project/archid-components/commit/d76ae75f2fc9cec951078554da5a1a7896a59580))
-   add modal and file support ([#34](https://github.com/skyra-project/archid-components/issues/34)) ([4d815fa](https://github.com/skyra-project/archid-components/commit/4d815fa1060b66c478082eb4b5ee13c219244f4e))

## [0.0.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.9...@skyra/http-framework@0.0.10) (2022-04-03)

### Bug Fixes

-   fixed generic type for `autocompleteRun` ([#26](https://github.com/skyra-project/archid-components/issues/26)) ([8eee77f](https://github.com/skyra-project/archid-components/commit/8eee77f3677c9a305e5bb90a7f0434be8258f571))
-   **interactions:** handle empty options ([#33](https://github.com/skyra-project/archid-components/issues/33)) ([ef26e45](https://github.com/skyra-project/archid-components/commit/ef26e459f21c2af59c17834f5ed73184879fcb5a))

### Features

-   add support for response updating in commands ([#28](https://github.com/skyra-project/archid-components/issues/28)) ([0264ff6](https://github.com/skyra-project/archid-components/commit/0264ff687a607f8510861dd95f4a8843cc5355c2))

## [0.0.9](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.8...@skyra/http-framework@0.0.9) (2022-04-02)

**Note:** Version bump only for package @skyra/http-framework

## [0.0.8](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.7...@skyra/http-framework@0.0.8) (2022-04-02)

### Bug Fixes

-   default `embeds` and `components` to undefined instead of empty arrays ([416bfb1](https://github.com/skyra-project/archid-components/commit/416bfb19b65df5a6a602671829ed63e211aaf113))
-   resolved loads of bugs, setup tests, update deps, and general refactors ([#23](https://github.com/skyra-project/archid-components/issues/23)) ([d63f756](https://github.com/skyra-project/archid-components/commit/d63f7569cc81a33e7fbbec8af9673624936a833c))
-   split custom id content every dot ([296f25a](https://github.com/skyra-project/archid-components/commit/296f25ab9802a7b383445eabf0699f9ad7f49df9))

### Features

-   add builder support to subcommand(group) decorators ([c4b257f](https://github.com/skyra-project/archid-components/commit/c4b257ff7b4401a23691244bc70524276bd27297))
-   add proper autocomplete support ([17c0e58](https://github.com/skyra-project/archid-components/commit/17c0e58eed7bd8e2bedd937ab9dd764f1c366453))
-   allow callback for `MessageComponentHandler` return value ([0973b3a](https://github.com/skyra-project/archid-components/commit/0973b3aa6d7037a039e59f71b01adb5ab0ea378b))
-   **MessageComponentHandler:** add `updateMessage` ([bf149ef](https://github.com/skyra-project/archid-components/commit/bf149efecd5ed84a2b64f02010817a2ea21ad2a9))

## [0.0.7](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.6...@skyra/http-framework@0.0.7) (2022-03-19)

### Bug Fixes

-   add non-builder support back to `RegisterCommand` ([0802748](https://github.com/skyra-project/archid-components/commit/0802748aafb19641f5dac4a2f135953cf06547cc))

### Features

-   allow builders for registry decorators ([f2479f2](https://github.com/skyra-project/archid-components/commit/f2479f216b5f85e3a64638f2b7fccc7abd7f7067))

## [0.0.6](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.5...@skyra/http-framework@0.0.6) (2022-03-19)

### Bug Fixes

-   debump dapi-types due to cross-dependecy versions ([5e9b3c2](https://github.com/skyra-project/archid-components/commit/5e9b3c25857a99826d837396bf044e96fae998b3))

### Features

-   add response helpers ([442c9ff](https://github.com/skyra-project/archid-components/commit/442c9ff8bcc051606d7e5b7dc014986c130d8645))

## [0.0.5](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.4...@skyra/http-framework@0.0.5) (2022-03-19)

### Bug Fixes

-   allow configuring `authPrefix` for `Registry` ([127ab08](https://github.com/skyra-project/archid-components/commit/127ab08051e9285d9ca96269246822d18f41589e))

### Features

-   add namespace exports for Client and Registry ([7d6addb](https://github.com/skyra-project/archid-components/commit/7d6addbd99c195fd8394228befb4d13715402d01))

## [0.0.4](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.3...@skyra/http-framework@0.0.4) (2022-03-19)

### Bug Fixes

-   **framework:** allow more types for `RestrictGuildIds` ([3f66b18](https://github.com/skyra-project/archid-components/commit/3f66b188deafcfa184389f4f86907ece6ebc0c5c))

## [0.0.3](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.2...@skyra/http-framework@0.0.3) (2022-03-19)

### Bug Fixes

-   mark interface re-exports as type only exports ([0d77f15](https://github.com/skyra-project/archid-components/commit/0d77f15396e0eca07d0f7ce71045437f26c3c91c))

### Features

-   **client:** allow configuring fastify address and allow string type for port ([354253f](https://github.com/skyra-project/archid-components/commit/354253f51a79e6cacffe1065e1d04e347d86bae0))

## [0.0.2](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework@0.0.1...@skyra/http-framework@0.0.2) (2022-03-19)

### Bug Fixes

-   **exports:** import AliasPieceOptions as a type ([#17](https://github.com/skyra-project/archid-components/issues/17)) ([586fb51](https://github.com/skyra-project/archid-components/commit/586fb51e604a547dc2dd0c0524c4427172fa408d))

## 0.0.1 (2022-03-13)

### Features

-   added abstractions ([97cee5d](https://github.com/skyra-project/archid-components/commit/97cee5de5a553f5607a37ee3d782193c8046ff71))
-   added most of shared-http-pieces ([e9d3323](https://github.com/skyra-project/archid-components/commit/e9d33234a165aa4b514a3dbe61de65a3427f55f7))
-   huge progress! ([e67a2e9](https://github.com/skyra-project/archid-components/commit/e67a2e99b63bde010bd68b43a78c3da96bc9090c))
-   nearly finished http-framework ([5e964f2](https://github.com/skyra-project/archid-components/commit/5e964f293ee009e65e1517f836097dabe072ddcd))


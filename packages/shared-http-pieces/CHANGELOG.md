# Changelog

All notable changes to this project will be documented in this file.

# [@skyra/shared-http-pieces@0.4.4](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.4.3...@skyra/shared-http-pieces@0.4.4) - (2023-03-01)

## 🏠 Refactor

- Handle invite-less bots (#225) ([a27198f](https://github.com/skyra-project/archid-components/commit/a27198f2a416c61f84556472bf3f55e7e53b6e33))

## 🐛 Bug Fixes

- **twitch-helpers:** Resolve loading bugs (#221) ([0dafe6d](https://github.com/skyra-project/archid-components/commit/0dafe6d9aa28d0f2ed29e1bd912b9ddde9841fd8))

# [@skyra/shared-http-pieces@0.4.3](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.4.2...@skyra/shared-http-pieces@0.4.3) - (2023-02-22)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump discord-api-types ([41e0776](https://github.com/skyra-project/archid-components/commit/41e07766c1af7393a24952f49085429fd409c242))

# [@skyra/shared-http-pieces@0.4.1](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.4.0...@skyra/shared-http-pieces@0.4.1) - (2022-11-19)

## 🏠 Refactor

- Add select menu classes (#200) ([cbab493](https://github.com/skyra-project/archid-components/commit/cbab493afc198d24226bd626efa80c82379ea36c))

# [@skyra/shared-http-pieces@0.4.0](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.3.2...@skyra/shared-http-pieces@0.4.0) - (2022-11-05)

## 🐛 Bug Fixes

- **shared-http-pieces:** Manually set next major version ([6d50e62](https://github.com/skyra-project/archid-components/commit/6d50e629e556dd6b22bd331693713d02c8e20b60))

# [@skyra/shared-http-pieces@0.3.1](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.3.0...@skyra/shared-http-pieces@0.3.1) - (2022-10-08)

## 🏠 Refactor

- Use hfx-i18n utilities (#178) ([4e15333](https://github.com/skyra-project/archid-components/commit/4e15333205c3fc97fe5b54e46bb5a5ea999a6c36))

# [@skyra/shared-http-pieces@0.3.0](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.2.0...@skyra/shared-http-pieces@0.3.0) - (2022-10-08)

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

# [@skyra/shared-http-pieces@0.2.0](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.1.0...@skyra/shared-http-pieces@0.2.0) - (2022-10-02)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump discord-api-types ([6e481cc](https://github.com/skyra-project/archid-components/commit/6e481ccef5968aff0b7fa043dfeff1b4f018529c))

## 🚀 Features

- Add twitch helpers package (#168) ([103160f](https://github.com/skyra-project/archid-components/commit/103160f94898a6842544441a49dd13bb8bacf48f))

# [@skyra/shared-http-pieces@0.1.0](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.46...@skyra/shared-http-pieces@0.1.0) - (2022-09-01)

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

# [@skyra/shared-http-pieces@0.0.46](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.45...@skyra/shared-http-pieces@0.0.46) - (2022-08-29)

## 🐛 Bug Fixes

- Bump discord-api-types ([28a74f0](https://github.com/skyra-project/archid-components/commit/28a74f07a1585bb86adaa2768874400cab841c35))

# [@skyra/shared-http-pieces@0.0.44](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.43...@skyra/shared-http-pieces@0.0.44) - (2022-08-21)

## 🏠 Refactor

- **hfx:** Switch to OOP patterns, remove `form-data` (#147) ([c465c9b](https://github.com/skyra-project/archid-components/commit/c465c9b2ecff704834a17f95a0109aac721fc2df))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.46](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.45...@skyra/shared-http-pieces@0.0.46) - (2022-08-29)

## 🐛 Bug Fixes

- Bump discord-api-types ([28a74f0](https://github.com/skyra-project/archid-components/commit/28a74f07a1585bb86adaa2768874400cab841c35))

# [@skyra/shared-http-pieces@0.0.44](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.43...@skyra/shared-http-pieces@0.0.44) - (2022-08-21)

## 🏠 Refactor

- **hfx:** Switch to OOP patterns, remove `form-data` (#147) ([c465c9b](https://github.com/skyra-project/archid-components/commit/c465c9b2ecff704834a17f95a0109aac721fc2df))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.44](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.43...@skyra/shared-http-pieces@0.0.44) - (2022-08-21)

## 🏠 Refactor

- **hfx:** Switch to OOP patterns, remove `form-data` (#147) ([c465c9b](https://github.com/skyra-project/archid-components/commit/c465c9b2ecff704834a17f95a0109aac721fc2df))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.44](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.43...@skyra/shared-http-pieces@0.0.44) - (2022-08-21)

## 🏠 Refactor

- **hfx:** Switch to OOP patterns, remove `form-data` (#147) ([c465c9b](https://github.com/skyra-project/archid-components/commit/c465c9b2ecff704834a17f95a0109aac721fc2df))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.39](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.38...@skyra/shared-http-pieces@0.0.39) - (2022-07-30)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump dependencies ([5a5207e](https://github.com/skyra-project/archid-components/commit/5a5207eb8b74071df1f26f9566d425f4d6d7ca77))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.37](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.36...@skyra/shared-http-pieces@0.0.37) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.36](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.35...@skyra/shared-http-pieces@0.0.36) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.32](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.31...@skyra/shared-http-pieces@0.0.32) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.31](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.30...@skyra/shared-http-pieces@0.0.31) - (2022-06-19)

## 🐛 Bug Fixes

- **shared-http-pieces:** Bump `@discordjs` dependencies ([f304a10](https://github.com/skyra-project/archid-components/commit/f304a1036041e39304e8e538bf47a43cbd7d552d))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

## 📝 Documentation

- **shared-http-pieces:** Add Crowdin badge (#98) ([fbc56e4](https://github.com/skyra-project/archid-components/commit/fbc56e47d6de2dc4cd5c732cd5ad322400d8189d))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.30](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.29...@skyra/shared-http-pieces@0.0.30) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.29](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.28...@skyra/shared-http-pieces@0.0.29) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.28](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.27...@skyra/shared-http-pieces@0.0.28) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## 🐛 Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## 🏠 Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## 🐛 Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.24](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.23...@skyra/shared-http-pieces@0.0.24) - (2022-04-28)

## Bug Fixes

- **shared-http-pieces:** Resolved several bugs (#63) ([4c4dea6](https://github.com/skyra-project/archid-components/commit/4c4dea6070e63366e6dcd64733da60198954ee77))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.23](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.22...@skyra/shared-http-pieces@0.0.23) - (2022-04-28)

## Refactor

- **shared-http-pieces:** New `/info` command (#62) ([b3ce014](https://github.com/skyra-project/archid-components/commit/b3ce0142022ed592cd08d2f08e18a651e2328b25))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.22](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.21...@skyra/shared-http-pieces@0.0.22) - (2022-04-24)

## Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.21](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.21) - (2022-04-18)

## Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **deps:** Update all non-major dependencies (#54) ([ca3a6de](https://github.com/skyra-project/archid-components/commit/ca3a6deab66155be44ec679eb0a954297acdd807))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))

# [@skyra/shared-http-pieces@0.0.19](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.18...@skyra/shared-http-pieces@0.0.19) - (2022-04-15)

## Bug Fixes

- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))

# [@skyra/shared-http-pieces@0.0.18](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.15...@skyra/shared-http-pieces@0.0.18) - (2022-04-12)

## Bug Fixes

- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Documentation

- Fix shared-http-pieces changelog ([d3623a7](https://github.com/skyra-project/archid-components/commit/d3623a73b81c30d553a80f586089fc7c81c93032))

# [@skyra/shared-http-pieces@0.0.15](https://github.com/skyra-project/archid-components/compare/@skyra/shared-http-pieces@0.0.14...@skyra/shared-http-pieces@0.0.15) - (2022-04-10)

## Bug Fixes

- **deps:** Update all non-major dependencies (#42) ([37f2bbd](https://github.com/skyra-project/archid-components/commit/37f2bbdcd8f6ec2145fc063f192c506495974d7a))


# Changelog

All notable changes to this project will be documented in this file.

# [@skyra/http-framework-i18n@0.6.2](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.6.1...@skyra/http-framework-i18n@0.6.2) - (2023-04-10)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies ([f9c1023](https://github.com/skyra-project/archid-components/commit/f9c1023350e16dd10a0b032925910ea040e5c1d5))

# [@skyra/http-framework-i18n@0.6.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.6.0...@skyra/http-framework-i18n@0.6.1) - (2023-03-25)

## 🏠 Refactor

- Add select menu classes (#200) ([cbab493](https://github.com/skyra-project/archid-components/commit/cbab493afc198d24226bd626efa80c82379ea36c))

## 🐛 Bug Fixes

- **http-i18n:** Update collecetion, api types and i18next ([d69049e](https://github.com/skyra-project/archid-components/commit/d69049ee00eb2d31812fd573b60f04956f703591))
- **deps:** Update all non-major dependencies ([df22552](https://github.com/skyra-project/archid-components/commit/df22552999e2aa863023388fc6014a3701f9f8d8))
- **deps:** Update all non-major dependencies ([08fca58](https://github.com/skyra-project/archid-components/commit/08fca581eb8075f359baeb33f6eeb744d33a6a9d))
- **http-framework-i18n:** Bump discord-api-types ([350c945](https://github.com/skyra-project/archid-components/commit/350c945bdcbe17406f8e7c8c52b237a8a6e7db92))
- **deps:** Update all non-major dependencies (#207) ([4768f93](https://github.com/skyra-project/archid-components/commit/4768f93bbf7dab023c592f6bd8dbb6c278aa1d83))

# [@skyra/http-framework-i18n@0.6.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.5.0...@skyra/http-framework-i18n@0.6.0) - (2022-10-23)

## 🐛 Bug Fixes

- **http-framework-i18n:** Update package description ([8bcd779](https://github.com/skyra-project/archid-components/commit/8bcd7795b4943545e5894b48455da6ba539ba3b1))
  - 💥 **BREAKING CHANGE:** This package now depends on i18next v22, please refer to
  - 💥 **https:** //github.com/i18next/i18next/blob/HEAD/CHANGELOG.md#2200 for further
breaking changes
- **deps:** Update dependency @sapphire/utilities to ^3.11.0 ([5e51420](https://github.com/skyra-project/archid-components/commit/5e51420a6fc39939fe50738247f7ede86360cc73))

# [@skyra/http-framework-i18n@0.5.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.4.0...@skyra/http-framework-i18n@0.5.0) - (2022-10-08)

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

# [@skyra/http-framework-i18n@0.4.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.3.5...@skyra/http-framework-i18n@0.4.0) - (2022-10-02)

## 🐛 Bug Fixes

- **http-framework-i18n:** Bump sapphire utilities and discord-api-types ([11a1d37](https://github.com/skyra-project/archid-components/commit/11a1d3703530f0fbfca8ee19b14187881816457b))

## 🚀 Features

- Add twitch helpers package (#168) ([103160f](https://github.com/skyra-project/archid-components/commit/103160f94898a6842544441a49dd13bb8bacf48f))

# [@skyra/http-framework-i18n@0.3.5](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.3.4...@skyra/http-framework-i18n@0.3.5) - (2022-09-02)

## 🐛 Bug Fixes

- **http-framework-i18n:** Bump @sapphire/utilities ([823cf2e](https://github.com/skyra-project/archid-components/commit/823cf2e6ecf1046c9e5a3522c61056e3f04493b6))

# [@skyra/http-framework-i18n@0.3.4](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.3.3...@skyra/http-framework-i18n@0.3.4) - (2022-08-29)

## 🐛 Bug Fixes

- Bump discord-api-types ([28a74f0](https://github.com/skyra-project/archid-components/commit/28a74f07a1585bb86adaa2768874400cab841c35))

# [@skyra/http-framework-i18n@0.3.2](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.3.1...@skyra/http-framework-i18n@0.3.2) - (2022-08-21)

## 🏠 Refactor

- **hfx:** Switch to OOP patterns, remove `form-data` (#147) ([c465c9b](https://github.com/skyra-project/archid-components/commit/c465c9b2ecff704834a17f95a0109aac721fc2df))

# [@skyra/http-framework-i18n@0.3.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.3.0...@skyra/http-framework-i18n@0.3.1) - (2022-08-17)

## 🐛 Bug Fixes

- Do not override `options.interpolation` in `init` (#146) ([fdb5d2e](https://github.com/skyra-project/archid-components/commit/fdb5d2e2ef697772950a5637270cf9a61d5d8f68))

# [@skyra/http-framework-i18n@0.3.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.2.1...@skyra/http-framework-i18n@0.3.0) - (2022-08-07)

## 🚀 Features

- Add `applyNameLocalizedBuilder` among others (#138) ([ceab5a4](https://github.com/skyra-project/archid-components/commit/ceab5a42b387dd2d1cd0e8afa7115794a9fceda5))

# [@skyra/http-framework-i18n@0.2.0](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.17...@skyra/http-framework-i18n@0.2.0) - (2022-07-30)

## 🚀 Features

- **http-framework-i18n:** Add builder helper methods (#129) ([74b94fd](https://github.com/skyra-project/archid-components/commit/74b94fd650c801b9aa4b0f31581d0933a50808a2))

# [@skyra/http-framework-i18n@0.1.17](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.16...@skyra/http-framework-i18n@0.1.17) - (2022-07-30)

## 🐛 Bug Fixes

- **http-framework-i18n:** Remove dependency on `@skyra/http-framwork` ([e330694](https://github.com/skyra-project/archid-components/commit/e33069412fcfb0d6b8d99b388fdd0508dd953fd8))

# [@skyra/http-framework-i18n@0.1.15](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.14...@skyra/http-framework-i18n@0.1.15) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))
- **deps:** Update all non-major dependencies (#123) ([906d844](https://github.com/skyra-project/archid-components/commit/906d844797464bb14a3b5e0ebe87efb7723d362a))

# [@skyra/http-framework-i18n@0.1.14](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.13...@skyra/http-framework-i18n@0.1.14) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#118) ([86d2f87](https://github.com/skyra-project/archid-components/commit/86d2f87b63d5b9b485387e7b48e2114581a6eafd))
- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))
- **deps:** Update dependency @sapphire/utilities to v3.7.0 ([0dc28c9](https://github.com/skyra-project/archid-components/commit/0dc28c9d15079a2c1a1b8cda60e851939f7a64f0))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.9...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.17](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.16...@skyra/http-framework-i18n@0.1.17) - (2022-07-30)

## 🐛 Bug Fixes

- **http-framework-i18n:** Remove dependency on `@skyra/http-framwork` ([e330694](https://github.com/skyra-project/archid-components/commit/e33069412fcfb0d6b8d99b388fdd0508dd953fd8))

# [@skyra/http-framework-i18n@0.1.15](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.14...@skyra/http-framework-i18n@0.1.15) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))
- **deps:** Update all non-major dependencies (#123) ([906d844](https://github.com/skyra-project/archid-components/commit/906d844797464bb14a3b5e0ebe87efb7723d362a))

# [@skyra/http-framework-i18n@0.1.14](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.13...@skyra/http-framework-i18n@0.1.14) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#118) ([86d2f87](https://github.com/skyra-project/archid-components/commit/86d2f87b63d5b9b485387e7b48e2114581a6eafd))
- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))
- **deps:** Update dependency @sapphire/utilities to v3.7.0 ([0dc28c9](https://github.com/skyra-project/archid-components/commit/0dc28c9d15079a2c1a1b8cda60e851939f7a64f0))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.9...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.15](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.14...@skyra/http-framework-i18n@0.1.15) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))
- **deps:** Update all non-major dependencies (#123) ([906d844](https://github.com/skyra-project/archid-components/commit/906d844797464bb14a3b5e0ebe87efb7723d362a))

# [@skyra/http-framework-i18n@0.1.14](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.13...@skyra/http-framework-i18n@0.1.14) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#118) ([86d2f87](https://github.com/skyra-project/archid-components/commit/86d2f87b63d5b9b485387e7b48e2114581a6eafd))
- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))
- **deps:** Update dependency @sapphire/utilities to v3.7.0 ([0dc28c9](https://github.com/skyra-project/archid-components/commit/0dc28c9d15079a2c1a1b8cda60e851939f7a64f0))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.9...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.15](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.14...@skyra/http-framework-i18n@0.1.15) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))
- **deps:** Update all non-major dependencies (#123) ([906d844](https://github.com/skyra-project/archid-components/commit/906d844797464bb14a3b5e0ebe87efb7723d362a))

# [@skyra/http-framework-i18n@0.1.14](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.13...@skyra/http-framework-i18n@0.1.14) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#118) ([86d2f87](https://github.com/skyra-project/archid-components/commit/86d2f87b63d5b9b485387e7b48e2114581a6eafd))
- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))
- **deps:** Update dependency @sapphire/utilities to v3.7.0 ([0dc28c9](https://github.com/skyra-project/archid-components/commit/0dc28c9d15079a2c1a1b8cda60e851939f7a64f0))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.9...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.14](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.13...@skyra/http-framework-i18n@0.1.14) - (2022-07-12)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#118) ([86d2f87](https://github.com/skyra-project/archid-components/commit/86d2f87b63d5b9b485387e7b48e2114581a6eafd))
- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))
- **deps:** Update dependency @sapphire/utilities to v3.7.0 ([0dc28c9](https://github.com/skyra-project/archid-components/commit/0dc28c9d15079a2c1a1b8cda60e851939f7a64f0))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.9...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.9...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.9...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.8...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.10](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.9...@skyra/http-framework-i18n@0.1.10) - (2022-06-19)

## 🐛 Bug Fixes

- Debump discord-api-types ([cfc3099](https://github.com/skyra-project/archid-components/commit/cfc309976d74e386ee33b90c9adb68338b67d6b4))

# [@skyra/http-framework-i18n@0.1.9](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.8...@skyra/http-framework-i18n@0.1.9) - (2022-06-19)

## 🐛 Bug Fixes

- **http-framework-i18n:** Bump `@discordjs` dependencies ([f7654ee](https://github.com/skyra-project/archid-components/commit/f7654ee68c28b5580a9aa0e4f04afadb996cbff2))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#102) ([c6b10ec](https://github.com/skyra-project/archid-components/commit/c6b10ec92d14f8ba7874e0fb034d223d6221b6f9))

# [@skyra/http-framework-i18n@0.1.8](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.7...@skyra/http-framework-i18n@0.1.8) - (2022-06-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#93) ([37224f3](https://github.com/skyra-project/archid-components/commit/37224f3746e814f442e31a47d62665a3dd834cc8))

# [@skyra/http-framework-i18n@0.1.7](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.6...@skyra/http-framework-i18n@0.1.7) - (2022-06-04)

## 🐛 Bug Fixes

- Bump discord-api-types ([9c98352](https://github.com/skyra-project/archid-components/commit/9c9835249719b0fc6be20ee17de86905456cf2f2))

# [@skyra/http-framework-i18n@0.1.6](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.5...@skyra/http-framework-i18n@0.1.6) - (2022-06-01)

## 🐛 Bug Fixes

- Lock discord-api-types to 0.33.0 ([5abd7d9](https://github.com/skyra-project/archid-components/commit/5abd7d903233d4f317e95e1de4347a5249ef1538))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/http-framework-i18n@0.1.5](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.4...@skyra/http-framework-i18n@0.1.5) - (2022-05-19)

## 🐛 Bug Fixes

- **hfx-i18n:** Use broader Interaction type (#77) ([e84a61c](https://github.com/skyra-project/archid-components/commit/e84a61ca4d96bf5011d2f522bfe3b54eb631565c))

# [@skyra/http-framework-i18n@0.1.3](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.2...@skyra/http-framework-i18n@0.1.3) - (2022-05-18)

## 🏠 Refactor

- **hfx-i18n:** Support more Interaction types, new functions (#74) ([8cec6f4](https://github.com/skyra-project/archid-components/commit/8cec6f4f613d83790f62b727df4969182349ce24))

# [@skyra/http-framework-i18n@0.1.2](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.1...@skyra/http-framework-i18n@0.1.2) - (2022-04-27)

## Bug Fixes

- Resolved i18n loader bugs (#61) ([a7d2806](https://github.com/skyra-project/archid-components/commit/a7d28063c705a3e0cf6111140a63622f4a104055))

# [@skyra/http-framework-i18n@0.1.1](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.1.0...@skyra/http-framework-i18n@0.1.1) - (2022-04-24)

## Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/http-framework-i18n@0.1.0]
(https://github.com/skyra-project/archid-components/tree/@skyra/http-framework-i18n@0.1.0) - (2022-04-18)

## Bug Fixes

- Update discordjs dependencies (#55) ([43c9795](https://github.com/skyra-project/archid-components/commit/43c9795c334885ad207e6ae4fd0c9b29da526df8))
- **http-framework-i18n:** Use tsup (#50) ([5c6a2b7](https://github.com/skyra-project/archid-components/commit/5c6a2b7968e9a94b39c6b37593be425df45ce458))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Bump i18next dependency ([1117c38](https://github.com/skyra-project/archid-components/commit/1117c38949f9ec238c72c396df0b623a74ec07c6))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Features

- Added i18n packages (#38) ([a55ef56](https://github.com/skyra-project/archid-components/commit/a55ef562219162879f436d80e8f12acef82dd3ec))

## Refactor

- **http-framework-i18n:** Type enhancements (#46) ([d9ddd0e](https://github.com/skyra-project/archid-components/commit/d9ddd0e974541da4998c116bdfdfa04a62266e54))

# [@skyra/http-framework-i18n@0.0.6](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.0.5...@skyra/http-framework-i18n@0.0.6) - (2022-04-15)

## Bug Fixes

- **http-framework-i18n:** Use tsup (#50) ([5c6a2b7](https://github.com/skyra-project/archid-components/commit/5c6a2b7968e9a94b39c6b37593be425df45ce458))

# [@skyra/http-framework-i18n@0.0.5](https://github.com/skyra-project/archid-components/compare/@skyra/http-framework-i18n@0.0.4...@skyra/http-framework-i18n@0.0.5) - (2022-04-12)

## Bug Fixes

- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))

## Refactor

- **http-framework-i18n:** Type enhancements (#46) ([d9ddd0e](https://github.com/skyra-project/archid-components/commit/d9ddd0e974541da4998c116bdfdfa04a62266e54))

# [@skyra/http-framework-i18n@0.0.4]
(https://github.com/skyra-project/archid-components/tree/@skyra/http-framework-i18n@0.0.4) - (2022-04-12)

## Bug Fixes

- Bump i18next dependency ([1117c38](https://github.com/skyra-project/archid-components/commit/1117c38949f9ec238c72c396df0b623a74ec07c6))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Features

- Added i18n packages (#38) ([a55ef56](https://github.com/skyra-project/archid-components/commit/a55ef562219162879f436d80e8f12acef82dd3ec))


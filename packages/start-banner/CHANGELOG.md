# Changelog

All notable changes to this project will be documented in this file.

# [@skyra/start-banner@2.0.0](https://github.com/skyra-project/archid-components/compare/@skyra/start-banner@1.0.2...@skyra/start-banner@2.0.0) - (2023-04-12)

## 🏠 Refactor

- Add select menu classes (#200) ([cbab493](https://github.com/skyra-project/archid-components/commit/cbab493afc198d24226bd626efa80c82379ea36c))
- Support `JSONEncodable<T>` types in registry ([59a57d9](https://github.com/skyra-project/archid-components/commit/59a57d906b5765374d8cf8fc509c32273b477195))
  - 💥 **feat:** `RegisterCommand` now supports any object with `toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody`
  - 💥 **feat:** `RegisterCommand` now supports `Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'type'>` as valid returned value from function overload
  - 💥 **feat:** `RegisterSubCommand` now supports any object with `toJSON(): APIApplicationCommandSubcommandOption`
  - 💥 **feat:** `RegisterSubCommand` now supports `Omit<APIApplicationCommandSubcommandOption, 'type'>` as valid returned value from function overload
  - 💥 **feat:** `RegisterSubCommandGroup` now supports any object with `toJSON(): APIApplicationCommandSubcommandGroupOption`
  - 💥 **feat:** `RegisterSubCommandGroup` now supports `Omit<APIApplicationCommandSubcommandGroupOption, 'type'>` as valid returned value from function overload
  - 💥 **BREAKING CHANGE:** refactor: removed `makeContextMenuCommand`, it was a remnant from older utilities
  - 💥 **BREAKING CHANGE:** refactor: removed `ContextMenuOptions` type, use `Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'type'>` instead
- **hfx:** Switch to OOP patterns, remove `form-data` (#147) ([c465c9b](https://github.com/skyra-project/archid-components/commit/c465c9b2ecff704834a17f95a0109aac721fc2df))

## 🐛 Bug Fixes

- Update to TypeScript v5 & use moduleResolution node16 (#239) ([92986c1](https://github.com/skyra-project/archid-components/commit/92986c15e0ebed07efdbaf21f28915e373a738bd))
- **deps:** Update all non-major dependencies ([df22552](https://github.com/skyra-project/archid-components/commit/df22552999e2aa863023388fc6014a3701f9f8d8))
- **deps:** Update all non-major dependencies (#207) ([4768f93](https://github.com/skyra-project/archid-components/commit/4768f93bbf7dab023c592f6bd8dbb6c278aa1d83))

## 🚀 Features

- Add twitch helpers package (#168) ([103160f](https://github.com/skyra-project/archid-components/commit/103160f94898a6842544441a49dd13bb8bacf48f))

# [@skyra/start-banner@1.0.2](https://github.com/skyra-project/archid-components/compare/@skyra/start-banner@1.0.1...@skyra/start-banner@1.0.2) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))
- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/start-banner@1.0.1](https://github.com/skyra-project/archid-components/compare/@skyra/start-banner@1.0.0...@skyra/start-banner@1.0.1) - (2022-06-19)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))

# [@skyra/start-banner@1.0.0]
(https://github.com/skyra-project/archid-components/tree/@skyra/start-banner@1.0.0) - (2022-05-07)

## 🐛 Bug Fixes

- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## 📝 Documentation

- **start-banner:** Make README's banner shorter (#47) ([0e2e7df](https://github.com/skyra-project/archid-components/commit/0e2e7df4c588fba6ed2fe4cb9bae024a918da937))

## 🚀 Features

- **start-banner:** Set package version to 1.0.0 before publish ([88eed80](https://github.com/skyra-project/archid-components/commit/88eed80270d25459509709ca2bcec3a735a1c222))
- Added start-banner package (#40) ([1db7317](https://github.com/skyra-project/archid-components/commit/1db73176458bf9996137e91d8c26d182bbaa203a))

# [@skyra/start-banner@0.0.4](https://github.com/skyra-project/archid-components/compare/@skyra/start-banner@0.0.3...@skyra/start-banner@0.0.4) - (2022-04-12)

## Bug Fixes

- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))

## Documentation

- **start-banner:** Make README's banner shorter (#47) ([0e2e7df](https://github.com/skyra-project/archid-components/commit/0e2e7df4c588fba6ed2fe4cb9bae024a918da937))

# [@skyra/start-banner@0.0.3]
(https://github.com/skyra-project/archid-components/tree/@skyra/start-banner@0.0.3) - (2022-04-12)

## Bug Fixes

- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Features

- Added start-banner package (#40) ([1db7317](https://github.com/skyra-project/archid-components/commit/1db73176458bf9996137e91d8c26d182bbaa203a))


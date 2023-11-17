# Changelog

All notable changes to this project will be documented in this file.

# [@skyra/logger@2.0.2](https://github.com/skyra-project/archid-components/compare/@skyra/logger@2.0.2...@skyra/logger@2.0.2) - (2023-11-17)

## 🐛 Bug Fixes

- Replace `const enum` with `enum` (#286) ([f7c7f64](https://github.com/skyra-project/archid-components/commit/f7c7f64143d035e89b187014073da2c1278d0380))
- **deps:** Update all non-major dependencies ([aed5a61](https://github.com/skyra-project/archid-components/commit/aed5a615be59d88e082eefe7a700337e7b3e1637))
- **deps:** Update all non-major dependencies ([098ea85](https://github.com/skyra-project/archid-components/commit/098ea85e886440a54d56698d985fc3964b424bda))
- **deps:** Update all non-major dependencies ([f7b68b7](https://github.com/skyra-project/archid-components/commit/f7b68b79e09779ae8e922cb1deec43018a224ea6))

# [@skyra/logger@2.0.1](https://github.com/skyra-project/archid-components/compare/@skyra/logger@2.0.0...@skyra/logger@2.0.1) - (2023-04-21)

## 🐛 Bug Fixes

- **deps:** Use caret in `colorette`'s version (#244) ([669d539](https://github.com/skyra-project/archid-components/commit/669d5393b644213cfb2f0a13b939df21fb93e781))

# [@skyra/logger@2.0.0](https://github.com/skyra-project/archid-components/compare/@skyra/logger@1.0.1...@skyra/logger@2.0.0) - (2023-04-12)

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

## 🐛 Bug Fixes

- Update to TypeScript v5 & use moduleResolution node16 (#239) ([92986c1](https://github.com/skyra-project/archid-components/commit/92986c15e0ebed07efdbaf21f28915e373a738bd))
- **deps:** Update all non-major dependencies ([df22552](https://github.com/skyra-project/archid-components/commit/df22552999e2aa863023388fc6014a3701f9f8d8))
- **deps:** Update all non-major dependencies (#207) ([4768f93](https://github.com/skyra-project/archid-components/commit/4768f93bbf7dab023c592f6bd8dbb6c278aa1d83))

## 🚀 Features

- Add twitch helpers package (#168) ([103160f](https://github.com/skyra-project/archid-components/commit/103160f94898a6842544441a49dd13bb8bacf48f))

# [@skyra/logger@1.0.1](https://github.com/skyra-project/archid-components/compare/@skyra/logger@1.0.0...@skyra/logger@1.0.1) - (2022-08-29)

## 🏠 Refactor

- **hfx:** Switch to OOP patterns, remove `form-data` (#147) ([c465c9b](https://github.com/skyra-project/archid-components/commit/c465c9b2ecff704834a17f95a0109aac721fc2df))

# [@skyra/logger@1.0.0](https://github.com/skyra-project/archid-components/tree/@skyra/logger@1.0.0) - (2022-08-04)

## 🚀 Features

- **Logger:** Add package (#132) ([84f26de](https://github.com/skyra-project/archid-components/commit/84f26de5b9835c7ea319038ff8687beee5354e0b))

# Changelog

All notable changes to this project will be documented in this file.

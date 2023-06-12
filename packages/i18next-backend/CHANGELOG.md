# Changelog

All notable changes to this project will be documented in this file.

# [@skyra/i18next-backend@2.0.3](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@2.0.2...@skyra/i18next-backend@2.0.3) - (2023-04-12)

## 🐛 Bug Fixes

- Update to TypeScript v5 & use moduleResolution node16 (#239) ([92986c1](https://github.com/skyra-project/archid-components/commit/92986c15e0ebed07efdbaf21f28915e373a738bd))
- **deps:** Update all non-major dependencies ([f9c1023](https://github.com/skyra-project/archid-components/commit/f9c1023350e16dd10a0b032925910ea040e5c1d5))

# [@skyra/i18next-backend@2.0.2](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@2.0.1...@skyra/i18next-backend@2.0.2) - (2023-03-25)

## 🐛 Bug Fixes

- **i18next-backend:** Update i18next and @types/node ([77cd04c](https://github.com/skyra-project/archid-components/commit/77cd04cbb99a8c76a71f524c00ef207eb0584bc7))
- **deps:** Update all non-major dependencies ([df22552](https://github.com/skyra-project/archid-components/commit/df22552999e2aa863023388fc6014a3701f9f8d8))
- **deps:** Update all non-major dependencies ([08fca58](https://github.com/skyra-project/archid-components/commit/08fca581eb8075f359baeb33f6eeb744d33a6a9d))
- **deps:** Update all non-major dependencies (#207) ([4768f93](https://github.com/skyra-project/archid-components/commit/4768f93bbf7dab023c592f6bd8dbb6c278aa1d83))

# [@skyra/i18next-backend@2.0.1](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@2.0.0...@skyra/i18next-backend@2.0.1) - (2022-12-11)

## 🏠 Refactor

- Add select menu classes (#200) ([cbab493](https://github.com/skyra-project/archid-components/commit/cbab493afc198d24226bd626efa80c82379ea36c))

## 🐛 Bug Fixes

- **i18next-backend:** Fixed types with i18next (#205) ([3c2e140](https://github.com/skyra-project/archid-components/commit/3c2e14053f51548c036bfe6fbb5c2221b4ceb4fe))
- **deps:** Update all non-major dependencies ([a21a43f](https://github.com/skyra-project/archid-components/commit/a21a43ff6258f6c79d886a2faa57755db6724d88))

# [@skyra/i18next-backend@2.0.0](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@1.1.0...@skyra/i18next-backend@2.0.0) - (2022-10-23)

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

## 🐛 Bug Fixes

- **i18next-backend:** Update package description ([46691c1](https://github.com/skyra-project/archid-components/commit/46691c126a13e453eaac632fa99c5c9c8530366c))
  - 💥 **BREAKING CHANGE:** This package now depends on i18next v22, please refer to
  - 💥 **https:** //github.com/i18next/i18next/blob/HEAD/CHANGELOG.md#2200 for further
breaking changes

# [@skyra/i18next-backend@1.1.0](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@1.0.2...@skyra/i18next-backend@1.1.0) - (2022-10-02)

## 🐛 Bug Fixes

- **i18next-backend:** Fixed pack for CJS (#170) ([95a5b22](https://github.com/skyra-project/archid-components/commit/95a5b22baaf7a17f83c41f2a705885b2c6d8b8c6))

## 🚀 Features

- Add twitch helpers package (#168) ([103160f](https://github.com/skyra-project/archid-components/commit/103160f94898a6842544441a49dd13bb8bacf48f))

# [@skyra/i18next-backend@1.0.2](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@1.0.1...@skyra/i18next-backend@1.0.2) - (2022-07-17)

## 🐛 Bug Fixes

- Bump deps and use tsup dts ([7c1cb5d](https://github.com/skyra-project/archid-components/commit/7c1cb5d2baa1b9b92665f9b44e355cb0e318b687))
- **deps:** Update all non-major dependencies (#123) ([906d844](https://github.com/skyra-project/archid-components/commit/906d844797464bb14a3b5e0ebe87efb7723d362a))
- **deps:** Update all non-major dependencies (#118) ([86d2f87](https://github.com/skyra-project/archid-components/commit/86d2f87b63d5b9b485387e7b48e2114581a6eafd))
- **deps:** Update all non-major dependencies (#116) ([67a5515](https://github.com/skyra-project/archid-components/commit/67a55152775b859f4c289e63d549f01901a5c1d0))

# [@skyra/i18next-backend@1.0.1](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@1.0.0...@skyra/i18next-backend@1.0.1) - (2022-06-19)

## 🐛 Bug Fixes

- **i18next-backend:** Bump @types/node ([dbdf14d](https://github.com/skyra-project/archid-components/commit/dbdf14d5952f8ad7fdec362ff42c6aae5b12617b))
- **deps:** Update all non-major dependencies (#108) ([dab6744](https://github.com/skyra-project/archid-components/commit/dab67449301dfbffbf81d03a7c6fcd86e452740b))
- **deps:** Update all non-major dependencies (#86) ([6d1d18d](https://github.com/skyra-project/archid-components/commit/6d1d18df88f5f8cfca23c7889c9a50396867ae80))

# [@skyra/i18next-backend@1.0.0](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@0.1.2...@skyra/i18next-backend@1.0.0) - (2022-05-07)

## 🚀 Features

- **i18next-backend:** Set package version to 1.0.0 before publish ([c56eebe](https://github.com/skyra-project/archid-components/commit/c56eebe83aa3c9859f02762467401fbca87af3e3))

# [@skyra/i18next-backend@0.1.2](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@0.1.1...@skyra/i18next-backend@0.1.2) - (2022-04-27)

## Bug Fixes

- Resolved i18n loader bugs (#61) ([a7d2806](https://github.com/skyra-project/archid-components/commit/a7d28063c705a3e0cf6111140a63622f4a104055))

# [@skyra/i18next-backend@0.1.1](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@0.1.0...@skyra/i18next-backend@0.1.1) - (2022-04-24)

## Bug Fixes

- **deps:** Update all non-major dependencies (#60) ([326e242](https://github.com/skyra-project/archid-components/commit/326e242c638ad735be8c7746223596fe108e5941))

# [@skyra/i18next-backend@0.1.0]
(https://github.com/skyra-project/archid-components/tree/@skyra/i18next-backend@0.1.0) - (2022-04-18)

## Bug Fixes

- **hfx-i18n:** Add static `type` field as required by i18next (#56) ([a7315ef](https://github.com/skyra-project/archid-components/commit/a7315ef0c87f61d8b1338ee16a82c17a5876fc5f))
- **i18next-backend:** Add CJS bundle ([3da6e05](https://github.com/skyra-project/archid-components/commit/3da6e051009a0e23026bf7fd674085f996ca9edf))
- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))
- Bump i18next dependency ([1117c38](https://github.com/skyra-project/archid-components/commit/1117c38949f9ec238c72c396df0b623a74ec07c6))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Features

- Added i18n packages (#38) ([a55ef56](https://github.com/skyra-project/archid-components/commit/a55ef562219162879f436d80e8f12acef82dd3ec))

# [@skyra/i18next-backend@0.0.5](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@0.0.4...@skyra/i18next-backend@0.0.5) - (2022-04-12)

## Bug Fixes

- **i18next-backend:** Add CJS bundle ([3da6e05](https://github.com/skyra-project/archid-components/commit/3da6e051009a0e23026bf7fd674085f996ca9edf))

# [@skyra/i18next-backend@0.0.4](https://github.com/skyra-project/archid-components/compare/@skyra/i18next-backend@0.0.3...@skyra/i18next-backend@0.0.4) - (2022-04-12)

## Bug Fixes

- Ensure proper files array for yarn pack ([38214a3](https://github.com/skyra-project/archid-components/commit/38214a3be182369efe076428c425b6aa43e1ee35))

# [@skyra/i18next-backend@0.0.3]
(https://github.com/skyra-project/archid-components/tree/@skyra/i18next-backend@0.0.3) - (2022-04-12)

## Bug Fixes

- Bump i18next dependency ([1117c38](https://github.com/skyra-project/archid-components/commit/1117c38949f9ec238c72c396df0b623a74ec07c6))
- Fixed export mapping in package.json ([d217c18](https://github.com/skyra-project/archid-components/commit/d217c18ac357fd83c448fc5682857b292e09da60))

## Features

- Added i18n packages (#38) ([a55ef56](https://github.com/skyra-project/archid-components/commit/a55ef562219162879f436d80e8f12acef82dd3ec))


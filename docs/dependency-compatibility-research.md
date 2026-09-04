# Dependency Compatibility Research

Checked 2026-09-04 against package publishers' npm metadata, release notes, and source. This is an upgrade decision record, not evidence that the resulting application has passed build/runtime checks. The installed graph remains authoritative in `package-lock.json`.

## Framework boundary

Expo SDK 57 is stable, released June 30, 2026. npm currently marks `expo@57.0.20` as `latest`; SDK 58 is canary. SDK 57 is especially relevant here: React Native 0.86.3 fixes Hermes v1 regressions affecting memory use with Reanimated/Worklets and development startup. The earlier SDK 56-only assumption is therefore stale. Sources: [Expo release](https://expo.dev/changelog/sdk-57), [published Expo metadata](https://registry.npmjs.org/expo).

Use Expo's SDK 57 package manifest as one compatibility set, not each native package's independent `latest` tag:

| Package | SDK 57 selection | Independent latest, if different |
| --- | --- | --- |
| Expo | 57.0.20 | — |
| React Native | 0.86.3 | 0.87.1: outside this SDK's target |
| React / React DOM | 19.2.3 | 19.2.8: keep the SDK-selected pair |
| Reanimated | 4.5.1 | 4.6.0: requires Worklets 0.12.x |
| Worklets | 0.10.1 | 0.12.1: outside Reanimated 4.5.1's peer range |
| Gesture Handler | ~2.32.0 | Keep the SDK-selected minor |
| Screens | ~4.26.0 | Keep the SDK-selected minor |
| Keyboard Controller | 1.21.9 | Keep the SDK-selected version |
| Safe Area Context | ~5.7.0 | Keep the SDK-selected minor |
| SVG | 15.15.4 | Keep the SDK-selected version |
| WebView | 13.16.1 | Keep the SDK-selected version |
| React Native Web | ~0.21.0 | Keep the SDK-selected minor |
| FlashList | 2.0.2 | Keep the SDK-selected version |

Source for every SDK selection: [Expo 57.0.20 bundledNativeModules.json](https://unpkg.com/expo@57.0.20/bundledNativeModules.json). Independent latest tags: [React Native](https://registry.npmjs.org/react-native), [React](https://registry.npmjs.org/react), [Reanimated](https://registry.npmjs.org/react-native-reanimated), [Worklets](https://registry.npmjs.org/react-native-worklets).

Reanimated 4 requires New Architecture. Its 4.5 line supports RN 0.86; the exact 4.5.1 package requires Worklets `0.10.x`. Broad compatibility tables assume the latest patch, so exact package peers take precedence when selecting an earlier patch. Sources: [Reanimated compatibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/), [4.5.1 metadata](https://registry.npmjs.org/react-native-reanimated/4.5.1).

## UI and styling

- Upgrade HeroUI Native 1.0.3 → **1.0.9**. Its published peers accept the SDK 57 native set, React 19, Bottom Sheet 5, Tailwind Merge 3, and Tailwind Variants 3. Keep Uniwind + Tailwind 4; introducing another styling engine is unnecessary. Sources: [1.0.9 package peers](https://registry.npmjs.org/heroui-native/1.0.9), [HeroUI setup](https://heroui.com/en/docs/native/getting-started/quick-start).
- HeroUI patch releases include typography, input, popup/portal, accessibility, and toast fixes. Smoke-test these components and custom themes; 1.0.9 also removes LinkButton's default corner radius. Starting at 1.0.8, HeroUI's stylesheet registers its own Tailwind source, so the repository's explicit `@source` is redundant, not a new requirement. Sources: [1.0.9 release](https://github.com/heroui-inc/heroui-native/releases/tag/v1.0.9), [1.0.8 release](https://github.com/heroui-inc/heroui-native/releases/tag/v1.0.8).
- Upgrade Uniwind 1.6.5 → **1.12.0** with Tailwind **4.3.3**. Uniwind's current package requires React >=19, RN >=0.81, Tailwind >=4, and internally pins Tailwind compiler packages to 4.3.3. These peers admit SDK 57. Version 1.10.1 explicitly updated its example to Expo 57; 1.12.0 fixes React lifecycle subscriptions and unnecessary stylesheet reinitialization. Sources: [1.12.0 metadata](https://registry.npmjs.org/uniwind/1.12.0), [1.10.1 release](https://github.com/uni-stack/uniwind/releases/tag/v1.10.1), [1.12.0 release](https://github.com/uni-stack/uniwind/releases/tag/v1.12.0).
- Retain the existing `withUniwindConfig` Metro wrapper and CSS entry-point imports. No Uniwind Babel preset is required. HeroUI currently targets native iOS/Android and does not recommend its native library for web; a successful web export should not be described as browser-runtime certification. Sources: [Uniwind setup](https://docs.uniwind.dev/quickstart), [HeroUI platform guidance](https://heroui.com/en/docs/native/getting-started/quick-start).

## MMKV and Nitro

Upgrade MMKV **4.3.2** and consider Nitro **0.37.1** as a pair requiring an actual native build. MMKV v4 needs RN >=0.76 and Nitro Modules; npm's wildcard Nitro peer is not proof of every native ABI combination. MMKV 4.3.2 was published with Nitro 0.35.9 in its development graph. Its current release improves external-memory reporting and newer-RN support; Nitro 0.37.1 fixes public-header version checks and reports native ArrayBuffer memory pressure. There is no published exact MMKV 4.3.2/Nitro 0.37.1 compatibility guarantee, so retain a native compilation/runtime gate. Sources: [MMKV metadata](https://registry.npmjs.org/react-native-mmkv/4.3.2), [MMKV requirements](https://github.com/mrousavy/react-native-mmkv/blob/v4.3.2/README.md), [MMKV release](https://github.com/mrousavy/react-native-mmkv/releases/tag/v4.3.2), [Nitro release](https://github.com/margelo/nitro/releases/tag/v0.37.1).

No storage-data migration is indicated for the 4.3.1 → 4.3.2 patch. Preserve existing store IDs, encryption configuration, and SecureStore keys; test relaunch persistence instead of clearing storage to make the app start.

## Supabase / Hermes release-build failure

The failure in **2.106.0** is an upstream regression: optional tracing left a dynamic `import('@opentelemetry/api')` in the CJS bundle, which Hermes rejects during bytecode compilation. Metro success or `--no-bytecode` export does not prove release-build compatibility. The first upstream fix shipped in **2.106.1**; version **2.112.0** subsequently moved tracing into a separate opt-in entry point. Sources: [reported regression](https://github.com/supabase/supabase-js/issues/2380), [first fixed release](https://github.com/supabase/supabase-js/releases/tag/v2.106.1), [tracing separation release](https://github.com/supabase/supabase-js/releases/tag/v2.112.0).

Preferred solution: pin current stable **@supabase/supabase-js 2.115.0**, keep normal `createClient` imports, and do not add OpenTelemetry or `@supabase/supabase-js/tracing` when tracing is not used. The upstream split keeps OpenTelemetry out of the ordinary bundle. Avoid a custom Metro shim, package patch, disabling Hermes, or accepting a no-bytecode-only export as the fix. Sources: [2.115.0 package metadata](https://registry.npmjs.org/@supabase%2fsupabase-js/2.115.0), [Supabase tracing design](https://supabase.com/blog/connect-client-traces-to-your-logs).

Supabase 2.115.0 requires Node >=22 for Node/tooling environments. React Native 0.86.3 permits Node `^20.19.4 || ^22.13.0 || ^24.3.0 || >=25.0.0`; use a supported intersection such as Node 24 LTS >=24.3.0. Sources: [Supabase Node deprecation](https://supabase.com/changelog/45715-deprecation-notice-dropping-support-for-node-js-20), [RN package engines](https://registry.npmjs.org/react-native/0.86.3).

## Verification required after implementation

Run Expo alignment and Doctor, dependency-peer validation, typecheck/lint, and iOS/Android production exports **with Hermes bytecode enabled**. Then regenerate/build the native simulator app and exercise authentication-screen rendering, navigation, representative UI components, themes, and persisted state. SDK 57 changes `expo prebuild` to clean generated native folders by default; preserve any manual native changes before running it. A real simulator build is required for MMKV/Nitro validation; an Expo Go launch or plain Metro export is insufficient. See [Expo upgrade instructions](https://expo.dev/changelog/sdk-57) and [MMKV installation](https://github.com/mrousavy/react-native-mmkv/blob/v4.3.2/README.md).

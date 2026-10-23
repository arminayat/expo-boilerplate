# Dependency Compatibility Research

Verified 2026-10-23. Publisher package metadata, exact installed manifests, and the current source code take precedence over older audit notes. This research supports the [upgrade audit](dependency-upgrade-audit.md); it does not certify live service behavior.

## Expo and native runtime

Expo SDK 58 is stable (released October 15), targeting React Native 0.88 and React 19.3. Use Expo 58.0.17's exact [bundledNativeModules manifest](https://unpkg.com/expo@58.0.17/bundledNativeModules.json), rather than independently selecting every native package's latest tag. Selected React/React DOM 19.3.0, FlashList 2.3.2, keyboard controller 1.22.7, and Gesture Handler ~3.3.0 intentionally trail their independent latest releases. Sources: [SDK 58 release](https://expo.dev/changelog/sdk-58), [upgrade guide](https://expo.dev/blog/how-to-upgrade-to-sdk-58), [version reference](https://docs.expo.dev/versions/v58.0.0/).

Reanimated 4.7.1 requires Worklets 0.13.x and supports RN 0.86–0.88. Keep this pair together and use the New Architecture. Sources: [4.7.1 package peers](https://registry.npmjs.org/react-native-reanimated/4.7.1), [compatibility guide](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/).

Gesture Handler is an explicit evidence boundary: Expo selects 3.3.x, but the publisher's [compatibility table](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/getting-started/) lists RN 0.88 under 3.4.x. The upstream [RN 0.88 upgrade diff](https://github.com/software-mansion/react-native-gesture-handler/pull/4517/files) principally updates examples and removes outdated codegen type assertions. Keep the Expo set and validate native compilation/gesture interactions; broad npm peers alone do not establish runtime compatibility.

Native requirements: Xcode 26.4+, iOS 16.4+, Android 7+, compile SDK 37 and target SDK 36. Node 22.23.2 satisfies the SDK and Supabase engines. SDK 58 generates SceneDelegate and enables Android R8 release shrinking by default. Preserve manual edits before Expo regenerates native projects. A fresh signed native build is required for MMKV, Nitro, gestures, and secure storage; Hermes exports alone cannot prove these integrations.

## Source migrations

RN 0.88 enables its strict public TypeScript API by default. Native component values are no longer ref-instance types. Migrate AppText to TextInstance and the toast input ref to TextInputInstance. AppState.currentState may be null/undefined, so use explicit state comparisons. Source: [strict TypeScript migration](https://reactnative.dev/docs/strict-typescript-api).

Masked View 0.3.2 is still the latest package, but its declaration uses the removed NativeMethods mixin. A local ComponentType<MaskedViewProps> assertion at the one app usage preserves the actual React component implementation and its published props. Do not globally disable strict RN types or weaken all app props to any.

Use `expo-router/native-tabs`. The old unstable entry remains a deprecated re-export, so this removes deprecated usage rather than fixing a missing module. Expo Router still exports the used navigation themes and header helper through `expo-router/react-navigation`; direct @react-navigation dependencies are unnecessary. Demo headers already explicitly configure transparency, and other app stacks hide their headers, so no global header compatibility switch is needed. Source: [Router SDK 57 to 58 migration](https://docs.expo.dev/router/migrate/sdk-57-to-58/).

## UI, styling, and bundling

HeroUI Native 1.0.11 permits React >=19, RN >=0.81, Gesture Handler ^2.28 or ^3, Reanimated ^4.1.1, Worklets >=0.5.1, and the installed supporting UI packages. It fixes native input refs, Android portal interactions, and controlled bottom-sheet reopening. Existing standalone field/control APIs and provider config remain valid. Sources: [published peers](https://registry.npmjs.org/heroui-native/1.0.11), [release notes](https://github.com/heroui-inc/heroui-native/releases/tag/v1.0.11).

Uniwind 1.13.0 retains React >=19/RN >=0.81 and pins its Tailwind compiler packages to 4.3.3. It improves RN export forwarding and CSS cascade/import behavior. Keep existing `withUniwindConfig`, CSS imports, theme registration, and Tailwind 4.3.3. Sources: [metadata](https://registry.npmjs.org/uniwind/1.13.0), [release notes](https://github.com/uni-stack/uniwind/releases/tag/v1.13.0).

Expo's [remote versions endpoint](https://api.expo.dev/v2/versions) incorrectly recommends Metro ^0.84.6 for SDK 58, while [@expo/metro 58.0.0](https://registry.npmjs.org/@expo%2fmetro/58.0.0) explicitly owns the 0.87.1 Metro family. The CLI merges the remote related-package map last, causing a false warning for a direct Metro declaration. Remove the three redundant direct Metro dependencies; Expo's exact dependencies supply Uniwind's peers. Validate a clean install, one deduplicated 0.87.1 graph, Expo Doctor, and actual exports. No validation exclusions or forced outdated bundler are necessary.

## Development tool constraints

- Babel remains 7.29.7: Expo's Metro/Babel preset uses Babel 7 transforms and ^7 peers; Babel 8 is not a drop-in upgrade.
- ESLint remains 9.39.5: eslint-plugin-react, eslint-plugin-import, and eslint-plugin-react-native do not all accept ESLint 10.
- TypeScript remains 6.0.3: the current @typescript-eslint parser accepts >=4.8.4 <6.1.0, excluding TypeScript 7.
- Metro moves to 0.87.1 through Expo ownership. All other retained direct development dependencies are updated to their compatible latest versions.

Sources: [Expo preset](https://registry.npmjs.org/babel-preset-expo/58.0.19), [Expo lint config](https://registry.npmjs.org/eslint-config-expo/58.0.4), [React ESLint plugin](https://registry.npmjs.org/eslint-plugin-react/7.37.5), [Import plugin](https://registry.npmjs.org/eslint-plugin-import/2.32.0), [TypeScript parser](https://registry.npmjs.org/@typescript-eslint%2fparser/8.72.0).

## Storage and service clients

MMKV 4.3.2 and Nitro 0.37.1 are still latest. Their versions, store IDs, AES-256 encryption setting, and SecureStore key remain unchanged. The RN upgrade still requires native compilation/runtime validation of their ABI. Do not clear user storage to work around startup problems. Sources: [MMKV metadata](https://registry.npmjs.org/react-native-mmkv/4.3.2), [Nitro metadata](https://registry.npmjs.org/react-native-nitro-modules/0.37.1).

Supabase JS 2.118.0 retains Node >=22 and normal createClient imports. The [current changelog](https://supabase.com/changelog.md) introduces no required app schema migration for this client upgrade. Optional OpenTelemetry tracing remains out of the ordinary client entry point. Keep Hermes bytecode enabled to catch the historical dynamic-import regression. Source: [2.118.0 metadata](https://registry.npmjs.org/@supabase%2fsupabase-js/2.118.0).

RevenueCat 10.15.1 keeps synchronous configure and asynchronous isConfigured/login/attribution methods. The scoped app fixes handle optional configuration and promise failures, share concurrent setup, and move offering reads out of render. Isolated adapter tests verify those behaviors without claiming purchase/provider acceptance. PostHog 4.81.10 retains the disabled in-memory provider path for absent keys. Sources: [Purchases metadata](https://registry.npmjs.org/react-native-purchases/10.15.1), [PostHog metadata](https://registry.npmjs.org/posthog-react-native/4.81.10).

## Security and acceptance boundaries

Latest published braces 3.0.3 and node-forge 1.4.0 are affected by [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) and [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv). Both report no patched version as of this audit. The 25 high package flags are propagation from these two advisories. Keep the existing high/critical CI audit gate and disclose its failure; npm's suggested major framework downgrades are not compatible fixes.

Native app checks use placeholders, not live backend credentials. Android native release verification requires an installed SDK. Browser testing is prohibited for this task, and the existing native SecureStore/MMKV adapter remains unsupported on web. Use the audit's verification table for actual receipts; package peer declarations do not prove live auth, analytics, billing, or deployment.

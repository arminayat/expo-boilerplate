# Dependency Upgrade Audit

Audited 2026-10-23 against npm publisher metadata and the [Expo 58.0.17 native module manifest](https://unpkg.com/expo@58.0.17/bundledNativeModules.json). All 70 previous direct runtime/development packages were reviewed: 49 retained direct packages upgraded, 18 already current or constrained, and 3 redundant Metro declarations removed. Those Metro packages also move from 0.84.5 to 0.87.1 through Expo. There are now 67 direct dependencies.

The resulting stack is stable Expo 58.0.17, Router 58.0.25, React Native 0.88.0, React/React DOM 19.3.0, HeroUI Native 1.0.11, and Uniwind 1.13.0. Package versions below are resolved lockfile versions. See [compatibility research](dependency-compatibility-research.md) for primary sources and constraints.

## Package-by-package decisions

| Package | Before (SDK 57 lockfile) | Selected | Publisher latest | Decision |
| --- | --- | --- | --- | --- |
| @babel/core | 7.29.7 | 7.29.7 | 8.0.7 | Latest Babel 7; Expo transforms require ^7. |
| @expo-google-fonts/inter | 0.4.2 | 0.4.2 | 0.4.2 | Current stable; published peers accepted. |
| @expo-google-fonts/lora | 0.4.2 | 0.4.2 | 0.4.2 | Current stable; published peers accepted. |
| @expo-google-fonts/roboto-slab | 0.4.2 | 0.4.2 | 0.4.2 | Current stable; published peers accepted. |
| @expo/ui | 57.0.16 | 58.0.22 | 58.0.22 | Expo SDK 58 matrix; current stable. |
| @expo/vector-icons | 15.1.1 | 15.1.1 | 15.1.1 | Expo SDK 58 matrix; current stable. |
| @gorhom/bottom-sheet | 5.2.14 | 5.2.14 | 5.2.14 | Current stable; published peers accepted. |
| @react-native-masked-view/masked-view | 0.3.2 | 0.3.2 | 0.3.2 | Expo SDK 58 matrix; current stable. |
| @shopify/flash-list | 2.0.2 | 2.3.2 | 2.3.3 | Expo-selected version. |
| @supabase/supabase-js | 2.115.0 | 2.118.0 | 2.118.0 | Current stable; published peers accepted. |
| @tanstack/react-query | 5.102.8 | 5.104.5 | 5.104.5 | Current stable; published peers accepted. |
| @types/react | 19.2.18 | 19.3.0 | 19.3.0 | Current stable; published peers accepted. |
| babel-plugin-module-resolver | 5.0.3 | 5.0.3 | 5.0.3 | Current stable; published peers accepted. |
| babel-preset-expo | 57.0.10 | 58.0.19 | 58.0.19 | Current stable; published peers accepted. |
| clsx | 2.1.1 | 2.1.1 | 2.1.1 | Current stable; published peers accepted. |
| eslint | 9.39.5 | 9.39.5 | 10.13.0 | Latest ESLint 9; Expo React/Import and React Native plugins exclude 10. |
| eslint-config-expo | 57.0.2 | 58.0.4 | 58.0.4 | Expo SDK 58 matrix; current stable. |
| eslint-plugin-react-native | 5.0.0 | 5.0.0 | 5.0.0 | Current stable; published peers accepted. |
| expo | 57.0.20 | 58.0.17 | 58.0.17 | Current stable; published peers accepted. |
| expo-apple-authentication | 57.0.1 | 58.0.2 | 58.0.2 | Expo SDK 58 matrix; current stable. |
| expo-blur | 57.0.2 | 58.0.5 | 58.0.5 | Expo SDK 58 matrix; current stable. |
| expo-constants | 57.0.17 | 58.0.13 | 58.0.13 | Expo SDK 58 matrix; current stable. |
| expo-crypto | 57.0.2 | 58.0.7 | 58.0.7 | Expo SDK 58 matrix; current stable. |
| expo-doctor | 1.20.4 | 1.21.5 | 1.21.5 | Current stable; published peers accepted. |
| expo-font | 57.0.3 | 58.0.9 | 58.0.9 | Expo SDK 58 matrix; current stable. |
| expo-glass-effect | 57.0.1 | 58.0.4 | 58.0.4 | Expo SDK 58 matrix; current stable. |
| expo-haptics | 57.0.2 | 58.0.7 | 58.0.7 | Expo SDK 58 matrix; current stable. |
| expo-image | 57.0.4 | 58.0.16 | 58.0.16 | Expo SDK 58 matrix; current stable. |
| expo-linear-gradient | 57.0.1 | 58.0.3 | 58.0.3 | Expo SDK 58 matrix; current stable. |
| expo-linking | 57.0.9 | 58.0.14 | 58.0.14 | Expo SDK 58 matrix; current stable. |
| expo-network | 57.0.1 | 58.0.4 | 58.0.4 | Expo SDK 58 matrix; current stable. |
| expo-router | 57.0.19 | 58.0.25 | 58.0.25 | Expo SDK 58 matrix; current stable. |
| expo-secure-store | 57.0.3 | 58.0.2 | 58.0.2 | Expo SDK 58 matrix; current stable. |
| expo-splash-screen | 57.0.8 | 58.0.11 | 58.0.11 | Expo SDK 58 matrix; current stable. |
| expo-status-bar | 57.0.1 | 58.0.4 | 58.0.4 | Expo SDK 58 matrix; current stable. |
| expo-symbols | 57.0.2 | 58.0.4 | 58.0.4 | Expo SDK 58 matrix; current stable. |
| expo-system-ui | 57.0.3 | 58.0.6 | 58.0.6 | Expo SDK 58 matrix; current stable. |
| expo-updates | 57.0.21 | 58.0.18 | 58.0.18 | Expo SDK 58 matrix; current stable. |
| expo-web-browser | 57.0.2 | 58.0.6 | 58.0.6 | Expo SDK 58 matrix; current stable. |
| heroui-native | 1.0.9 | 1.0.11 | 1.0.11 | Current stable; published peers accepted. |
| lucide-react-native | 1.41.0 | 1.61.0 | 1.61.0 | Current stable; published peers accepted. |
| metro | 0.84.5 | 0.87.1 | 0.87.1 | Remove direct pin; Expo owns exact 0.87.1 and supplies Uniwind peer. |
| metro-cache | 0.84.5 | 0.87.1 | 0.87.1 | Remove direct pin; keep Expo-owned Metro family aligned. |
| metro-transform-worker | 0.84.5 | 0.87.1 | 0.87.1 | Remove direct pin; keep Expo-owned Metro family aligned. |
| pod-install | 1.1.0 | 1.2.1 | 1.2.1 | Current stable; published peers accepted. |
| posthog-react-native | 4.67.0 | 4.81.10 | 4.81.10 | Current stable; published peers accepted. |
| prettier | 3.9.6 | 3.9.10 | 3.9.10 | Current stable; published peers accepted. |
| prettier-plugin-tailwindcss | 0.8.1 | 0.8.1 | 0.8.1 | Current stable; published peers accepted. |
| react | 19.2.3 | 19.3.0 | 19.3.1 | Expo-selected React/renderer pair; do not independently bump renderer versions. |
| react-dom | 19.2.3 | 19.3.0 | 19.3.1 | Keep identical to Expo-selected React. |
| react-native | 0.86.3 | 0.88.0 | 0.88.0 | Expo SDK 58 matrix; current stable. |
| react-native-gesture-handler | 2.32.0 | 3.3.0 | 3.4.0 | Expo-selected minor; upstream RN 0.88 table starts at 3.4 (see research/native verification). |
| react-native-keyboard-controller | 1.21.9 | 1.22.7 | 1.22.8 | Expo-selected native version. |
| react-native-mmkv | 4.3.2 | 4.3.2 | 4.3.2 | Current stable; published peers accepted. |
| react-native-nitro-modules | 0.37.1 | 0.37.1 | 0.37.1 | Current stable; published peers accepted. |
| react-native-purchases | 10.9.0 | 10.15.1 | 10.15.1 | Current stable; published peers accepted. |
| react-native-reanimated | 4.5.1 | 4.7.1 | 4.7.1 | Expo SDK 58 matrix; current stable. |
| react-native-safe-area-context | 5.7.0 | 5.10.1 | 5.10.1 | Expo SDK 58 matrix; current stable. |
| react-native-screens | 4.26.2 | 4.30.0 | 4.30.0 | Expo SDK 58 matrix; current stable. |
| react-native-svg | 15.15.4 | 15.16.0 | 15.16.0 | Expo SDK 58 matrix; current stable. |
| react-native-toast-message | 2.5.0 | 2.5.2 | 2.5.2 | Current stable; published peers accepted. |
| react-native-url-polyfill | 4.0.0 | 4.0.0 | 4.0.0 | Current stable; published peers accepted. |
| react-native-web | 0.21.2 | 0.21.4 | 0.21.4 | Expo SDK 58 matrix; current stable. |
| react-native-webview | 13.16.1 | 14.0.1 | 14.0.1 | Expo SDK 58 matrix; current stable. |
| react-native-worklets | 0.10.1 | 0.13.0 | 0.13.0 | Expo SDK 58 matrix; current stable. |
| tailwind-merge | 3.6.0 | 3.7.0 | 3.7.0 | Current stable; published peers accepted. |
| tailwind-variants | 3.3.1 | 3.3.1 | 3.3.1 | Current stable; published peers accepted. |
| tailwindcss | 4.3.3 | 4.3.3 | 4.3.3 | Current stable; published peers accepted. |
| typescript | 6.0.3 | 6.0.3 | 7.0.2 | Latest TypeScript 6; Expo parser requires <6.1. |
| uniwind | 1.12.0 | 1.13.0 | 1.13.0 | Current stable; published peers accepted. |

## Adaptations and invariants

- Use the stable `expo-router/native-tabs` entry point. Existing tab routes and labels are preserved.
- Preserve RN 0.88 strict types: use TextInstance/TextInputInstance for refs and handle nullable AppState.currentState. The mirrored toast demo has only the necessary ref type edit.
- Masked View 0.3.2 still declares the removed NativeMethods mixin. Its only app usage has a narrow ComponentType<MaskedViewProps> bridge, retaining the publisher's prop contract and actual React component runtime. No global legacy-types opt-out or node_modules patch.
- Keep existing Uniwind Metro/CSS integration, theme tokens, and Reanimated/Worklets pairing. No custom Babel/worklet shim.
- Fix preexisting RevenueCat defects: missing iOS key/unsupported platforms are safe no-ops; concurrent initialization is shared; auth catches SDK failures; offerings load in an effect and ignore results after unmount. Eight isolated Node tests exercise actual transpiled adapter code without live native services.
- Preserve MMKV store IDs, AES-256 session encryption, and SecureStore keys. No data migration or storage reset.
- No new environment variable, database migration, production deployment, purchase, sign-in, or analytics event is introduced.

## Reproducibility and tooling

- Node 22.23.2 and npm 10.9.8 remain the verified toolchain. The framework and Supabase engine requirements are satisfied. No global tools were upgraded.
- Rebuild the lockfile from the reviewed manifest to avoid npm's stale optional-peer resolution pulling react-native-macos through PostHog. No force/legacy-peer-deps or fake optional peers.
- Expo owns exact Metro 0.87.1. The remote Expo versions endpoint still recommends Metro ^0.84.6 as a related tool, conflicting with its own @expo/metro 58.0.0 package. Removing redundant direct declarations avoids that stale check while retaining one consistent 0.87.1 installation. No dependency validation exclusion was added.
- Keep the scoped xcode -> uuid 11.1.1 override for its CommonJS API compatibility.
- `npm run check` now includes `npm run test:integrations` alongside typecheck, zero-warning lint, and Expo alignment. Tests use Node's built-in test runner and existing TypeScript; no test framework dependency.
- GitHub Actions retains the high/critical security gate and runs it after native exports, so upstream advisories do not prevent bundle verification. Local functional checks passing does not mean CI is green while upstream advisories remain.

## Verification

| Check | Current result |
| --- | --- |
| Fresh npm dependency resolution and installed peers | Pass; no force flags or invalid peers. |
| Isolated npm ci from final lockfile | Pass: 908 packages installed, complete peer tree valid, lockfile unchanged; one copy each of Metro/cache/transform-worker 0.87.1. |
| npm run check | Pass: TypeScript, lint, 8 integration tests, Expo alignment. |
| npm run doctor | Pass: 20/20 checks. |
| npm run export:native | Pass: both iOS and Android Hermes bytecode bundles. |
| Fresh iOS generation/pods/codegen | Pass: regenerated SDK 58 project and CocoaPods dependency/codegen resolution. |
| iOS Release compilation and simulator smoke | Blocked by host Xcode compiler discovery hanging before source compilation; both tool-wrapper and direct xcodebuild attempts reproduced it. No SDK 58 launch/runtime pass claimed. |
| Android APK/release runtime | Unverified: Android SDK is not installed; JDK 17 alone is insufficient. |
| Browser/web runtime | Not tested, as instructed. Existing native SecureStore/MMKV adapter has no web implementation. |
| Live Supabase, Apple auth, PostHog, RevenueCat | Unverified; native/export checks use build-only Supabase placeholders and blank optional service keys. |
| npm audit | Fails: 25 high package flags from two unpatched upstream advisories; no critical findings. |

## Native validation limit

The existing ignored iOS project was backed up before SDK 58 prebuild. CocoaPods resolved RN 0.88/Hermes and RevenueCat after refreshing pod specs. A normally signed Release build on the iPhone 17 Pro / iOS 26.5 simulator was attempted with Xcode 26.6 and isolated DerivedData. Xcode stalled during CreateBuildDescription while invoking clang compiler probes (`-v -E -dM ... /dev/null`), before app source compilation. The same probe runs successfully on its own. Retrying direct xcodebuild with output redirected to a file reproduced the stall. This establishes a local build-tool blocker, not a proven dependency source error; native ABI/gesture/runtime compatibility is still unverified. No prior SDK 57 binary was used as evidence. Temporary build-only service settings were confined to the ignored native environment file and restored after both task-specific build processes were stopped. The generated SDK 58 native project remains ignored, and the previous native project backup is preserved. Re-run `npm run ios -- --configuration Release` after resolving the Xcode build-tool stall; do not substitute a previous simulator binary as proof.

## Security findings

The old Router decoder advisory is absent from the new graph. Two new upstream advisories remain:

- [braces stack-exhaustion DoS, GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): latest published 3.0.3 is affected. Reached through micromatch/Metro tooling. [Upstream issue 70](https://github.com/micromatch/braces/issues/70) remains open.
- [node-forge RSA signature verification, GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv): latest published 1.4.0 is affected. Reached through Expo CLI/code-signing-certificate tooling. [Proposed fix PR 1152](https://github.com/digitalbazaar/forge/pull/1152) remains open/unmerged; proposed 1.4.1 release notes are not a published patch.

These two advisories propagate to 25 package flags; they are not 25 independent defects. No direct app import of either library or update-signing certificate configuration is present, but that does not clear the advisories. Do not use npm's suggested downgrades to old Expo/RN packages, weaken the audit gate, or describe this graph as vulnerability-free. Recheck patched releases before production release.

## Running and deployment

Use `nvm use`, `npm ci`, and `npm run check`. Preserve manual native edits before regenerating ignored native folders. Run `npx expo prebuild --platform ios` then `npm run ios` for an existing checkout; `npm run ios` also generates a missing native project. If CocoaPods has stale RevenueCat specs, run `pod install --repo-update` inside ios. SDK 58 supports Xcode 26.4+ / iOS 16.4+; this audit uses Xcode 26.6 and iOS 26.5.

A new native binary is required; this upgrade cannot ship as an OTA-only update. Android requires SDK tools/platform 37 (target SDK 36), then regeneration and an R8-enabled release build/device check. No new env vars or DB migration are required. Existing service setup is still needed to exercise live authentication, analytics, and billing; root auth bypass, onboarding placeholders, and simulated paywalls are unchanged.

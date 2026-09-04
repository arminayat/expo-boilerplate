# Dependency Upgrade Audit

Audited 2026-09-04. All direct runtime and development packages were checked individually against publisher metadata and the [Expo SDK 57 compatibility manifest](https://unpkg.com/expo@57.0.20/bundledNativeModules.json). See [compatibility research](dependency-compatibility-research.md) for release notes and rationale. Versions below are resolved lockfile versions, not claims that every optional service has been exercised.

The committed baseline was SDK 55; incoming uncommitted work had already moved to SDK 56. That work is preserved. The final target is stable SDK 57, not SDK 58 canary. The incoming SDK 56 release export reproduced the Supabase/Hermes dynamic-import error; the upgraded iOS and Android exports both generate Hermes bytecode successfully.

## Package-by-package decisions

| Package | Before (committed range) | Selected | Publisher latest | Decision |
| --- | --- | --- | --- | --- |
| [@babel/core](https://registry.npmjs.org/@babel%2fcore) | ^7.29.0 | 7.29.7 | 8.0.1 | Latest Babel 7 patch; Expo's preset/plugin ecosystem is Babel 7. |
| [@expo-google-fonts/inter](https://registry.npmjs.org/@expo-google-fonts%2finter) | ^0.4.2 | 0.4.2 | 0.4.2 | Current stable; compatible published peers. |
| [@expo-google-fonts/lora](https://registry.npmjs.org/@expo-google-fonts%2flora) | ^0.4.2 | 0.4.2 | 0.4.2 | Current stable; compatible published peers. |
| [@expo-google-fonts/roboto-slab](https://registry.npmjs.org/@expo-google-fonts%2froboto-slab) | ^0.4.2 | 0.4.2 | 0.4.2 | Current stable; compatible published peers. |
| [@expo/ui](https://registry.npmjs.org/@expo%2fui) | ~55.0.17 | 57.0.16 | 57.0.16 | Current stable; compatible published peers. |
| [@expo/vector-icons](https://registry.npmjs.org/@expo%2fvector-icons) | ^15.0.2 | 15.1.1 | 15.1.1 | Current stable; compatible published peers. |
| [@gorhom/bottom-sheet](https://registry.npmjs.org/@gorhom%2fbottom-sheet) | ^5.2.14 | 5.2.14 | 5.2.14 | Current stable; compatible published peers. |
| [@react-native-masked-view/masked-view](https://registry.npmjs.org/@react-native-masked-view%2fmasked-view) | ^0.3.2 | 0.3.2 | 0.3.2 | Current stable; compatible published peers. |
| [@shopify/flash-list](https://registry.npmjs.org/@shopify%2fflash-list) | 2.0.2 | 2.0.2 | 2.3.2 | Keep Expo-tested FlashList; major/minor independence is not a reason to leave the SDK matrix. |
| [@supabase/supabase-js](https://registry.npmjs.org/@supabase%2fsupabase-js) | 2.106.0 | 2.115.0 | 2.115.0 | Upgrade; pin exactly; upstream separates optional tracing and fixes Hermes. |
| [@tanstack/react-query](https://registry.npmjs.org/@tanstack%2freact-query) | ^5.100.11 | 5.102.8 | 5.102.8 | Current stable; compatible published peers. |
| [@types/react](https://registry.npmjs.org/@types%2freact) | ~19.2.14 | 19.2.18 | 19.2.18 | Current stable; compatible published peers. |
| [babel-plugin-module-resolver](https://registry.npmjs.org/babel-plugin-module-resolver) | ^5.0.3 | 5.0.3 | 5.0.3 | Current stable; compatible published peers. |
| [babel-preset-expo](https://registry.npmjs.org/babel-preset-expo) | added | 57.0.10 | 57.0.10 | Declare the tool explicitly for reproducible commands. |
| [clsx](https://registry.npmjs.org/clsx) | ^2.1.1 | 2.1.1 | 2.1.1 | Current stable; compatible published peers. |
| [eslint](https://registry.npmjs.org/eslint) | ^9.25.0 | 9.39.5 | 10.9.1 | Latest compatible 9.x; Expo's React/Import plugins do not admit ESLint 10. |
| [eslint-config-expo](https://registry.npmjs.org/eslint-config-expo) | ~55.0.1 | 57.0.2 | 57.0.2 | Current stable; compatible published peers. |
| [eslint-plugin-react-native](https://registry.npmjs.org/eslint-plugin-react-native) | ^5.0.0 | 5.0.0 | 5.0.0 | Current stable; compatible published peers. |
| [expo](https://registry.npmjs.org/expo) | ^55.0.25 | 57.0.20 | 57.0.20 | Current stable; compatible published peers. |
| [expo-apple-authentication](https://registry.npmjs.org/expo-apple-authentication) | ~55.0.13 | 57.0.1 | 57.0.1 | Current stable; compatible published peers. |
| [expo-blur](https://registry.npmjs.org/expo-blur) | ~55.0.14 | 57.0.2 | 57.0.2 | Current stable; compatible published peers. |
| [expo-constants](https://registry.npmjs.org/expo-constants) | ~55.0.16 | 57.0.17 | 57.0.17 | Current stable; compatible published peers. |
| [expo-crypto](https://registry.npmjs.org/expo-crypto) | ~55.0.15 | 57.0.2 | 57.0.2 | Current stable; compatible published peers. |
| [expo-doctor](https://registry.npmjs.org/expo-doctor) | added | 1.20.4 | 1.20.4 | Declare the tool explicitly for reproducible commands. |
| [expo-font](https://registry.npmjs.org/expo-font) | ~55.0.8 | 57.0.3 | 57.0.3 | Current stable; compatible published peers. |
| [expo-glass-effect](https://registry.npmjs.org/expo-glass-effect) | ~55.0.11 | 57.0.1 | 57.0.1 | Current stable; compatible published peers. |
| [expo-haptics](https://registry.npmjs.org/expo-haptics) | ~55.0.14 | 57.0.2 | 57.0.2 | Current stable; compatible published peers. |
| [expo-image](https://registry.npmjs.org/expo-image) | ~55.0.10 | 57.0.4 | 57.0.4 | Current stable; compatible published peers. |
| [expo-linear-gradient](https://registry.npmjs.org/expo-linear-gradient) | ~55.0.14 | 57.0.1 | 57.0.1 | Current stable; compatible published peers. |
| [expo-linking](https://registry.npmjs.org/expo-linking) | ~55.0.15 | 57.0.9 | 57.0.9 | Current stable; compatible published peers. |
| [expo-network](https://registry.npmjs.org/expo-network) | ~55.0.14 | 57.0.1 | 57.0.1 | Current stable; compatible published peers. |
| [expo-router](https://registry.npmjs.org/expo-router) | ~55.0.15 | 57.0.19 | 57.0.19 | Current stable; compatible published peers. |
| [expo-secure-store](https://registry.npmjs.org/expo-secure-store) | ~55.0.14 | 57.0.3 | 57.0.3 | Current stable; compatible published peers. |
| [expo-splash-screen](https://registry.npmjs.org/expo-splash-screen) | ~55.0.21 | 57.0.8 | 57.0.8 | Current stable; compatible published peers. |
| [expo-status-bar](https://registry.npmjs.org/expo-status-bar) | ~55.0.6 | 57.0.1 | 57.0.1 | Current stable; compatible published peers. |
| [expo-symbols](https://registry.npmjs.org/expo-symbols) | ~55.0.9 | 57.0.2 | 57.0.2 | Current stable; compatible published peers. |
| [expo-system-ui](https://registry.npmjs.org/expo-system-ui) | ~55.0.18 | 57.0.3 | 57.0.3 | Current stable; compatible published peers. |
| [expo-updates](https://registry.npmjs.org/expo-updates) | ~55.0.23 | 57.0.21 | 57.0.21 | Current stable; compatible published peers. |
| [expo-web-browser](https://registry.npmjs.org/expo-web-browser) | ~55.0.16 | 57.0.2 | 57.0.2 | Current stable; compatible published peers. |
| [heroui-native](https://registry.npmjs.org/heroui-native) | 1.0.3 | 1.0.9 | 1.0.9 | Current stable; compatible published peers. |
| [lucide-react-native](https://registry.npmjs.org/lucide-react-native) | ^1.16.0 | 1.41.0 | 1.41.0 | Current stable; compatible published peers. |
| [metro](https://registry.npmjs.org/metro) | added | 0.84.5 | 0.87.0 | Explicit Uniwind peer aligned with Expo's Metro, not standalone latest. |
| [metro-cache](https://registry.npmjs.org/metro-cache) | added | 0.84.5 | 0.87.0 | Keep the Metro tools on the same version. |
| [metro-transform-worker](https://registry.npmjs.org/metro-transform-worker) | added | 0.84.5 | 0.87.0 | Keep the Metro tools on the same version. |
| [pod-install](https://registry.npmjs.org/pod-install) | added | 1.1.0 | 1.1.0 | Declare the tool explicitly for reproducible commands. |
| [posthog-react-native](https://registry.npmjs.org/posthog-react-native) | ^4.45.0 | 4.67.0 | 4.67.0 | Current stable; compatible published peers. |
| [prettier](https://registry.npmjs.org/prettier) | added | 3.9.6 | 3.9.6 | Declare the tool explicitly for reproducible commands. |
| [prettier-plugin-tailwindcss](https://registry.npmjs.org/prettier-plugin-tailwindcss) | ^0.8.0 | 0.8.1 | 0.8.1 | Upgrade; development-only, remove duplicate runtime dependency. |
| [react](https://registry.npmjs.org/react) | 19.2.0 | 19.2.3 | 19.2.8 | Keep Expo-selected React/renderer pair. |
| [react-dom](https://registry.npmjs.org/react-dom) | 19.2.0 | 19.2.3 | 19.2.8 | Keep Expo-selected React/renderer pair. |
| [react-native](https://registry.npmjs.org/react-native) | 0.83.6 | 0.86.3 | 0.87.1 | Use Expo 57's RN 0.86.3, not standalone RN 0.87. |
| [react-native-gesture-handler](https://registry.npmjs.org/react-native-gesture-handler) | ~2.30.0 | 2.32.0 | 3.2.1 | Keep SDK 57 gesture minor; HeroUI also requires 2.x. |
| [react-native-keyboard-controller](https://registry.npmjs.org/react-native-keyboard-controller) | 1.20.7 | 1.21.9 | 1.22.4 | Keep Expo-tested keyboard native binary. |
| [react-native-mmkv](https://registry.npmjs.org/react-native-mmkv) | ^4.3.1 | 4.3.2 | 4.3.2 | Current stable; compatible published peers. |
| [react-native-nitro-modules](https://registry.npmjs.org/react-native-nitro-modules) | 0.35.0 | 0.37.1 | 0.37.1 | Upgrade alongside MMKV; native build/runtime required. |
| [react-native-purchases](https://registry.npmjs.org/react-native-purchases) | ^10.1.1 | 10.9.0 | 10.9.0 | Current stable; compatible published peers. |
| [react-native-reanimated](https://registry.npmjs.org/react-native-reanimated) | 4.2.1 | 4.5.1 | 4.6.0 | Upgrade together with Worklets; 4.6 requires Worklets 0.12. |
| [react-native-safe-area-context](https://registry.npmjs.org/react-native-safe-area-context) | ~5.6.2 | 5.7.0 | 5.9.1 | Keep SDK 57 native minor. |
| [react-native-screens](https://registry.npmjs.org/react-native-screens) | ~4.23.0 | 4.26.2 | 4.27.0 | Keep SDK 57 native minor. |
| [react-native-svg](https://registry.npmjs.org/react-native-svg) | 15.15.3 | 15.15.4 | 15.15.5 | Keep Expo-tested native binary. |
| [react-native-toast-message](https://registry.npmjs.org/react-native-toast-message) | ^2.3.3 | 2.5.0 | 2.5.0 | Current stable; compatible published peers. |
| [react-native-url-polyfill](https://registry.npmjs.org/react-native-url-polyfill) | ^3.0.0 | 4.0.0 | 4.0.0 | Current stable; compatible published peers. |
| [react-native-web](https://registry.npmjs.org/react-native-web) | ~0.21.0 | 0.21.2 | 0.21.2 | Current stable; compatible published peers. |
| [react-native-webview](https://registry.npmjs.org/react-native-webview) | 13.16.0 | 13.16.1 | 14.0.1 | Keep Expo-tested native binary; no unreviewed major upgrade. |
| [react-native-worklets](https://registry.npmjs.org/react-native-worklets) | 0.7.4 | 0.10.1 | 0.12.1 | Keep Reanimated 4.5.1-compatible 0.10.x. |
| [tailwind-merge](https://registry.npmjs.org/tailwind-merge) | ^3.6.0 | 3.6.0 | 3.6.0 | Current stable; compatible published peers. |
| [tailwind-variants](https://registry.npmjs.org/tailwind-variants) | ^3.2.2 | 3.3.1 | 3.3.1 | Current stable; compatible published peers. |
| [tailwindcss](https://registry.npmjs.org/tailwindcss) | ^4.3.0 | 4.3.3 | 4.3.3 | Current stable; compatible published peers. |
| [typescript](https://registry.npmjs.org/typescript) | ~5.9.2 | 6.0.3 | 7.0.2 | Keep 6.0.3; Expo ESLint parser supports TypeScript <6.1, not 7. |
| [uniwind](https://registry.npmjs.org/uniwind) | 1.6.5 | 1.12.0 | 1.12.0 | Upgrade with matching Tailwind 4.3.3 compiler. |

## Tooling and configuration

- npm 10.9.8 and Node 22.23.2 are the verified local toolchain. `.nvmrc`, `engines`, and `packageManager` now document the requirements. Supabase requires Node >=22; the RN and tooling engine constraints also apply. No global tool installation is required.
- Babel 8, ESLint 10, TypeScript 7, React Native 0.87, and SDK 58 canaries are intentionally not mixed into the compatible set. A newer independent version is not necessarily an app upgrade.
- Xcode 26.6, iOS 26.5 simulator runtime, CocoaPods 1.16.2, and JDK 17.0.19 are available locally. Android SDK is absent, so a local Android APK build is not verified.
- Clean npm resolution avoids an [npm optional-peer update bug](https://github.com/npm/cli/issues/9807). No `--force`, `--legacy-peer-deps`, or fake macOS/localization peers are used. `npm ci` and full installed dependency-tree validation pass.
- Add `check`, `typecheck`, `doctor`, and `export:native`; make `ios` simulator-friendly and preserve device selection under `ios:device`. Replace the broken Bundler-based pod command with pinned `ios:pods`; remove `reset-project`, whose script did not exist.
- Declare Prettier, Expo Doctor, CocoaPods helper, and Babel preset directly. Keep the Tailwind Prettier plugin only in devDependencies. Remove the redundant HeroUI CSS source declaration now owned by the library.
- Normalize app/package versions to `1.0.0` for native build metadata. Keep existing app identity, encrypted session store IDs/keys, provider structure, native tabs, and demo behavior.
- Load the already-declared Inter/Lora fonts used by native headers and toasts before rendering routes; derive the demo's HeroUI badge from the installed library version. React component changes were checked for hook ordering and safe loading/error behavior.
- Pin Uniwind's otherwise-unbounded Metro peers to Expo's `0.84.5`. This removes a redundant Metro 0.87 toolchain and its vulnerable `image-size` dependency. Use a scoped `xcode -> uuid: 11.1.1` override; its CommonJS `v4()` consumer passes project parsing, 1,000 unique ID generations, and project serialization checks. This is not a global UUID or framework override.
- GitHub Actions validates clean installs, TypeScript, zero-warning lint, Expo alignment/Doctor, installed peers, and native Hermes production exports on main pushes and pull requests. It uses build-only Supabase placeholders, not project credentials; it does not exercise auth or deploy.
- CI blocks high/critical npm advisories. The current moderate Router advisory remains visible in audit output and in this report.

## Verification and limitations

- Passed: clean npm install, TypeScript, lint (zero warnings), Expo alignment, Expo Doctor (21/21), dependency-tree validation, iOS and Android Hermes production exports.
- The first remote CI run caught a clean-checkout TypeScript error for `global.css`, masked locally by ignored `expo-env.d.ts`. Reproduced locally after moving generated Expo files aside, then fixed with a checked-in `expo/types` reference in `src/types/expo-runtime.d.ts`. This uses Expo's own asset declarations and does not relax TypeScript's side-effect import checking.
- Passed: regenerated iOS project, CocoaPods installation (125 pods), and a normally signed Release build/run on iPhone 17 Pro / iOS 26.5 using Xcode 26.6. The final native build log ends in `BUILD SUCCEEDED`; the app launches and displays the HeroUI 1.0.9 demo. Native MMKV/Nitro/SecureStore initialization no longer blocks startup. Third-party compiler and simulator warnings remain; this is not a warning-free native build.
- Simulator smoke checks covered Home/Profile/demo navigation, the component catalog, light/dark theme switching, dialog open/close, bottom-sheet open/dismiss through its button, and text entry. These are targeted runtime checks, not automated coverage of all 38 component examples. Final rebuild startup/navigation/version display were rechecked; further desktop interactions stopped when the Mac locked. Drag gestures, checkbox state changes, real sign-in, session persistence, purchases, and analytics are not certified by this smoke test.
- An initial test build with simulator code signing explicitly disabled crashed at SecureStore because Keychain entitlements were unavailable. Rebuilding with normal simulator signing fixed the test setup; no storage downgrade or entitlement workaround was added to app code. The final full-build tool request timed out while Xcode continued; both the completed build log and running final app were checked independently.
- Web static export currently fails in native SecureStore session initialization (`getValueWithKeySync is not a function`). Native encrypted MMKV/SecureStore session storage has no web adapter. This pre-existing platform boundary is not bypassed with plaintext browser storage. HeroUI Native also does not promise web support. No browser testing was performed.
- Existing product limitations remain: onboarding/tab placeholders, root auth bypass, simulated paywalls, no Android RevenueCat configuration, and no configured EAS project. Blank local PostHog/RevenueCat keys mean live tracking and purchases cannot be verified. No database migration or new service secret is introduced.
- A read-only request to the configured Supabase Auth settings endpoint failed DNS resolution (`ENOTFOUND`), so live backend/auth compatibility is not verified. No test account, purchase, analytics event, or database mutation was created.

## Running and deployment

Use the Node version in `.nvmrc`, run `npm ci`, then `npm run ios` for a local simulator build. This native dependency upgrade requires a new native binary; an OTA-only update is insufficient. Native folders are generated/ignored, so preserve any manual native edits before Expo regeneration. The previous local iOS folder was retained in a temporary backup during this audit.

No database migration or new environment variable is needed. Existing Supabase and optional service configuration must be valid to exercise those integrations. Android still requires an installed Android SDK and a separate APK/device verification. No EAS project, signing/distribution workflow, or production deployment is configured or claimed. GitHub Actions is a dependency/export validation gate, not a signed native build or deployment.

## Removed direct packages

The incoming SDK 56 migration removed `@react-navigation/bottom-tabs` (^7.15.5), `@react-navigation/elements` (^2.9.18), and `@react-navigation/native` (^7.1.33). Those removals are retained: Expo Router now owns the navigation implementation and app imports use its public router/react-navigation entry points. The Tailwind Prettier plugin's runtime declaration was removed, but its upgraded development dependency remains.

## Security audit

The incoming lockfile reported 29 findings (1 critical, 11 high, 16 moderate, 1 low). The upgraded/remediated graph reports **3 moderate, 0 high, 0 critical, 0 low**. These are one remaining advisory propagated through `expo-router -> query-string@7.1.3 -> decode-uri-component@0.2.2`: [malformed percent-encoding denial of service](https://github.com/advisories/GHSA-vcc3-ghjq-m6fr). Do not claim a clean audit.

The fixed decoder 0.5.0 is ESM, while query-string 7 expects a CommonJS function; replacing it directly is not compatible. npm's proposed fix downgrades Expo Router to 5.1.11, outside SDK 57. A router-compatible upstream fix or separately tested patch is required. The advisory remains relevant to untrusted URL handling and should be resolved before a public production release; it is not dismissed as development-only.

The high-severity `image-size` chain disappeared when aligning Metro with Expo; UUID's advisory disappeared with the scoped, verified tooling override. Registry security endpoints intermittently timed out; the counts above are from a completed full `npm audit --json`, not a failed/partial check. Deprecation notices remain for ESLint 9 and transitive glob 9; their replacements are not blindly forced across the current Expo/ESLint peer contracts.

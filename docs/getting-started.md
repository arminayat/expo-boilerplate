# Getting started

This guide takes a fresh clone to a native development build. It does not deploy a backend or publish an app.

## 1. Prepare the toolchain

- Node.js 22.23.2 and npm 10.9.8. Run `nvm use` if you use nvm.
- iOS: macOS, Xcode 26.4 or newer, an installed iOS simulator runtime, and CocoaPods. The SDK 58 minimum iOS target is 16.4.
- Android: Android Studio, JDK 17, an Android SDK installation with platform 37 and build tools, plus an emulator or attached device. Configure `ANDROID_HOME` and add the SDK platform-tools directory to `PATH`. SDK 58 targets API 36 and supports Android 7 or later.
- A Supabase project you control.

Use the local Expo CLI through `npx expo`. Expo Go cannot load this project's MMKV/Nitro and RevenueCat native modules.

## 2. Clone and install

```sh
git clone https://github.com/arminayat/expo-boilerplate.git
cd expo-boilerplate
npm ci
cp .env.example .env
```

For your own app, use GitHub's **Use this template** button or fork the repository. A template gives you a new repository; a fork is useful when you plan to contribute changes upstream.

## 3. Configure services

All `EXPO_PUBLIC_*` values are visible in the client bundle. Never put a Supabase service-role/secret key, OpenAI secret key, signing key, or webhook secret in them. `.env` and its variants are ignored; keep `.env.example` free of credentials.

| Variable | Required | Meaning |
| --- | --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | Yes | Your project's HTTPS URL from Supabase project settings. |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Yes | Publishable key or legacy anon key. The variable name is retained for compatibility. |
| `EXPO_PUBLIC_POSTHOG_API_KEY` | No | PostHog project key. The configured host is `https://eu.i.posthog.com`; adapt the provider if your project uses another region. |
| `EXPO_PUBLIC_APPLE_PURCHASES_API_KEY` | No | RevenueCat's public iOS SDK key. There is no Android purchase configuration yet. |
| `EXPO_PUBLIC_WEB_PASSWORD_RESET_URL` | Only for reset emails | Your own password-reset completion page. Add it to Supabase Auth's allowed redirect URLs. |

### Supabase

Enable email/password authentication for your project. Configure confirmation behavior and allowed redirect URLs according to your app. The sign-up screen creates an auth user; it does not create a database profile row. The reset form sends an email but does not implement reset completion.

Basic sign-in and profile display use Supabase Auth and do not require the sample domain tables. The checked-in `src/lib/supabase/types.ts` is inherited example schema, not a database migration. `useUser().updateProfile()` expects a `profile` table, and the unused recent-updates hook expects `received_emails`. Supply your own schema and ownership-based RLS before using either table path, or remove the unused examples. Never treat client routing as database authorization.

To generate types for your own existing schema:

```sh
npx supabase login
npm run generate-types -- YOUR_PROJECT_ID
npm run typecheck
```

The helper runs the Supabase CLI and replaces the types file only after successful generation. Align or remove sample table-specific hooks when your schema differs. Generation is read-only against your database; this repository does not apply migrations or create tables.

### Optional analytics and billing

Leave the PostHog key blank to use its disabled in-memory client. Supplying a key enables the configured lifecycle/explicit event tracking; consider your app's privacy and consent requirements.

Leave the RevenueCat key blank to skip its SDK calls. To enable iOS integration, configure your own RevenueCat app, bundle ID, store products, and offerings, then set the public SDK key. The adapter initializes/logs in and can read offerings. Showcase buttons remain simulations; implement and test your own purchase/restore flow before release.

### Apple sign-in

The iOS sign-in source is included, but the starter does not provision the Apple capability or Supabase provider. Before using it, configure your app identifier and Apple Sign In capability, add the `expo-apple-authentication` config plugin and `ios.usesAppleSignIn: true`, configure the Supabase Apple provider, and rebuild. Follow the [Expo Apple Authentication guide](https://docs.expo.dev/versions/latest/sdk/apple-authentication/) and [Supabase Apple guide](https://supabase.com/docs/guides/auth/social-login/auth-apple). Native provider/device acceptance is your responsibility; it has not been verified here.

## 4. Build and explore

```sh
npm run ios
# Or, with an Android emulator running:
npm run android
```

The first native run generates the ignored platform directory. For a physical iOS device, use `npm run ios:device` and configure signing in your Apple account. Once a matching native binary is installed, `npm start` runs Metro for JavaScript development.

The app opens **Home** in the three-tab shell. The profile tab's **Demo** button opens Components, Themes, and Showcases. Auth screens are separate `/sign-in`, `/sign-up`, and `/forget-password` routes. Add your own navigation to them or change the root redirect when implementing a gated product.

## 5. Make it your app

1. Change the display name, slug, URL scheme, `ios.bundleIdentifier`, and `android.package` in `app.json`. Defaults still identify the HeroUI demo shell; choose identifiers you own.
2. Replace icons, splash images, auth logo, and demonstration branding. Review [NOTICE](../NOTICE) and [asset notices](third-party-notices.md).
3. Build your product routes in `src/app/(tabs)` and replace the placeholder onboarding/settings screens.
4. Set the unauthenticated redirect in `src/app/index.tsx` to your intended route. The current shell deliberately allows signed-out access.
5. Replace sample schema types and hooks with your own data model and server-side authorization. Theme files live at the repository root under `themes/`.
6. Remove the demo routes/supporting assets if you do not need the gallery. They include example store links and remote HeroUI-hosted imagery; adapt store/update helpers to your own app before release.
7. Rebuild whenever native dependencies, plugins, identifiers, or entitlements change.

## 6. Validate

```sh
npm run check
npm run doctor
npm ls --all --omit=optional
npm run export:native
npm audit --audit-level=high
```

`check` covers TypeScript, lint, eight isolated RevenueCat tests, and Expo alignment. Hermes exports verify production bundle compilation, not native ABI compatibility or live auth/billing behavior. The audit currently fails on two unpatched upstream advisories; see the [dependency audit](dependency-upgrade-audit.md). Do not suppress the security gate just to get a green check.

## Troubleshooting

| Symptom | Next step |
| --- | --- |
| Invalid Supabase URL/key on startup | Fill both required values in `.env` and restart Metro. The URL must be a real HTTPS project URL, not the project ID alone. |
| Missing native module / works in Metro but not on device | Rebuild the native app; Expo Go and an old native binary cannot provide new modules. |
| Stale CocoaPods specs, including PurchasesHybridCommon | After the iOS folder exists, run `pod install --repo-update` inside `ios/`. |
| Stale native project after an SDK change | Preserve any manual native edits, then run `npx expo prebuild --platform ios` or `--platform android` and rebuild. Prebuild regenerates native files. |
| SecureStore/Keychain error in a simulator | Use normal simulator signing and entitlements; disabling signing can break Keychain access. |
| Android SDK not found | Install the SDK and configure its location/`ANDROID_HOME`; installing Java alone is insufficient. |
| Web export/runtime fails in storage | Web has no session-storage adapter. Do not replace encrypted sessions with plaintext browser storage as a quick workaround. |
| Xcode stalls at compiler discovery | The October 2026 audit reproduced this local toolchain issue before app compilation. See the audit; native runtime validation remains open. |

## Deployment

No EAS project or `eas.json` is included. Configure your own Expo/EAS project, build profiles, signing, store listings, backend, and service credentials. This dependency set requires a new native binary, not an OTA-only update. Test real sign-in/reset, session persistence, accessibility, and any enabled analytics/billing on your supported devices before distribution. The current public starter has no production-readiness certification or support SLA.

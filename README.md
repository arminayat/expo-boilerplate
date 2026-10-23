# Expo Boilerplate

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Validate app](https://github.com/arminayat/expo-boilerplate/actions/workflows/validate.yml/badge.svg)](https://github.com/arminayat/expo-boilerplate/actions/workflows/validate.yml)

A native-first React Native starter for building your own iOS and Android app with **Expo Router, HeroUI Native, Uniwind, and Supabase**. Includes a working component gallery, theme examples, encrypted session storage, and optional analytics and billing adapters.

This is an independent community project, not an official Expo or HeroUI product. It is a starting point, not a finished production app: the main tabs and onboarding are placeholders, and showcase paywalls simulate purchases.

[Getting started](docs/getting-started.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Dependency audit](docs/dependency-upgrade-audit.md)

## Features

| Area | Included |
| --- | --- |
| Navigation | File-based Expo Router routes, native tabs, auth screens, modal routes, and a demo stack. |
| UI | HeroUI Native component examples and composed showcases, icons, keyboard handling, haptics, and Reanimated animations. |
| Themes | Default, lavender, mint, and sky themes, each with light and dark variants, through Uniwind and Tailwind CSS. |
| Authentication | Supabase email/password sign-in, sign-up, reset-email request, and sign-out; iOS Apple sign-in source is included but requires your native/provider setup. |
| Session storage | MMKV v4 with AES-256 encryption; the encryption key is held in Expo SecureStore. |
| Data access | Typed Supabase client, TanStack Query, and an in-memory signed-URL cache. |
| Optional services | PostHog EU-hosted analytics and iOS RevenueCat initialization/login/offering helpers; both tolerate an absent optional key. |
| Developer tooling | Strict TypeScript, ESLint, isolated adapter tests, Expo Doctor, native Hermes exports, and GitHub Actions. |

## Quick start

You need Node.js **22.23.2** (see [.nvmrc](.nvmrc)), npm **10.9.8**, and a Supabase project. Native builds require Xcode/CocoaPods on macOS or Android Studio/JDK 17 with the Android SDK.

```sh
git clone https://github.com/arminayat/expo-boilerplate.git
cd expo-boilerplate
nvm use                    # If you use nvm; otherwise install the Node version above
npm ci
cp .env.example .env
```

Set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `.env` using your own project's URL and publishable key (or legacy anon key). Leave PostHog and RevenueCat blank until you configure them. Then:

```sh
npm run ios               # Build and launch on an iOS simulator
# or
npm run android           # Build and launch on an Android emulator/device
```

**Use a native build, not Expo Go.** MMKV/Nitro and RevenueCat require native modules. For platform setup, auth configuration, troubleshooting, and adapting the starter, follow the [getting-started guide](docs/getting-started.md).

The initial route opens the tab shell even when signed out. Open the profile tab → **Demo** for the gallery. Auth forms exist at `/sign-in`, `/sign-up`, and `/forget-password`; the main shell does not currently enforce an auth gate.

## Stack

| Layer | Current compatibility set |
| --- | --- |
| Framework | Expo SDK 58, Expo Router 58, React Native 0.88, React 19.3 |
| UI and styling | HeroUI Native 1.0.11, Uniwind 1.13, Tailwind CSS 4.3 |
| Motion | Reanimated 4.7.1 + Worklets 0.13 |
| Services | Supabase JS 2.118, TanStack Query 5, PostHog 4, RevenueCat 10 |
| Storage | MMKV 4, Nitro Modules, Expo SecureStore |

Exact versions live in [package.json](package.json) and [package-lock.json](package-lock.json). React Native and native modules follow Expo's compatibility matrix; an independent `latest` tag is not always compatible. See the [version decisions](docs/dependency-upgrade-audit.md).

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start Metro with a cleared cache for an existing native build. |
| `npm run ios` / `npm run ios:device` | Build for an iOS simulator / select a physical device. |
| `npm run android` | Build for Android. |
| `npm run check` | Typecheck, zero-warning lint, adapter tests, and Expo version alignment. |
| `npm run doctor` | Check Expo configuration and native dependencies. |
| `npm run export:native` | Export iOS and Android production bundles with Hermes bytecode. |
| `npm run test:integrations` | Run isolated RevenueCat adapter tests without live service calls. |
| `npm run ios:pods` | Install pods for an existing generated iOS project. |
| `npm run generate-types -- YOUR_PROJECT_ID` | Generate types from your Supabase schema without overwriting the file on failure. |
| `npm audit --audit-level=high` | Check security advisories; known upstream findings currently fail this gate. |

## Project layout

```text
src/app/          Routes, auth screens, tab shell, and demo gallery
src/components/   Shared UI and showcase components
src/contexts/     Auth, theme, signed-URL cache, and provider composition
src/hooks/        Shared app hooks
src/lib/          Service clients, adapters, and sample database types
src/storage/      Encrypted sessions and local app/onboarding configuration
themes/           Uniwind theme CSS
scripts/          Local validation and type-generation tools
docs/             Setup guide, architecture notes, and dependency evidence
```

Generated `ios/`, `android/`, `.expo/`, and build output are ignored. [AGENTS.md](AGENTS.md) indexes the implementation notes for contributors and coding agents.

## Current limitations

- Auth gating is bypassed at the root; adapt it before adding private screens. The starter does not enforce database authorization for you.
- Main tabs, app onboarding, and settings are placeholders. Paywall showcases do not purchase or restore subscriptions. Android RevenueCat is not configured.
- `useUser()` reads Supabase Auth user data. Its optional table-update helper and the checked-in sample database types are not a provisioned schema; there are no bundled database migrations.
- Password-reset completion needs your own web page. Apple sign-in needs your own identifiers, entitlements, and Supabase provider configuration.
- Web is experimental: encrypted native session storage has no web adapter, and HeroUI Native does not guarantee web support.
- As of October 23, 2026, local clean installation, types, lint, eight adapter tests, Expo Doctor, and both Hermes exports pass. iOS native verification was blocked by a local Xcode compiler-probe stall; Android native and live service flows remain unverified.
- Two unpatched upstream advisories in `braces` and `node-forge` currently fail the security gate. Do not interpret bundle checks as production readiness. See [SECURITY.md](SECURITY.md) and the [audit](docs/dependency-upgrade-audit.md).

## Contributing and support

Bug reports, focused fixes, documentation improvements, and small reusable improvements are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request and follow the [code of conduct](CODE_OF_CONDUCT.md).

Use [GitHub issues](https://github.com/arminayat/expo-boilerplate/issues) for reproducible bugs and feature proposals. Report vulnerabilities through the [private security channel](SECURITY.md), not a public issue. Maintenance is best-effort; there is no support SLA.

## License and credits

Licensed under **[Apache License 2.0](LICENSE)**. The gallery and supporting components adapt the [HeroUI Native example](https://github.com/heroui-inc/heroui-native/tree/main/example), with attribution preserved in [NOTICE](NOTICE). Dependencies retain their own licenses. Demo imagery, product names, and logos do not grant trademark rights or imply endorsement; replace demo branding before publishing your own app.

`private: true` in `package.json` prevents accidental npm publication; it does not make this GitHub repository private.

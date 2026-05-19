# Architecture And Tools

## High-Level Architecture

This is a client-only Expo Router app. The app uses file-based routes in `src/app`, global providers in `src/contexts`, Supabase for auth/data/storage access, TanStack Query for server-state reads, MMKV/SecureStore for local storage, Uniwind plus HeroUI Native for styling, and demo-specific components under `src/components`.

There is no local backend runtime in the repository. Backend behavior is assumed to live in Supabase and external services.

## Runtime And Framework Versions

Source of truth: `package.json` and `package-lock.json`.

- Package manager: npm. `package-lock.json` lockfile version 3 is present; no yarn, pnpm, or bun lockfile is present.
- Entry point: `expo-router/entry`.
- Expo: `^55.0.25`.
- Expo Router: `~55.0.15`.
- React: `19.2.0`.
- React Native: `0.83.6`.
- TypeScript: `~5.9.2`.
- HeroUI Native: `1.0.3` pinned exactly.
- Supabase JS: `2.106.0` pinned exactly.
- React Native New Architecture: SDK 55 only supports the New Architecture; no explicit `newArchEnabled` flag is needed in `app.json`.
- Expo experiments: typed routes and React Compiler are enabled in `app.json`.
- Expo SDK boundary: dependencies are currently held on SDK 55-compatible versions. SDK 55 uses React Native `0.83.x`; do not jump to React Native `0.85.x` or Expo SDK 56-era native package versions as a "safe dependency update" without treating it as a framework upgrade.

## Important Config Files

- `app.json`: app identity, Expo plugins, splash config, web static output, typed routes, and React Compiler. Current plugins include `expo-router`, `expo-splash-screen`, `expo-secure-store`, `expo-web-browser`, `expo-font`, and `expo-image`.
- `package.json`: scripts, dependencies, npm package metadata.
- `package-lock.json`: npm lockfile.
- `tsconfig.json`: extends Expo base config, strict mode, `@/*` path alias to `src/*`.
- `babel.config.js`: Expo preset and module-resolver alias `@` to `./src/`.
- `metro.config.js`: Expo Metro config wrapped by `withUniwindConfig`, with `global.css`, generated Uniwind types, and extra themes.
- `global.css`: imports Tailwind CSS, Uniwind, HeroUI Native styles, and project theme files.
- `eslint.config.js`: Expo flat ESLint config, ignores `dist/*`, registers `eslint-plugin-react-native`, and disables `react/no-unescaped-entities` for copied demo/example copy.
- `src/types/expo-router-relaxed.d.ts`: local type shim that lets `useRouter()` accept plain string hrefs used by mirrored HeroUI Native example routes while `app.json` typed routes remain enabled.
- `.prettierrc`: enables `prettier-plugin-tailwindcss`.
- `.env.example`: documents environment variable names.

## Routing And Entry Points

- Root layout: `src/app/_layout.tsx`.
- Root redirect screen: `src/app/index.tsx`.
- Auth group: `src/app/(auth)/`.
- Main tabs: `src/app/(tabs)/`.
- Onboarding group: `src/app/(onboarding)/`.
- Demo group: `src/app/(demo)/`.

Root stack currently declares `(auth)`, `(tabs)`, `(demo)`, `(settings)`, and `+not-found`. `(settings)` and `+not-found` are not implemented as files.

## Provider Stack

Implemented provider order:

1. `GestureHandlerRootView`
2. `KeyboardProvider`
3. `PostHogProvider`
4. `AuthProvider`
5. `QueryClientProvider`
6. `SignedUrlCacheProvider`
7. `AppThemeProvider`
8. `HeroUINativeProvider` inside `src/app/_layout.tsx`
9. Expo Router stack
10. Global `react-native-toast-message` toast host

## State And Data Layer

- Auth state: `AuthProvider` reads `supabase.auth.getSession()` and listens to `supabase.auth.onAuthStateChange()`.
- Server state: TanStack Query via a shared `queryClient` in `src/lib/queryClient.ts`.
- Profile data: `useUser()` currently reads Supabase Auth user data through `supabase.auth.getUser()`. It does not fetch the `profile` table on read.
- Profile mutation: `useUser().updateProfile()` updates Supabase `profile` rows by `id`, matching the generated `profile` table type.
- Recent updates: `useGetRecentUpdates()` reads `received_emails`, but it is unused by routes.
- Local config: `configStorage` MMKV instance stores app config such as intended `usage_priorities`.
- Local onboarding: `onboardingStorage` MMKV instance stores device and push-notification onboarding flags.
- Session persistence: Supabase Auth uses `src/storage/session.ts`, an AsyncStorage-like wrapper over encrypted MMKV v4. The AES-256 encryption key is stored in Expo SecureStore.
- Signed URLs: `SignedUrlCacheProvider` caches Supabase Storage signed URLs in memory only.

## Backend, API, And Database Status

Implemented:

- Supabase JS client configured in `src/lib/supabase/client.ts`.
- Supabase auth session persistence and auto-refresh tied to `AppState`.
- Generated Supabase Database types in `src/lib/supabase/types.ts`.

Not present:

- Local server code.
- Expo API routes.
- Database migrations.
- Drizzle/Prisma config.
- Supabase CLI config.
- Webhook handlers.
- Background jobs or cron config.

Generated Supabase types include many tables/views/functions for agents, articles, summaries, collections, conversations, documents, emails, newsletters, profiles, RSS, products, prices, subscriptions, and vector search. Only auth, `profile` update, `received_emails` read, and storage signed URLs are directly referenced in app code.

## Major Entities Or Domain Models

Implemented or directly referenced:

- Supabase `Session` and auth `User`.
- `UserProfile` in `src/hooks/useUser.ts`: Supabase Auth `User` plus locally expected `full_name` and `onboarding_completed_at` fields.
- `TTab` in `src/types/appConfig.ts`: `"tab1" | "tab2" | "tab3"`.
- `TBucket` in `src/types/index.ts`: placeholder `"bucket_name"`.
- Theme names in `src/contexts/app-theme-context.tsx`: default light/dark plus lavender, mint, and sky variants.

Backend types available but mostly not implemented in UI:

- `profile`, `received_emails`, `collection`, `article`, `article_summary`, `agent`, `newsletter`, `rss_item`, `documents`, `subscriptions`, `products`, `prices`, and related views/functions.

## External Integrations

- Supabase: auth, database, storage signed URLs.
- PostHog: provider configured with EU host. Autocapture is currently disabled with `autocapture={false}`, while lifecycle capture is enabled through `options.captureAppLifecycleEvents`.
- RevenueCat: helper functions configure/login/logout and fetch offerings. iOS API key is supported; Android configuration is commented out.
- Apple Authentication: iOS sign-in with Supabase ID token.
- Expo SecureStore: stores the MMKV v4 AES-256 encryption key for session storage.
- React Native MMKV v4: local session, onboarding, and config stores.
- React Native Nitro Modules: native runtime peer required by React Native MMKV v4.
- Expo Network: informs TanStack Query online manager.
- Remote HeroUI asset host: demo cards/showcases load images from `https://heroui-assets.nyc3.cdn.digitaloceanspaces.com`.

## Environment Variables

Referenced by code:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_POSTHOG_API_KEY`
- `EXPO_PUBLIC_APPLE_PURCHASES_API_KEY`
- `EXPO_PUBLIC_WEB_PASSWORD_RESET_URL`

Listed in `.env.example` but not referenced by current code:

- `SENTRY_AUTH_TOKEN`
- `EXPO_PUBLIC_SENTRY_DSN`
- `OPENAI_API_KEY`
- `REVENUECAT_WEBHOOK_AUTH`

## Background Or Async Flows

- Supabase auth auto-refresh starts/stops based on React Native `AppState`.
- Auth state changes identify users in PostHog and log in to RevenueCat.
- TanStack Query online state follows Expo Network connectivity.
- `useRefreshOnFocus()` helper refetches after screen focus, but it is not currently wired into route code.
- Demo animations use Reanimated and local state.
- No durable background processing is implemented in this repo.

## Testing, Build, And Deployment Tooling

- Lint command: `npm run lint` -> `expo lint`.
- No test command, test config, or test files are present.
- Native commands: `npm run ios`, `npm run android`, `npm run pod-install`.
- No `ios/` directory exists in the current working tree; `npm run pod-install` is not usable until a native iOS project exists.
- Web command: `npm run web`; `app.json` sets web output to `static`.
- EAS deployment is described in the README but no `eas.json` exists.
- `npx expo install --check` and `npx expo-doctor` currently pass for the SDK 55 dependency set.
- `npx expo export -p ios --clear --output-dir /private/tmp/expo-boilerplate-export-ios` currently passes.
- `npx tsc --noEmit` currently passes.
- `npm run lint` currently passes with warnings from copied demo/example code, mostly unused demo variables, unused `react-native/no-inline-styles` disable comments, `Array<T>` style warnings, one `require()` style import, and hook dependency warnings.
- `npm audit --audit-level=moderate` currently reports no vulnerabilities.

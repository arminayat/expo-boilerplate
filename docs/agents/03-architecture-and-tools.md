# Architecture And Tools

## High-Level Architecture

This is a client-only Expo Router app. The app uses file-based routes in `src/app`, global providers in `src/contexts`, Supabase for auth/data/storage access, TanStack Query for server-state reads, MMKV/SecureStore for local storage, Uniwind plus HeroUI Native for styling, and demo-specific components under `src/components`.

There is no local backend runtime in the repository. Backend behavior is assumed to live in Supabase and external services.

## Runtime And Framework Versions

Source of truth: `package.json` and `package-lock.json`.

- Package manager: npm. `package-lock.json` lockfile version 3 is present; no yarn, pnpm, or bun lockfile is present.
- Entry point: `expo-router/entry`.
- Expo: `^54.0.0`.
- Expo Router: `~6.0.1`.
- React: `19.1.0`.
- React Native: `0.81.4`.
- TypeScript: `~5.9.2`.
- React Native New Architecture: enabled in `app.json`.
- Expo experiments: typed routes and React Compiler are enabled in `app.json`.

## Important Config Files

- `app.json`: app identity, Expo plugins, splash config, web static output, New Architecture, typed routes, React Compiler.
- `package.json`: scripts, dependencies, npm package metadata.
- `package-lock.json`: npm lockfile.
- `tsconfig.json`: extends Expo base config, strict mode, `@/*` path alias to `src/*`.
- `babel.config.js`: Expo preset and module-resolver alias `@` to `./src/`.
- `metro.config.js`: Expo Metro config wrapped by `withUniwindConfig`, with `global.css`, generated Uniwind types, and extra themes.
- `global.css`: imports Tailwind CSS, Uniwind, HeroUI Native styles, and project theme files.
- `eslint.config.js`: Expo flat ESLint config, ignores `dist/*`.
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
- Profile mutation: `useUser().updateProfile()` attempts to update `profile` rows by `user_id`; verify schema before relying on this because generated `profile` types do not show `user_id`.
- Recent updates: `useGetRecentUpdates()` reads `received_emails`, but it is unused by routes.
- Local config: `configStorage` MMKV instance stores app config such as intended `usage_priorities`.
- Local onboarding: `onboardingStorage` MMKV instance stores device and push-notification onboarding flags.
- Session persistence: Supabase Auth uses `src/storage/session.ts`, an AsyncStorage-like wrapper over encrypted MMKV. The encryption key is stored in Expo SecureStore.
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
- `UserProfile` in `src/hooks/useUser.ts`, currently typed as `any`.
- `TTab` in `src/types/appConfig.ts`: `"tab1" | "tab2" | "tab3"`.
- `TBucket` in `src/types/index.ts`: placeholder `"bucket_name"`.
- Theme names in `src/contexts/app-theme-context.tsx`: default light/dark plus lavender, mint, and sky variants.

Backend types available but mostly not implemented in UI:

- `profile`, `received_emails`, `collection`, `article`, `article_summary`, `agent`, `newsletter`, `rss_item`, `documents`, `subscriptions`, `products`, `prices`, and related views/functions.

## External Integrations

- Supabase: auth, database, storage signed URLs.
- PostHog: provider configured with EU host. Autocapture touch/lifecycle options are present, but `disabled: true`; screen capture is disabled.
- RevenueCat: helper functions configure/login/logout and fetch offerings. iOS API key is supported; Android configuration is commented out.
- Apple Authentication: iOS sign-in with Supabase ID token.
- Expo SecureStore: stores MMKV encryption key for session storage.
- React Native MMKV: local session, onboarding, and config stores.
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
- Web command: `npm run web`; `app.json` sets web output to `static`.
- EAS deployment is described in the README but no `eas.json` exists.
- iOS native files are tracked in git but currently deleted in the working tree. Do not assume the native project is usable without checking the current git state.

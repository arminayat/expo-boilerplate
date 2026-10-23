# Architecture And Tools

## High-Level Architecture

This is a client-only Expo Router app. The app uses file-based routes in `src/app`, Expo Router native tabs for the main tab shell, global providers in `src/contexts`, Supabase for auth/data/storage access, TanStack Query for server-state reads, MMKV/SecureStore for local storage, Uniwind plus HeroUI Native for styling, and demo-specific components under `src/components`.

There is no local backend runtime in the repository. Backend behavior is assumed to live in Supabase and external services.

## Runtime And Framework Versions

Source of truth: `package.json` and `package-lock.json`.

- Package manager: npm. `package-lock.json` lockfile version 3 is present; no yarn, pnpm, or bun lockfile is present.
- Entry point: `expo-router/entry`.
- Expo: `~58.0.17`.
- Expo Router: `~58.0.25`; native tabs import from stable `expo-router/native-tabs`.
- React: `19.3.0`.
- React Native: `0.88.0`.
- TypeScript: `~6.0.3`.
- HeroUI Native: `1.0.11` pinned exactly; Uniwind `1.13.0` with Tailwind `~4.3.3`.
- Supabase JS: `2.118.0` pinned exactly. Normal imports exclude optional tracing; keep Hermes bytecode enabled when checking exports.
- React Native New Architecture: SDK 58 uses the New Architecture; no explicit `newArchEnabled` flag is needed in `app.json`.
- Expo experiments: typed routes and React Compiler are enabled in `app.json`.
- Expo SDK boundary: SDK 58 is the selected stable release. Use its RN/React/native package set, including Reanimated `4.7.1`, Worklets `0.13.0`, and Gesture Handler `~3.3.0`; do not independently upgrade coupled native packages.
- Routing boundary: `@react-navigation/*` packages are not direct dependencies. Application code that needs navigation themes, focus hooks, or header height imports them from `expo-router` or `expo-router/react-navigation`.

## Important Config Files

- `app.json`: app identity, Expo plugins, splash config, web static output, typed routes, and React Compiler. Current plugins include `expo-router`, `expo-splash-screen`, `expo-secure-store`, `expo-web-browser`, `expo-font`, `expo-image`, and `expo-status-bar`.
- `package.json`: scripts, dependencies, npm package metadata.
- `package-lock.json`: npm lockfile.
- `tsconfig.json`: extends Expo base config, strict mode, `@/*` path alias to `src/*`.
- `babel.config.js`: Expo preset and module-resolver alias `@` to `./src/`.
- `metro.config.js`: Expo Metro config wrapped by `withUniwindConfig`, with `global.css`, generated Uniwind types, and extra themes.
- `global.css`: imports Tailwind CSS, Uniwind, HeroUI Native styles, and project theme files.
- `eslint.config.js`: Expo flat ESLint config, ignores `dist/*`, registers `eslint-plugin-react-native`, and disables `react/no-unescaped-entities` for copied demo/example copy.
- `src/types/expo-router-relaxed.d.ts`: local type shim that lets `useRouter()` accept plain string hrefs used by mirrored HeroUI Native example routes while `app.json` typed routes remain enabled.
- `.prettierrc`: enables the development-only `prettier-plugin-tailwindcss`; Prettier is an explicit dev dependency.
- `.nvmrc`: verified Node 22.23.2; `packageManager` pins npm 10.9.8. Babel 7, ESLint 9, and TypeScript 6 are retained for the Expo lint/preset peer constraints.
- `.github/workflows/validate.yml`: clean install, `check` (types/lint/adapter tests/Expo alignment), Doctor, installed peers, high/critical security-audit gate, and iOS/Android Hermes exports on main pushes and PRs. No deployment or backend credentials. The audit gate currently fails: unpatched `braces` GHSA-vfj7-8cjw-p6xm and `node-forge` GHSA-86w9-cpqp-85rv advisories produce 25 propagated package flags. See the dependency audit for exact evidence; do not claim clean CI.
- Expo 58 owns the exact Metro `0.87.1` graph and supplies Uniwind's Metro peers. Direct `metro`, `metro-cache`, and `metro-transform-worker` pins were removed. Expo's remote `^0.84.6` recommendation is stale relative to this installed SDK; do not reintroduce old Metro pins or suppress alignment checks. The scoped `xcode -> uuid: 11.1.1` override remains.
- `.env.example`: documents the five client configuration values referenced by the app; no unused server-secret placeholders. `.gitignore` excludes `.env` and `.env.*`, except this template.
- Public project metadata lives in `package.json` (Apache-2.0, repository, issues, homepage). `private: true` prevents accidental npm publication and is independent of GitHub repository visibility.
- `LICENSE`, `NOTICE`, `LICENSES/`, and `docs/third-party-notices.md` preserve upstream license obligations. README/setup/contributing/security/conduct documents and GitHub issue/PR templates support public contributors.

## Routing And Entry Points

- Root layout: `src/app/_layout.tsx`.
- Root redirect screen: `src/app/index.tsx`.
- Auth group: `src/app/(auth)/`.
- Main tabs: `src/app/(tabs)/`.
- Onboarding group: `src/app/(onboarding)/`.
- Demo group: `src/app/(demo)/`.
- Settings group: `src/app/(settings)/`.
- Not-found fallback: `src/app/+not-found.tsx`.

Root stack currently declares `(auth)`, `(tabs)`, `(demo)`, `(settings)`, and `+not-found`.

## Provider Stack

Implemented provider order:

1. `GestureHandlerRootView`
2. `KeyboardProvider`
3. `PostHogProvider`; configured as disabled and in-memory when `EXPO_PUBLIC_POSTHOG_API_KEY` is blank
4. `AuthProvider`
5. `QueryClientProvider`
6. `SignedUrlCacheProvider`
7. `AppThemeProvider`
8. `HeroUINativeProvider` inside `src/app/_layout.tsx`
9. Expo Router `ThemeProvider` from `expo-router/react-navigation`, derived from `AppThemeProvider` light/dark state
10. Expo Router stack
11. Global `react-native-toast-message` toast host

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
- PostHog: provider configured with EU host. Autocapture is currently disabled with `autocapture={false}`, while lifecycle capture is enabled through `options.captureAppLifecycleEvents`. If `EXPO_PUBLIC_POSTHOG_API_KEY` is blank or unset, the provider still supplies a client for `usePostHog()` callers but disables tracking, remote config, surveys, and persistent PostHog storage.
- RevenueCat: iOS-only configure/login/logout and offering helpers. Missing/blank keys and unsupported platforms skip native SDK calls. Concurrent initialization is shared, failures permit retry, auth catches optional login failures, and offering reads run in an effect with an unmount guard. Android configuration and real purchase/restore UI remain unimplemented.
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

## Background Or Async Flows

- Supabase auth auto-refresh starts/stops based on React Native `AppState`.
- Auth state changes identify users in PostHog and attempt RevenueCat login when its iOS key is configured; optional login errors are caught.
- TanStack Query online state follows Expo Network connectivity.
- `useRefreshOnFocus()` helper refetches after screen focus, but it is not currently wired into route code.
- Demo animations use Reanimated and local state.
- No durable background processing is implemented in this repo.

## Testing, Build, And Deployment Tooling

- Lint command: `npm run lint` -> `eslint . --max-warnings=0`.
- `npm run test:integrations` executes `scripts/check-revenuecat.cjs`, using Node's test runner and existing TypeScript transpilation to test the actual adapter with mocked React/native boundaries. Eight checks cover guards, initialization/login ordering and failures, and offering lifecycle. No extra test framework or live service is used.
- Native commands: `npm run ios` (simulator), `npm run ios:device`, `npm run android`, `npm run ios:pods` (existing native project).
- Native projects are generated by Expo and ignored by git, not tracked. Expo prebuild regenerates native directories by default; preserve manual native work before regenerating. MMKV/Nitro and RevenueCat require a native build rather than Expo Go. This upgrade requires a new native binary, with no new environment variable or database migration.
- Web command: `npm run web`; `app.json` sets web output to `static`.
- EAS deployment is described in the README but no `eas.json` exists.
- Current SDK 58 check, export, and native Release-build results belong in `docs/dependency-upgrade-audit.md`. Earlier SDK 57 successes are not current verification. The known npm audit failure remains a CI blocker even if other checks pass.
- Do not disable simulator signing: SecureStore requires Keychain entitlements. No Android SDK is installed locally; Android native builds and live service flows remain unverified. Browser testing is prohibited unless explicitly requested.
- Native SecureStore session initialization has no web adapter. Do not replace encrypted storage with plaintext browser storage as an upgrade workaround.
- Detailed package decisions, native runtime verification, security findings, and unverified external integrations belong in `docs/dependency-upgrade-audit.md`; primary-source compatibility research is in `docs/dependency-compatibility-research.md`.

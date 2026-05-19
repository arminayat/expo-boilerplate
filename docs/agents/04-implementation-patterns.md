# Implementation Patterns

## File And Component Conventions

- Routes live in `src/app` using Expo Router file conventions and route groups like `(auth)`, `(tabs)`, `(onboarding)`, and `(demo)`.
- Shared app providers live in `src/contexts`.
- Shared hooks live in `src/hooks`.
- Service clients and integration helpers live in `src/lib`.
- Local persistence adapters live in `src/storage`.
- Shared UI components live in `src/components`.
- Demo-specific components live under `src/components/showcases`, `src/components/themes-content`, `src/components/select`, `src/components/toast`, and `src/components/component-presentation`.
- Project assets are split between root `assets/` and `src/assets/`; current auth screens use `src/assets/images/logo.png`, while app/demo config and showcases use root `assets/`.

## Imports And Naming

- `@/*` resolves to `src/*`. Prefer this alias for app-local imports when it matches nearby code.
- Existing code uses both double and single quotes. Many demo files use single quotes; newer app/auth files use double quotes. Preserve local file style when editing.
- Components are PascalCase. Hooks use `use*`.
- Route files generally default-export screen components.
- Shared wrapper text component is `AppText`; many demo components use it, while placeholder app tabs use React Native `Text`.

## Styling Patterns

- Styling is mostly through `className` with Tailwind/Uniwind classes.
- HeroUI Native supplies components and helpers such as `Button`, `Card`, `Chip`, `Dialog`, `Select`, `Surface`, `Toast`, `cn`, and `useThemeColor`.
- Use `withUniwind()` for icon or animated components that need className styling.
- Theme tokens are CSS variables in `themes/*.css` and consumed through HeroUI/Uniwind token classes such as `bg-background`, `text-foreground`, `text-muted`, and `bg-surface`.
- `global.css` imports Tailwind, Uniwind, HeroUI Native styles, and theme CSS.
- Use `cn()` from `heroui-native` to combine class strings in existing patterns.

## Data Fetching Patterns

- Use the shared `supabase` client from `src/lib/supabase/client.ts`.
- Use TanStack Query for server-state reads. Existing query keys are simple arrays like `["user-profile"]` and `["recent-updates"]`.
- `queryClient` defaults to `refetchOnReconnect: true`.
- Network connectivity is wired to TanStack Query through Expo Network.
- `useRefreshOnFocus()` exists for screen-focus refetching but is not broadly used.

## Mutation Patterns

- Auth mutations call Supabase Auth directly from screen handlers.
- Profile mutation is exposed as `updateProfile()` inside `useUser()` and refetches after updating.
- Current code uses local `loading` state in screen-level mutations.
- Errors are surfaced through `Alert`, `Toast.show()`, console logs, and PostHog capture depending on the screen.
- There is no central mutation abstraction yet.

## Client/Server Boundaries

- All code in this repo is client-side React Native/Expo code.
- There are no server components, API routes, backend services, or local server-only modules.
- Any Supabase table, storage, or auth access happens from the client and must respect Supabase RLS and public client-key constraints.
- Environment variables used in app code are `EXPO_PUBLIC_*` and are bundled into the client.

## Auth And Session Patterns

- `AuthProvider` owns session state and subscribes to Supabase auth changes.
- Supabase Auth persistence uses an AsyncStorage-compatible adapter over encrypted MMKV.
- The MMKV session encryption key is generated with Expo Crypto and stored in Expo SecureStore.
- On sign-in, `AuthProvider` redirects to the configured entrance tab, logs in to RevenueCat, and identifies the user in PostHog.
- On sign-out, `AuthProvider` redirects to `/(auth)/sign-in`.
- Root `src/app/index.tsx` currently bypasses auth gating for unauthenticated users; do not assume auth protection is enforced by root routing.

## Theme Patterns

- `AppThemeProvider` wraps Uniwind theme state and exposes `currentTheme`, `isLight`, `isDark`, `setTheme()`, and `toggleTheme()`.
- `HeroUINativeProvider` receives `theme: currentTheme`, `colorScheme: "system"`, and `textProps.allowFontScaling: false`.
- Extra themes are registered in `metro.config.js`; generated Uniwind type declarations are in `src/uniwind-types.d.ts`.
- The paywall showcase temporarily forces dark theme while focused and restores the prior theme on blur.

## Testing Patterns

- No project test patterns are established.
- No test command, test framework config, or test files are present.
- For now, validate changes with TypeScript/Expo build/lint commands that are relevant to the change. Add a test framework only when a task explicitly requires it or the scope justifies it.

## Framework-Specific Gotchas

- Expo Router route groups are pathless; links such as `/sign-up` can resolve to files under `(auth)`.
- The auth layout declares `forgot-password`, but the file is `forget-password.tsx`. Keep route names and links aligned when touching this area.
- `useCheckUserOnboarding()` redirects to `/(onboarding)/secondary`, which is not implemented.
- The generated Supabase `profile` type does not include `onboarding_completed_at`, but onboarding code checks that property through an `any` profile type.
- The generated Supabase `profile` type does not show `user_id`, but `updateProfile()` updates by `user_id`.
- Root stack declares `(settings)` and `+not-found`, but those files do not exist.
- `npm run reset-project` references a missing `scripts/reset-project.js`.
- `src/uniwind-types.d.ts` is generated; do not edit it manually.

## What To Avoid

- Do not treat README-described auth/onboarding/subscription behavior as fully implemented without checking the code path.
- Do not add a `docs/agents/README.md`; `AGENTS.md` is the memory index.
- Do not add new top-level folders for feature code when an existing `src/app`, `src/components`, `src/hooks`, `src/lib`, `src/storage`, or `src/types` location fits.
- Do not put backend secrets in app code; `EXPO_PUBLIC_*` variables are client-visible.
- Do not assume generated Supabase types mean UI or workflows exist.
- Do not edit generated Uniwind declarations by hand.
- Do not rely on native iOS project files without checking the dirty working tree, because `ios/` is currently deleted locally.

## Current Gaps Worth Remembering

- Auth gating is intentionally or temporarily bypassed at the root redirect.
- App tabs are placeholders except for the basic profile/demo/logout actions in `tab3`.
- Onboarding storage helpers exist, but onboarding UI is a placeholder.
- RevenueCat helpers exist, but no real purchase UI calls them.
- PostHog provider exists, but autocapture is disabled.
- Supabase profile read/write paths need schema alignment before being treated as production-ready.
- Fonts referenced in some demo/toast styles include Inter and Lora, but root font loading currently loads Roboto Slab only.

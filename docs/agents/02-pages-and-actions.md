# Pages And Actions

## App Entry And Root Routing

### `src/app/_layout.tsx`

- Behavior: root Expo Router layout. Imports `global.css`, configures Reanimated logger, loads Roboto Slab fonts, wraps routes with `Providers`, and renders the root stack through `HeroUINativeProvider`.
- Source files: `src/app/_layout.tsx`, `src/contexts/Providers.tsx`, `global.css`.
- User actions: none directly.
- Writes/mutations: none.
- External calls: font loading through Expo font package at runtime.
- Persistence: none.
- Placeholders: root stack declares `(settings)` and `+not-found`, but corresponding route files are not present.

### `src/app/index.tsx`

- Behavior: redirect-only entry screen.
- Source files: `src/app/index.tsx`, `src/hooks/useGetEntrancePath.ts`, `src/hooks/useUserOnboarding.tsx`, `src/contexts/AuthContext.tsx`.
- User actions: none.
- Writes/mutations: none.
- External calls: reads Supabase auth session via `useAuth()`.
- Persistence: reads MMKV app config indirectly through `useGetEntrancePath()`.
- Current implementation: authenticated users redirect to `/(tabs)/${entrancePath}`; unauthenticated users currently redirect to `/(tabs)/tab1`.
- Intended but disabled: device onboarding redirect and sign-in redirect are commented out.

## Auth Routes

### `src/app/(auth)/_layout.tsx`

- Behavior: pathless auth route group layout. Redirects authenticated users to `/`; otherwise renders a stack.
- Source files: `src/app/(auth)/_layout.tsx`.
- User actions: none directly.
- Writes/mutations: none.
- External calls: reads auth session from context.
- Placeholder/gotcha: stack declares `forgot-password`, but the actual route file is `forget-password.tsx`.

### `src/app/(auth)/sign-in.tsx`

- Behavior: email/password sign-in screen with logo and `SignInForm`.
- Source files: `src/app/(auth)/sign-in.tsx`, `src/components/auth/SignInForm.tsx`, `src/components/auth/Auth.native.tsx`.
- User actions: enter email/password, submit sign-in, open forgot-password link, open sign-up link, use Apple sign-in on iOS, trigger hidden developer-mode toast through repeated taps on "Or".
- Writes/mutations: calls `supabase.auth.signInWithPassword()`, which creates/updates auth session storage through the Supabase client storage adapter.
- External calls: Supabase Auth, PostHog event capture, Apple auth on iOS, RevenueCat login indirectly after auth state changes.
- Persistence: Supabase session is persisted by `src/storage/session.ts` in encrypted MMKV.
- Placeholders: Android native auth is not implemented.

### `src/app/(auth)/sign-up.tsx`

- Behavior: email/password sign-up screen.
- Source files: `src/app/(auth)/sign-up.tsx`.
- User actions: enter email/password, create account, return to sign-in.
- Writes/mutations: calls `supabase.auth.signUp()`.
- External calls: Supabase Auth, PostHog event capture.
- Persistence: Supabase may create an auth user and session depending on email verification settings.
- Placeholders: no profile row creation is implemented in this screen.

### `src/app/(auth)/forget-password.tsx`

- Behavior: sends a Supabase password reset email.
- Source files: `src/app/(auth)/forget-password.tsx`.
- User actions: enter email, request reset instructions, go back.
- Writes/mutations: calls `supabase.auth.resetPasswordForEmail()`.
- External calls: Supabase Auth, PostHog event capture.
- Persistence: no local persistence.
- Requirements: `EXPO_PUBLIC_WEB_PASSWORD_RESET_URL` must be configured.
- Placeholder: no in-app reset-password completion route exists.

## Main Tabs

### `src/app/(tabs)/_layout.tsx`

- Behavior: renders three Expo Router tabs: `tab1`, `tab2`, and `tab3`.
- Source files: `src/app/(tabs)/_layout.tsx`, `src/hooks/useUserOnboarding.tsx`.
- User actions: switch tabs.
- Writes/mutations: none directly.
- External calls: `useCheckUserOnboarding()` reads user data through `useUser()`.
- Persistence: none directly.
- Placeholder/gotcha: `useCheckUserOnboarding()` redirects to `/(onboarding)/secondary` when `profile.onboarding_completed_at === null`, but that route does not exist. The generated `profile` type also does not include `onboarding_completed_at`.

### `src/app/(tabs)/tab1/index.tsx`

- Behavior: placeholder home tab that displays `Tab 1`.
- Source files: `src/app/(tabs)/tab1/index.tsx`, `src/components/safe-area-view.tsx`.
- User actions: none.
- Writes/mutations: none.
- External calls: none.
- Persistence: none.
- Placeholder: real home/product behavior is not implemented.

### `src/app/(tabs)/tab2/index.tsx`

- Behavior: placeholder tab that displays `Tab 2`.
- Source files: `src/app/(tabs)/tab2/index.tsx`.
- User actions: none.
- Writes/mutations: none.
- External calls: none.
- Persistence: none.
- Placeholder: real tab behavior is not implemented.

### `src/app/(tabs)/tab3/index.tsx`

- Behavior: profile tab that displays `profile?.email` and `profile?.full_name`, opens the demo stack, and signs out.
- Source files: `src/app/(tabs)/tab3/index.tsx`, `src/hooks/useUser.ts`.
- User actions: tap `Demo`, tap `Logout`.
- Writes/mutations: `Logout` calls `supabase.auth.signOut()`.
- External calls: Supabase Auth and `useUser()` auth user fetch.
- Persistence: sign-out clears Supabase session through the configured storage adapter.
- Placeholder: profile editing is not exposed; `full_name` may be absent because `useUser()` currently returns Supabase Auth user data, not a `profile` table row.

## Onboarding

### `src/app/(onboarding)/index.tsx`

- Behavior: placeholder screen that displays `Onboarding`.
- Source files: `src/app/(onboarding)/index.tsx`, `src/hooks/useUserOnboarding.tsx`, `src/storage/onboarding.ts`.
- User actions: none currently.
- Writes/mutations: none from the screen.
- Persistence: `useCheckDeviceOnboarding()` can write `device_onboarding_completed` and `push_notification_onboarding_completed` to MMKV, but the current screen does not call those actions.
- Placeholder: actual onboarding steps are not implemented.

## Demo Area

### `src/app/(demo)/_layout.tsx`

- Behavior: demo stack layout with themed headers, logo title, theme toggle, reduced-motion warning toast, and registered component/showcase screens.
- Source files: `src/app/(demo)/_layout.tsx`, `src/components/theme-toggle.tsx`.
- User actions: navigate back, toggle theme.
- Writes/mutations: theme toggle calls `Uniwind.setTheme()` through `AppThemeProvider`.
- External calls: none.
- Persistence: theme persistence is not explicitly implemented in local code; behavior depends on Uniwind.

### `src/app/(demo)/index.tsx`

- Behavior: demo home with cards for Components, Themes, and Showcases.
- Source files: `src/app/(demo)/index.tsx`.
- User actions: open demo categories.
- Writes/mutations: none.
- External calls: loads remote preview images from `heroui-assets.nyc3.cdn.digitaloceanspaces.com`.
- Persistence: none.

### Component demo routes under `src/app/(demo)/components/`

- Behavior: interactive HeroUI Native component examples for accordion, avatar, button, card, checkbox, chip, dialog, divider, error view, form field, popover, pressable feedback, radio group, scroll shadow, select, skeleton, spinner, surface, switch, tabs, text field, and toast.
- Source files: `src/app/(demo)/components/*.tsx`, shared demo helpers under `src/components/`, `src/components/select/`, `src/components/toast/`, and `src/components/component-presentation/`.
- User actions: interact with local controls, dialogs, popovers, toasts, text inputs, selects, switches, and tabs.
- Writes/mutations: local React state only, plus toast state through HeroUI Native or `react-native-toast-message`.
- External calls: none expected except remote images in avatar/showcase examples.
- Persistence: none.
- Placeholders: these are library demos, not app product features.

### `src/app/(demo)/themes/index.tsx`

- Behavior: previews and selects Default, Lavender, Mint, and Sky themes in light/dark variants.
- Source files: `src/app/(demo)/themes/index.tsx`, `src/contexts/app-theme-context.tsx`, `themes/*.css`.
- User actions: choose a theme.
- Writes/mutations: calls `setTheme()` which calls `Uniwind.setTheme()`.
- External calls: none.
- Persistence: no project-owned theme persistence is visible.

### Showcase routes under `src/app/(demo)/showcases/`

- Behavior: full-screen composed UI showcases: Raycast model select, cooking onboarding, Linear issue, paywall, and onboarding carousel.
- Source files: `src/app/(demo)/showcases/*.tsx`, `src/components/showcases/**`.
- User actions: open/close showcases, change local selections, search in local dialogs, interact with simulated buttons.
- Writes/mutations: local React state only. Some actions call `simulatePress()` to show a dev alert and trigger haptics.
- External calls: remote images from HeroUI asset URLs; local images from `assets/images`.
- Persistence: none.
- Placeholders: paywall buttons do not call RevenueCat or Stripe; showcase onboarding is independent from the app onboarding route.

## Data Hooks And Workflows

### `useUser()`

- Source files: `src/hooks/useUser.ts`.
- Behavior: React Query hook that calls `supabase.auth.getUser()` and returns the auth user as `profile`.
- Mutations: `updateProfile()` updates Supabase `profile` rows by `user_id`, then refetches.
- Current gap: generated `profile` type has `id`, `email`, `full_name`, billing/payment fields, but not `user_id`; the read path does not fetch `profile` table data.

### `useGetRecentUpdates()`

- Source files: `src/hooks/useGetUpdates.ts`.
- Behavior: queries `received_emails` rows with non-empty `key_takeaways`, ordered by `email_received_at`, limited to 10.
- Current usage: not referenced by any route.

### Signed URL cache

- Source files: `src/contexts/SignedUrlCacheContext.tsx`, `src/types/index.ts`.
- Behavior: creates and caches Supabase Storage signed URLs in memory, keyed by bucket/path and optionally user ID.
- Persistence: memory only; cache is cleared when the user changes.
- Current gap: `TBucket` is a placeholder union of only `"bucket_name"`.

## CLI Commands

Source: `package.json`.

- `npm start`: runs `expo start -c`.
- `npm run android`: runs `expo run:android`.
- `npm run ios`: runs `expo run:ios --device`.
- `npm run web`: runs `expo start --web -c`.
- `npm run lint`: runs `expo lint`.
- `npm run pod-install`: changes into `ios` and runs CocoaPods with `RCT_NEW_ARCH_ENABLED=1`.
- `npm run generate-types`: runs Supabase type generation into `src/lib/supabase/types.ts`; the project ID placeholder must be replaced.
- `npm run reset-project`: references `node ./scripts/reset-project.js`, but no `scripts/` directory exists in the current working tree.

## API Endpoints And Background Jobs

- No Expo API routes are present.
- No server directory is present.
- No background job, queue, webhook handler, or cron implementation is present.

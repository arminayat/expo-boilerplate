# Implementation Patterns

## File And Component Conventions

- Routes live in `src/app` using Expo Router file conventions and route groups like `(auth)`, `(tabs)`, `(onboarding)`, and `(demo)`.
- The main `(tabs)` layout uses `NativeTabs` from `expo-router/unstable-native-tabs`; tab bar entries are declared explicitly with static `NativeTabs.Trigger` children whose `name` values match the route manifest entries.
- Shared app providers live in `src/contexts`.
- Shared hooks live in `src/hooks`.
- Service clients and integration helpers live in `src/lib`.
- Local persistence adapters live in `src/storage`.
- Shared UI components live in `src/components`.
- Demo-specific components live under `src/components/showcases`, `src/components/themes-content`, `src/components/select`, `src/components/toast`, and `src/components/component-presentation`.
- `src/app/(demo)` is intentionally mirrored from `/Users/armin/Projects/heroui-native-example/src/app/(home)`. When refreshing it, copy that tree exactly and put compatibility fixes in shared support files instead of editing mirrored route files.
- Project assets are split between root `assets/` and `src/assets/`; current auth screens use `src/assets/images/logo.png`, while app/demo config and showcases use root `assets/`.

## Imports And Naming

- `@/*` resolves to `src/*`. Prefer this alias for app-local imports when it matches nearby code.
- Existing code uses both double and single quotes. Many demo files use single quotes; newer app/auth files use double quotes. Preserve local file style when editing.
- Components are PascalCase. Hooks use `use*`.
- Route files generally default-export screen components.
- Shared wrapper text component is `AppText`; many demo components use it, while placeholder app tabs use React Native `Text`.
- With SDK 56, do not import `@react-navigation/*` directly from app code. Use `expo-router` for router hooks such as `useFocusEffect`, and `expo-router/react-navigation` for navigation theme/header helpers such as `ThemeProvider`, `DarkTheme`, `DefaultTheme`, and `useHeaderHeight`.

## Styling Patterns

- Styling is mostly through `className` with Tailwind/Uniwind classes.
- HeroUI Native supplies components and helpers such as `Button`, `Card`, `Chip`, `Dialog`, `Select`, `Surface`, `Toast`, `cn`, and `useThemeColor`.
- Use `withUniwind()` for icon or animated components that need className styling.
- Theme tokens are CSS variables in `themes/*.css` and consumed through HeroUI/Uniwind token classes such as `bg-background`, `text-foreground`, `text-muted`, and `bg-surface`.
- Extra theme files must define the same variable set as HeroUI Native 1.0.3 default themes, including `surface-secondary`, `surface-tertiary`, `backdrop`, `separator`, `focus`, and shadow variables. Use `separator`, not the older `divider` token.
- Native tab colors are configured in `src/app/(tabs)/_layout.tsx`; iOS uses `DynamicColorIOS` so Liquid Glass tab items adapt between light and dark appearances, while Android/web use theme-aware fallback colors.
- `global.css` imports Tailwind, Uniwind, HeroUI Native styles, and theme CSS.
- Use `cn()` from `heroui-native` to combine class strings in existing patterns.
- HeroUI Native 1.0.3 uses standalone field subcomponents: `TextField` wraps standalone `Label`, `Input`, `Description`, and `FieldError`; `ControlField` replaces the older `FormField` root; `Separator` replaces the older `Divider` component.
- For HeroUI 1.0.3 selection controls, `RadioGroup.Item` wraps standalone `Radio`, `Radio.Indicator`, and `Radio.IndicatorThumb`; do not use the removed `RadioGroup.Label`, `RadioGroup.Description`, `RadioGroup.ErrorMessage`, or `RadioGroup.Indicator` API.
- `Popover.Content` and `Select.Content` should declare `presentation` (`popover`, `dialog`, or `bottom-sheet`) explicitly. `Select` value handlers often need local option-type casts because the library exposes a generic `SelectOption`.
- `SafeAreaView` is an animated full-height `View` wrapper. `SafeAreaView` and `ScreenScrollView` pad the top by `Math.max(useHeaderHeight(), insets.top)` so headerless tab screens still stay below the status area. Use `ScreenScrollView` for scroll-view props such as `contentContainerClassName`.

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
- MMKV stores are created with the v4 `createMMKV()` API. Use `mode: "multi-process"` for shared local stores and `storage.remove(key)` for deletes.
- The MMKV session store uses id `session-v4`, `encryptionType: "AES-256"`, and a 32-character key generated with Expo Crypto and stored in Expo SecureStore. Older v3 sessions are intentionally not migrated, so users may need to sign in once after the v4 change.
- On sign-in, `AuthProvider` redirects to the configured entrance tab, logs in to RevenueCat, and identifies the user in PostHog.
- On sign-out, `AuthProvider` redirects to `/(auth)/sign-in`.
- Root `src/app/index.tsx` currently bypasses auth gating for unauthenticated users; do not assume auth protection is enforced by root routing.
- PostHog provider config uses `autocapture={false}` and `options.captureAppLifecycleEvents: true`. Do not use the older `autocapture.captureLifecycleEvents` option shape with the current `posthog-react-native` version. When `EXPO_PUBLIC_POSTHOG_API_KEY` is blank, `Providers` passes a disabled in-memory PostHog client so hooks remain safe without emitting the missing-key runtime error.

## Theme Patterns

- `AppThemeProvider` wraps Uniwind theme state and exposes `currentTheme`, `isLight`, `isDark`, `setTheme()`, and `toggleTheme()`.
- `HeroUINativeProvider` receives `textProps.allowFontScaling: false`; it no longer receives `theme` or `colorScheme` in its config. Theme state is handled through `AppThemeProvider` and Uniwind.
- Extra themes are registered in `metro.config.js`; generated Uniwind type declarations are in `src/uniwind-types.d.ts`.
- The paywall showcase temporarily forces dark theme while focused and restores the prior theme on blur.

## Testing Patterns

- No project test patterns are established.
- No test command, test framework config, or test files are present.
- For now, validate changes with TypeScript/Expo build/lint commands that are relevant to the change. Add a test framework only when a task explicitly requires it or the scope justifies it.
- SDK 56 lint includes stricter React hooks/Compiler rules. For Reanimated shared values, prefer the compiler-compatible `sharedValue.get()` and `sharedValue.set(...)` APIs over mutating or reading `.value` in render-time callbacks.

## Framework-Specific Gotchas

- Expo Router route groups are pathless; links such as `/sign-up` can resolve to files under `(auth)`.
- Native tabs are not a drop-in replacement for JavaScript tabs: use static `NativeTabs.Trigger` entries instead of `Tabs.Screen`, and do not dynamically add/remove triggers after mount.
- Because the current tab screens are folders with `index.tsx` files and no nested tab layouts, their native tab trigger names are `tab1/index`, `tab2/index`, and `tab3/index`, not `tab1`, `tab2`, and `tab3`.
- With typed routes enabled, use `Href` types or concrete absolute route strings for route data and `router.push()` values.
- The auth layout declares `forgot-password`, but the file is `forget-password.tsx`. Keep route names and links aligned when touching this area.
- `useCheckUserOnboarding()` redirects to the implemented `/(onboarding)` index when `profile.onboarding_completed_at === null`, but the actual onboarding screen is still a placeholder.
- The generated Supabase `profile` type does not include `onboarding_completed_at`; `UserProfile` carries that as an optional locally expected field because the read path still returns Supabase Auth user data.
- `(settings)` and `+not-found` currently exist as placeholder routes only.
- Use `npm run check`, `npm run doctor`, and `npm run export:native` when changing dependencies. No reset-project helper exists.
- `src/uniwind-types.d.ts` is generated; do not edit it manually.
- `heroui-native` is pinned exactly to `1.0.9`; it keeps the 1.0 standalone field/control APIs. Do not reintroduce removed APIs such as `TextField.Input`, `FormField`, `Divider`, `ErrorView`, or `RadioGroup.Label`. HeroUI styles now register their own Tailwind source.
- SDK 56 rejects the old `android.edgeToEdgeEnabled` app config field and no longer needs an explicit `newArchEnabled` flag.
- SDK 56 Expo Router is not compatible with direct app dependencies on `@react-navigation/*`; keep navigation imports routed through Expo Router entry points.
- The mirrored HeroUI Native example uses plain string `router.push()` values. Keep `src/types/expo-router-relaxed.d.ts` unless the mirrored source switches to strict `Href` values.

## What To Avoid

- Do not treat README-described auth/onboarding/subscription behavior as fully implemented without checking the code path.
- Do not add a `docs/agents/README.md`; `AGENTS.md` is the memory index.
- Do not add new top-level folders for feature code when an existing `src/app`, `src/components`, `src/hooks`, `src/lib`, `src/storage`, or `src/types` location fits.
- Do not put backend secrets in app code; `EXPO_PUBLIC_*` variables are client-visible.
- Do not assume generated Supabase types mean UI or workflows exist.
- Do not edit generated Uniwind declarations by hand.
- Native projects are generated and ignored. `npm run ios` creates the iOS project; `npm run ios:pods` only refreshes an existing project. SDK 57 prebuild regenerates native folders by default.

## Current Gaps Worth Remembering

- Auth gating is intentionally or temporarily bypassed at the root redirect.
- App tabs are placeholders except for the basic profile/demo/logout actions in `tab3`.
- Onboarding storage helpers exist, but onboarding UI is a placeholder.
- RevenueCat helpers exist, but no real purchase UI calls them.
- PostHog provider exists, but autocapture is disabled.
- Supabase profile read path still needs schema alignment before being treated as production-ready; `useUser()` reads Supabase Auth user data rather than selecting the `profile` table.
- Root font loading includes Roboto Slab, Inter 600, and Lora 400/500; route providers wait for font loading to finish.
- `npm run lint` currently passes with no warnings.
- `npx tsc --noEmit` currently passes.
- Supabase 2.115.0 resolves the old OpenTelemetry/Hermes export failure. Keep Hermes enabled in production export checks; `--no-bytecode` is not a release validation substitute.

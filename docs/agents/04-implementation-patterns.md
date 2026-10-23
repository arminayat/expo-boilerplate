# Implementation Patterns

## File And Component Conventions

- Routes live in `src/app` using Expo Router file conventions and route groups like `(auth)`, `(tabs)`, `(onboarding)`, and `(demo)`.
- The main `(tabs)` layout uses `NativeTabs` from the stable `expo-router/native-tabs` entry point; tab bar entries are declared explicitly with static `NativeTabs.Trigger` children whose `name` values match the route manifest entries.
- Shared app providers live in `src/contexts`.
- Shared hooks live in `src/hooks`.
- Service clients and integration helpers live in `src/lib`.
- Local persistence adapters live in `src/storage`.
- Shared UI components live in `src/components`.
- Demo-specific components live under `src/components/showcases`, `src/components/themes-content`, `src/components/select`, `src/components/toast`, and `src/components/component-presentation`.
- `src/app/(demo)` originates from `https://github.com/heroui-inc/heroui-native/tree/main/example/src/app/(home)`. Preserve the demonstrated component behavior when refreshing it, while applying the required native navigation rule to navigation chrome. Prefer shared support files for compatibility fixes; the toast route also has a local `TextInputInstance` ref migration for RN 0.88.
- Project assets are split between root `assets/` and `src/assets/`; current auth screens use `src/assets/images/logo.png`, while app/demo config and showcases use root `assets/`.

## Required iOS Native Navigation

This is a mandatory implementation rule for the boilerplate and derived projects, including newly created or adapted screens. Existing code is not yet fully compliant; the gaps below describe current behavior, not approved alternatives.

- Use Expo Router `Stack` for native navigation and `NativeTabs` from `expo-router/native-tabs` for app tabs. Each tab that needs a header or pushed routes owns a nested `Stack` in its `_layout.tsx`. Keep only one visible native header per screen; a parent navigator may hide its header when the child stack owns it.
- Configure titles with a string `title` option or `<Stack.Title>`. Use `<Stack.Title large>` (or `headerLargeTitleEnabled`) for scrollable top-level screens where a large title is appropriate. Keep system title typography and built-in back buttons/gestures. Do not use body headings, logo renderers, `Stack.Title asChild`, or `Stack.Header asChild` as substitutes for the screen title/header.
- Put header actions in `<Stack.Toolbar placement="left">` or `placement="right"`, using `Stack.Toolbar.Button`, `Stack.Toolbar.Menu`, and `Stack.Toolbar.MenuAction`. Supply meaningful labels, native icons, and disabled state when appropriate. These render native iOS bar items; wrapping a custom `Pressable`/HeroUI button in `headerRight`, `headerLeft`, or `Stack.Toolbar.View` does not meet this rule. Keep the system back action available.
- Make the primary vertical `ScrollView`/`FlatList` fill the screen and remain discoverable by the native screen (prefer it as the first content child), with `contentInsetAdjustmentBehavior="automatic"`. Let the native container account for the header and tab bar; do not add the same header/safe-area inset again as padding. Keep content spacing separate from navigation insets. Large titles collapse when there is enough content to scroll; do not fake collapse with JS scroll listeners.
- Preserve native scroll-edge transparency and header/action appearance. Do not set `disableTransparentOnScrollEdge` or force fixed backgrounds to suppress system behavior. On iOS 26+, use `NativeTabs`' `minimizeBehavior="onScrollDown"` for scroll-driven minimization/expansion; the system draws the tab background and ignores `disableTransparentOnScrollEdge`. Older iOS versions retain the supported native appearance without a custom emulation.
- HeroUI tabs remain valid as in-page component examples or content selectors, not as the app navigation bar. Android uses supported platform behavior from the same navigation APIs.
- Check native title collapse/expansion, header actions, scroll-edge transitions, tab minimization where supported, content insets, and back gestures on an iOS simulator/device when validating navigation changes. Typechecking/export alone does not prove this behavior. Do not browser-test unless explicitly requested.

Current gaps, verified in source:

- `src/app/(tabs)/_layout.tsx` uses native tabs but disables scroll-edge transparency on older iOS, leaves minimization at its default, and has no per-tab stacks or native titles. Adding tab layouts changes trigger names from `tab1/index` etc. to `tab1` etc.; update the declarations together.
- Root, auth, and settings stacks hide their headers; the tab/profile/settings placeholders render headings or actions in body content. Parent header hiding is valid when a child owns the visible native header.
- `src/app/(demo)/_layout.tsx` uses a native stack but supplies a custom logo title, custom `ThemeToggle` via `headerRight`, and explicit header styling. The showcase stack hides its headers. These are not compliant product-navigation templates.
- `ScreenScrollView` currently adds manual top/bottom padding and does not set automatic content inset adjustment; `SafeAreaView` also adds header/safe-area padding. Adapt those wrappers before using them with native scroll-responsive headers, avoiding duplicate insets.

## Imports And Naming

- `@/*` resolves to `src/*`. Prefer this alias for app-local imports when it matches nearby code.
- Existing code uses both double and single quotes. Many demo files use single quotes; newer app/auth files use double quotes. Preserve local file style when editing.
- Components are PascalCase. Hooks use `use*`.
- Route files generally default-export screen components.
- Shared wrapper text component is `AppText`; many demo components use it, while placeholder app tabs use React Native `Text`.
- Do not import `@react-navigation/*` directly from app code. Use `expo-router` for router hooks such as `useFocusEffect`, and `expo-router/react-navigation` for navigation theme/header helpers such as `ThemeProvider`, `DarkTheme`, `DefaultTheme`, and `useHeaderHeight`.

## Styling Patterns

- Styling is mostly through `className` with Tailwind/Uniwind classes.
- HeroUI Native supplies components and helpers such as `Button`, `Card`, `Chip`, `Dialog`, `Select`, `Surface`, `Toast`, `cn`, and `useThemeColor`.
- Use `withUniwind()` for icon or animated components that need className styling.
- Theme tokens are CSS variables in `themes/*.css` and consumed through HeroUI/Uniwind token classes such as `bg-background`, `text-foreground`, `text-muted`, and `bg-surface`.
- Extra theme files must define the HeroUI Native 1.0 token set, including `surface-secondary`, `surface-tertiary`, `backdrop`, `separator`, `focus`, and shadow variables. Use `separator`, not the older `divider` token.
- Native tab colors are configured in `src/app/(tabs)/_layout.tsx`; iOS uses `DynamicColorIOS` so Liquid Glass tab items adapt between light and dark appearances, while Android/web use theme-aware fallback colors.
- `global.css` imports Tailwind, Uniwind, HeroUI Native styles, and theme CSS.
- Use `cn()` from `heroui-native` to combine class strings in existing patterns.
- HeroUI Native 1.0 uses standalone field subcomponents: `TextField` wraps standalone `Label`, `Input`, `Description`, and `FieldError`; `ControlField` replaces the older `FormField` root; `Separator` replaces the older `Divider` component.
- For HeroUI 1.0 selection controls, `RadioGroup.Item` wraps standalone `Radio`, `Radio.Indicator`, and `Radio.IndicatorThumb`; do not use the removed `RadioGroup.Label`, `RadioGroup.Description`, `RadioGroup.ErrorMessage`, or `RadioGroup.Indicator` API.
- `Popover.Content` and `Select.Content` should declare `presentation` (`popover`, `dialog`, or `bottom-sheet`) explicitly. `Select` value handlers often need local option-type casts because the library exposes a generic `SelectOption`.
- Current legacy wrappers: `SafeAreaView` is an animated full-height `View`; it and `ScreenScrollView` pad the top by `Math.max(useHeaderHeight(), insets.top)` for the existing headerless/translucent screens. This is not the required native scroll-inset pattern; see the navigation guidance above before reuse. `contentContainerClassName` belongs to a scroll view, not `SafeAreaView`.

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
- On sign-in, `AuthProvider` redirects to the configured entrance tab, attempts optional RevenueCat login, and identifies the user in PostHog. It catches RevenueCat rejection without changing the Supabase session.
- RevenueCat native calls require iOS and a nonblank `EXPO_PUBLIC_APPLE_PURCHASES_API_KEY`. Share concurrent initialization, await native promise-returning APIs, and let failed initialization retry. `Purchases.configure()` itself returns `void`. Offering reads belong in an effect; ignore results after unmount and handle errors. Android purchases remain unimplemented.
- On sign-out, `AuthProvider` redirects to `/(auth)/sign-in`.
- Root `src/app/index.tsx` currently bypasses auth gating for unauthenticated users; do not assume auth protection is enforced by root routing.
- PostHog provider config uses `autocapture={false}` and `options.captureAppLifecycleEvents: true`. Do not use the older `autocapture.captureLifecycleEvents` option shape with the current `posthog-react-native` version. When `EXPO_PUBLIC_POSTHOG_API_KEY` is blank, `Providers` passes a disabled in-memory PostHog client so hooks remain safe without emitting the missing-key runtime error.

## Theme Patterns

- `AppThemeProvider` wraps Uniwind theme state and exposes `currentTheme`, `isLight`, `isDark`, `setTheme()`, and `toggleTheme()`.
- `HeroUINativeProvider` receives `textProps.allowFontScaling: false`; it no longer receives `theme` or `colorScheme` in its config. Theme state is handled through `AppThemeProvider` and Uniwind.
- Extra themes are registered in `metro.config.js`; generated Uniwind type declarations are in `src/uniwind-types.d.ts`.
- The paywall showcase temporarily forces dark theme while focused and restores the prior theme on blur.

## Testing Patterns

- `npm run test:integrations` runs `scripts/check-revenuecat.cjs` with Node's built-in test runner. It transpiles the actual adapter with the existing TypeScript dependency and mocks React/native boundaries; it does not certify a device or live RevenueCat service.
- `npm run check` includes those tests, TypeScript, zero-warning lint, and Expo alignment. No UI/end-to-end test framework is installed; add one only when the task justifies it.
- Keep Hermes bytecode enabled for native exports, and use native compilation/runtime checks for native ABI changes. Consult the dependency audit for current results and known security gate failures.
- For Reanimated shared values, prefer the compiler-compatible `sharedValue.get()` and `sharedValue.set(...)` APIs over mutating or reading `.value` in render-time callbacks.

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
- `src/types/expo-runtime.d.ts` references Expo's ambient asset types so clean-checkout typechecking does not depend on ignored CLI-generated `expo-env.d.ts` or `.expo/` files.
- `heroui-native` is pinned exactly to `1.0.11`; it keeps the 1.0 standalone field/control APIs. Do not reintroduce removed APIs such as `TextField.Input`, `FormField`, `Divider`, `ErrorView`, or `RadioGroup.Label`. HeroUI styles register their own Tailwind source.
- SDK 58 does not use the old `android.edgeToEdgeEnabled` or `newArchEnabled` app config flags. Keep navigation imports routed through Expo Router entry points.
- RN 0.88 refs use exported instance types: `TextInstance` in `AppText`, and `TextInputInstance` in the toast demo. `AppState.currentState` may be null; the OTA hook compares explicit inactive/background values rather than calling string methods on it.
- Masked View 0.3.2 still declares the removed `NativeMethods` mixin. The Raycast progressive blur component has a local `ComponentType<MaskedViewProps>` bridge that retains its published props; do not globally weaken React Native types or change its runtime for this declaration mismatch.
- Copied HeroUI source carries Apache-2.0 origin/modification notices. Preserve these when adapting or refreshing demos; keep the path inventory in `docs/third-party-notices.md` accurate.
- The mirrored HeroUI Native example uses plain string `router.push()` values. Keep `src/types/expo-router-relaxed.d.ts` unless the mirrored source switches to strict `Href` values.

## What To Avoid

- Do not treat README-described auth/onboarding/subscription behavior as fully implemented without checking the code path.
- Do not add a `docs/agents/README.md`; `AGENTS.md` is the memory index.
- Do not add new top-level folders for feature code when an existing `src/app`, `src/components`, `src/hooks`, `src/lib`, `src/storage`, or `src/types` location fits.
- Do not put backend secrets in app code; `EXPO_PUBLIC_*` variables are client-visible.
- Do not assume generated Supabase types mean UI or workflows exist.
- Do not edit generated Uniwind declarations by hand.
- Native projects are generated and ignored. `npm run ios` creates the iOS project; `npm run ios:pods` only refreshes an existing project. Expo prebuild regenerates native folders by default.

## Current Gaps Worth Remembering

- Auth gating is intentionally or temporarily bypassed at the root redirect.
- App tabs are placeholders except for the basic profile/demo/logout actions in `tab3`.
- Onboarding storage helpers exist, but onboarding UI is a placeholder.
- RevenueCat helpers exist, but no real purchase UI calls them.
- PostHog provider exists, but autocapture is disabled.
- Supabase profile read path still needs schema alignment before being treated as production-ready; `useUser()` reads Supabase Auth user data rather than selecting the `profile` table.
- Root font loading includes Roboto Slab, Inter 600, and Lora 400/500; route providers wait for font loading to finish.
- Current lint/typecheck/build evidence is recorded in `docs/dependency-upgrade-audit.md`; do not carry SDK 57 proof forward to SDK 58.
- Supabase 2.118.0 retains the upstream optional-tracing separation. Keep normal `createClient` imports and Hermes bytecode enabled; do not add tracing shims or treat `--no-bytecode` as release verification.

# Folder Structure

## Practical Directory Map

```text
.
├── AGENTS.md
├── app.json
├── babel.config.js
├── global.css
├── metro.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── assets/
├── docs/agents/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── helpers/
│   ├── hooks/
│   ├── lib/
│   ├── storage/
│   └── types/
└── themes/
```

## Root-Level Ownership

- `AGENTS.md`: single entry point for agent instructions and memory index.
- `docs/agents/`: durable project memory. Do not create `docs/agents/README.md`.
- `docs/dependency-*.md`: dependency compatibility decisions, primary-source research, and upgrade verification record.
- `.github/workflows/validate.yml`: npm/Expo validation and native Hermes export CI; no deployment.
- `.nvmrc`: verified local/CI Node version.
- `package.json` / `package-lock.json`: npm scripts and dependency graph.
- `app.json`: Expo app config and native/web app identity.
- `babel.config.js`, `metro.config.js`, `tsconfig.json`, `eslint.config.js`, `.prettierrc`: build, module resolution, TypeScript, lint, and formatting config.
- `global.css`: styling entry file imported by the root layout.
- `themes/`: Uniwind/HeroUI theme CSS files.
- `assets/`: root assets used by Expo config and demos.

## `src/app`

Expo Router routes live here.

- Add new screens/routes under the appropriate route group.
- Use pathless groups for navigation organization when needed: `(auth)`, `(tabs)`, `(onboarding)`, `(demo)`.
- Keep group layouts in `_layout.tsx`.
- Add tab screens under `src/app/(tabs)/<tab-name>/index.tsx`.
- Add modal or stack screens under the nearest owning route group.
- `src/app/(settings)` currently contains a placeholder modal route. Extend it only when implementing settings behavior.
- `src/app/+not-found.tsx` currently contains a placeholder fallback route. Extend it only when implementing not-found behavior.

Current route groups:

- `(auth)`: sign-in, sign-up, forget-password.
- `(tabs)`: main three-tab shell.
- `(onboarding)`: placeholder onboarding index only.
- `(demo)`: HeroUI Native component, theme, and showcase demos.
- `(settings)`: placeholder settings modal layout and index route only.

## `src/components`

Shared UI and demo UI live here.

- Put reusable app components directly under `src/components` or a focused subfolder.
- Put auth-specific shared UI under `src/components/auth`.
- Put bottom-sheet-specific shared demo pieces under `src/components/bottom-sheet`.
- Put icon-only shared demo components under `src/components/icons`.
- Put select-specific shared demo/control pieces under `src/components/select`.
- Put showcase carousel pieces under `src/components/showcase-carousel`.
- Put toast-specific shared UI under `src/components/toast`.
- Put showcase-only implementation pieces under `src/components/showcases`.
- Put theme preview content under `src/components/themes-content`.
- Avoid placing route-only components here unless they are shared or large enough to justify extraction.

## `src/contexts`

React context providers live here.

- `Providers.tsx` composes global providers.
- `AuthContext.tsx` owns Supabase auth session state.
- `app-theme-context.tsx` wraps Uniwind theme state.
- `SignedUrlCacheContext.tsx` owns in-memory Supabase signed URL cache.

Add new global cross-cutting providers here only when they are needed app-wide. Feature-local state should stay near the route or component that owns it.

## `src/hooks`

Reusable hooks live here.

- Put shared app hooks here when they are used across routes/components.
- Keep route-only hooks local unless there is a clear reuse boundary.
- Existing hooks cover entrance path, user/profile access, onboarding flags, and recent updates.
- Demo metadata for mirrored HeroUI Native examples lives in `src/helpers/data`.

## `src/lib`

Integration clients and library-level helpers live here.

- `src/lib/supabase/`: Supabase client and generated types.
- `src/lib/queryClient.ts`: TanStack Query setup.
- `src/lib/revenuecat.ts`: RevenueCat helpers.
- `src/lib/toastMessage.tsx`: `react-native-toast-message` config.

Place new external service clients or shared integration adapters here. Keep UI components out of `src/lib`.

## `src/storage`

Local persistence adapters live here.

- `session.ts`: encrypted MMKV adapter for Supabase Auth storage.
- `onboarding.ts`: MMKV onboarding flags.
- `config.ts`: MMKV app config store.

Add new storage modules here when they represent durable local storage. Do not use this folder for transient React state.

## `src/types`

Shared TypeScript types live here.

- `appConfig.ts`: app config route/tab types.
- `expo-runtime.d.ts`: checked-in reference to Expo's ambient asset types for clean-checkout typechecking.
- `auth.ts`: token cache interface.
- `index.ts`: currently contains placeholder Supabase storage bucket type.

Prefer colocated types for feature-local data. Move types here when they are used across multiple areas.

## `src/helpers`

Small utility helpers live here.

- `helpers/utils/simulate-press.ts`: dev alert plus haptic feedback.
- `helpers/hooks/use-accessability-info.ts`: accessibility state hook.
- `helpers/types/image.d.ts`: image type declarations.

Use this folder for generic helpers, not feature-specific business logic.

## Asset Folders

- Root `assets/` is used by `app.json`, demo layouts, home preview cards, and showcase screens.
- `src/assets/` currently contains the auth logo used through the `@/assets/...` alias.

Before adding assets, prefer the folder already used by the feature you are changing. If consolidating asset locations, update imports and memory docs in the same turn.

## Folders That Do Not Exist Yet

Do not assume these exist:

- `server/`
- `src/features/`
- `src/api/`
- `src/app/api/`
- `docs/agents/README.md`
- `scripts/`

Create a missing folder only when the change introduces a real ownership boundary. For example, `src/features` may be reasonable for a substantial domain feature, but it is not an established convention in this repo today.

## Rules For New Top-Level Folders

- Avoid new top-level folders unless code cannot fit cleanly under existing ownership.
- Config/tooling folders are acceptable when required by the tool.
- Product documentation that is durable agent memory belongs in `docs/agents`.
- User-facing product docs should use a separate docs location only after deciding the documentation scope.
- When introducing a new top-level folder, update this file with its purpose and ownership rules.

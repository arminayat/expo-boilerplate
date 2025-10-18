# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo Router, using HeroUI Native as the UI component library. The app includes authentication via Supabase, subscription management via RevenueCat, analytics via PostHog, and is styled with NativeWind (Tailwind CSS for React Native).

## Key Commands

### Development
- `npm start` - Start Expo development server (clears cache)
- `npm run ios` - Run on iOS device (not simulator)
- `npm run android` - Run on Android device/emulator
- `npm run web` - Run web version (clears cache)

### Code Quality
- `npm run lint` - Run ESLint

### Database
- `npm run generate-types` - Generate TypeScript types from Supabase schema (project ID: nbybjvcqfjfyarlmtzib)

## Architecture

### App Structure (Expo Router File-based Routing)

The app uses Expo Router's file-based routing with route groups:

- `src/app/index.tsx` - Entry point that handles initial routing logic based on auth state
- `src/app/_layout.tsx` - Root layout with providers and font loading
- `src/app/(auth)/` - Authentication flow (sign-in, etc.) - presented as modal
- `src/app/(tabs)/` - Main tabbed interface (requires onboarding completion)
- `src/app/(onboarding)/` - Onboarding screens
- `src/app/(demo)/` - Demo/showcase screens for components

### Provider Hierarchy

The app wraps components in the following provider order (outermost to innermost):
1. `GestureHandlerRootView` - Gesture handling
2. `KeyboardProvider` - Keyboard control
3. `PostHogProvider` - Analytics
4. `AuthProvider` - Authentication state
5. `QueryClientProvider` - React Query
6. `SignedUrlCacheProvider` - Signed URL caching
7. `AppThemeProvider` - Theme management
8. `HeroUINativeProvider` - UI component theming

### Core Contexts

- **AuthContext** (`src/contexts/AuthContext.tsx`)
  - Manages Supabase authentication session
  - Handles automatic routing on sign-in/sign-out
  - Integrates with RevenueCat (userId login) and PostHog (user identification)
  - Use `useAuth()` hook to access session state

- **SignedUrlCacheContext** - Caches signed URLs (e.g., for S3/Supabase Storage)
- **AppThemeContext** - Manages app theme (integrates with HeroUI Native)

### Storage Layer

The app uses multiple storage solutions:

- **MMKV** (`react-native-mmkv`) - Fast, encrypted key-value storage
  - Session storage (`src/storage/session.ts`) uses encrypted MMKV with key stored in SecureStore
  - Used for Supabase auth persistence
- **SecureStore** - iOS Keychain/Android Keystore for sensitive data (encryption keys)
- **Storage modules**: `src/storage/session.ts`, `src/storage/onboarding.ts`, `src/storage/config.ts`

### Authentication Flow

1. User lands on `index.tsx` which checks auth state
2. If not authenticated → redirects to `/(auth)/sign-in`
3. On successful auth:
   - AuthContext updates session
   - RevenueCat logs in with userId
   - PostHog identifies user
   - Redirects to `/(tabs)/{entrancePath}` (determined by `useGetEntrancePath` hook)
4. Tabs layout checks onboarding status via `useCheckUserOnboarding` hook

### Supabase Integration

- Client configured in `src/lib/supabase/client.ts`
- Uses custom encrypted storage adapter (`src/storage/session.ts`)
- Auto-refresh enabled with AppState listener
- Types generated from database schema: `src/lib/supabase/types.ts`
- Environment variables required:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### RevenueCat Integration

- Configured in `src/lib/revenuecat.ts`
- iOS-only configuration (Android commented out)
- Auto-configures on user login via AuthContext
- Environment variable: `EXPO_PUBLIC_APPLE_PURCHASES_API_KEY`
- Ad Services attribution enabled

### Styling System

- **NativeWind** - Tailwind CSS for React Native
- **HeroUI Native** - Component library with custom Tailwind plugin
- Custom font family classes (w100-w900) mapped to RobotoSlab font weights
- Tailwind config includes HeroUI Native plugin and content paths
- Babel configured with `module-resolver` for `@/*` imports → `./src/*`

### React Query Usage

- QueryClient configured in `src/lib/queryClient.ts`
- Used for data fetching (e.g., `useUser` hook for user profiles)
- Wrapped in `QueryClientProvider` at provider level

## Configuration Files

- **Expo**: `app.json` - New Architecture enabled, typed routes enabled, React Compiler enabled
- **TypeScript**: `tsconfig.json` - Strict mode, path alias `@/*` → `./src/*`
- **Tailwind**: `tailwind.config.js` - NativeWind preset + HeroUI plugin
- **Babel**: `babel.config.js` - NativeWind preset + module resolver
- **Prettier**: `.prettierrc` - Tailwind plugin for class sorting
- **ESLint**: `eslint.config.js` - Expo flat config

## Important Patterns

### Path Aliases
Always use `@/` for imports from `src/` directory:
```typescript
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";
```

### Route Groups
- Use `(groupName)` for organizing routes without adding URL segments
- Groups can have their own `_layout.tsx` files
- Auth and settings use modal presentation

### Onboarding Flow
- Check device onboarding: `useCheckDeviceOnboarding`
- Check user onboarding: `useCheckUserOnboarding({ redirect: true })`
- User onboarding check happens in tabs layout to protect authenticated routes

### User Profile
- Use `useUser()` hook from `src/hooks/useUser.ts`
- Merges Supabase auth user with profile table data (profile table queries commented out currently)
- Provides `updateProfile()` method and auto-refetch

## Environment Variables Required

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_APPLE_PURCHASES_API_KEY`
- `EXPO_PUBLIC_POSTHOG_API_KEY` (EU instance: https://eu.i.posthog.com)

## Font System

The app uses RobotoSlab with 9 weight variants (100-900), loaded via `@expo-google-fonts/roboto-slab`. Fonts are loaded in root layout and available via Tailwind classes (font-w100 through font-w900).

## Analytics

PostHog configured with:
- Lifecycle events captured
- Touch events captured
- Screen events tracked manually (autocapture disabled)
- EU instance used

## New Architecture

This app uses React Native's New Architecture:
- `newArchEnabled: true` in app.json
- React Compiler experiments enabled
- Uses Reanimated 4.x (configured with warn-level logging)

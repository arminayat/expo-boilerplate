# React Native App Boilerplate

A mobile-first Expo SDK 58 / React Native 0.88 boilerplate and HeroUI Native demo app. Authentication plumbing, encrypted native storage, themes, and component showcases are implemented. Product tabs and onboarding are placeholders; the paywall showcases simulate purchases. See [current app behavior](docs/agents/01-app-overview.md) and the [dependency upgrade audit](docs/dependency-upgrade-audit.md) for verified capabilities and remaining limitations.

## ✨ Features

- 🎯 **File-based Routing** with Expo Router
- 🔐 **Authentication** powered by Supabase
- 💰 **Subscription Management** via RevenueCat
- 📊 **Analytics** with PostHog
- 🎨 **Modern UI** using HeroUI Native component library
- 🌈 **Theming System** with multiple pastel themes
- 💅 **TailwindCSS Styling** via Uniwind
- 🔒 **Secure Storage** with encrypted MMKV and SecureStore
- 📱 **Onboarding Flow** for new users
- 🚀 **New Architecture** enabled for better performance
- 🔄 **React Query** for efficient data fetching
- 📦 **TypeScript** for type safety
- ⚡ **React Compiler** experiments enabled

## 🛠 Tech Stack

### Core
- [React Native](https://reactnative.dev/) - Mobile framework
- [Expo](https://expo.dev/) - Development platform
- [TypeScript](https://www.typescriptlang.org/) - Type safety

The current compatibility set is Expo 58.0.17, Expo Router 58.0.25, React Native 0.88.0, React 19.3.0, HeroUI Native 1.0.11, Uniwind 1.13.0, and Supabase JS 2.118.0. Reanimated 4.7.1 and Worklets 0.13.0 move together. Babel 7, ESLint 9, and TypeScript 6 remain within the framework's supported peer ranges; independent latest major versions are not interchangeable with this set.

### UI & Styling
- [HeroUI Native](https://www.npmjs.com/package/heroui-native) - Component library
- [Uniwind](https://docs.uniwind.dev/) - TailwindCSS for React Native
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) - Blur effects
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations

### Backend & Services
- [Supabase](https://supabase.com/) - Backend as a Service
- [RevenueCat](https://www.revenuecat.com/) - Subscription management
- [PostHog](https://posthog.com/) - Product analytics

### State Management & Data
- [TanStack Query](https://tanstack.com/query/latest) - Server state management
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv) - Fast storage
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) - Secure storage

### Navigation
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing

## 📋 Prerequisites

- Node.js 22.23.2 (`nvm use`) and npm 10.9.8, matching the verified toolchain
- iOS: Xcode and CocoaPods compatible with Expo SDK 58; see the audit for the local toolchain and native-build results
- Android: Android Studio and JDK 17+
- Use the project-local Expo CLI through `npx expo`; do not install legacy `expo-cli` globally

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd app-boilerplate
```

### 2. Install Dependencies

```bash
npm ci
```

Native folders are generated and ignored by git. The first `npm run ios` generates the iOS project and installs CocoaPods. To refresh pods after a native project exists:

```bash
npm run ios:pods
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# RevenueCat Configuration
EXPO_PUBLIC_APPLE_PURCHASES_API_KEY=your_revenuecat_apple_api_key

# PostHog Configuration
EXPO_PUBLIC_POSTHOG_API_KEY=your_posthog_api_key
```

### 4. Set Up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Run the database migrations (create your schema)
3. Generate TypeScript types:
   ```bash
   npm run generate-types
   ```
   Note: Update the project ID in `package.json` script to match your Supabase project

### 5. Configure RevenueCat

1. Create a project on [RevenueCat](https://www.revenuecat.com)
2. Add your iOS app bundle identifier: `com.arminayat.heroui-native-example`
3. Configure your subscription products
4. Add your API key to `.env`

RevenueCat is optional: a missing or blank iOS key disables its adapter, and Android configuration is not implemented. Concurrent callers share initialization; optional service failures are handled without interrupting auth. Offering reads run after mounting and ignore results after unmount. The showcase paywalls still simulate purchases.

### 6. Configure PostHog

1. Create a project on [PostHog](https://posthog.com)
2. Add your API key to `.env`
3. The boilerplate is configured for EU instance by default

### 7. Run the App

```bash
# Start development server
npm start

# Build and run on an iOS simulator
npm run ios

# Select an iOS device
npm run ios:device

# Run on Android
npm run android

# Experimental web target (see limitations below)
npm run web
```

Use a native build, not Expo Go: MMKV/Nitro and RevenueCat require custom native modules. After an SDK/native dependency upgrade, rebuild the app. Expo prebuild regenerates native folders by default, so preserve any manual native changes first.

### Verify dependency changes

```bash
npm run check          # TypeScript, lint, adapter tests, Expo version alignment
npm run test:integrations # Isolated RevenueCat adapter tests; no live services
npm run doctor         # Expo project and native dependency checks
npm run export:native  # iOS + Android production bundles with Hermes bytecode
npm audit --audit-level=high # Current upstream advisories fail this gate
```

GitHub Actions runs validation on main pushes and pull requests. The security gate currently fails on two unpatched upstream high-severity advisories in `braces` and `node-forge`; a clean CI result is not claimed. These checks do not replace native compilation and simulator/device testing.

Native SecureStore session storage has no web adapter, and HeroUI Native does not guarantee web support. Browser testing was not performed, Android has no local SDK, and live services remain unverified. See the [audit](docs/dependency-upgrade-audit.md) for current build and check results; earlier SDK 57 results do not certify SDK 58.

## 📁 Project Structure

```
src/
├── app/                      # Expo Router pages
│   ├── index.tsx            # Entry point & routing logic
│   ├── _layout.tsx          # Root layout with providers
│   ├── (auth)/              # Authentication screens
│   ├── (tabs)/              # Main tabbed interface
│   ├── (onboarding)/        # Onboarding flow
│   └── (demo)/              # Component showcases
│
├── components/              # Reusable UI components
│   ├── auth/               # Auth-specific components
│   ├── showcases/          # Demo components
│   └── ...                 # Other UI components
│
├── contexts/               # React contexts
│   ├── AuthContext.tsx    # Authentication state
│   ├── AppThemeProvider.tsx # Theme management
│   └── Providers.tsx      # Provider composition
│
├── hooks/                  # Custom React hooks
│   ├── useUser.ts         # User data hook
│   └── ...
│
├── lib/                    # External service integrations
│   ├── supabase/          # Supabase client & types
│   ├── revenuecat.ts      # RevenueCat configuration
│   └── queryClient.ts     # React Query setup
│
├── storage/                # Storage utilities
│   ├── session.ts         # Encrypted session storage
│   ├── onboarding.ts      # Onboarding state
│   └── config.ts          # App configuration
│
├── themes/                 # Theme definitions
│   └── pastel-themes.ts   # Color themes
│
└── types/                  # TypeScript types
    └── ...
```

## 🔑 Key Features Explained

### Authentication Flow

The app uses Supabase for authentication with automatic routing:

1. User lands on `index.tsx` which checks authentication state
2. Not authenticated → redirects to sign-in screen
3. On successful authentication:
   - Session is stored in encrypted MMKV storage
   - RevenueCat logs in the user
   - PostHog identifies the user
   - Redirects to appropriate entrance screen

### Onboarding System

Two-level onboarding system:
- **Device Onboarding**: First-time app launch (stored locally)
- **User Onboarding**: First-time user onboarding (stored in profile)

### Storage Strategy

- **MMKV**: Fast, encrypted key-value storage for sessions
- **SecureStore**: iOS Keychain/Android Keystore for encryption keys
- **Supabase**: Backend database for user data

### Theme System

Built-in theme management with:
- Multiple pastel color schemes
- Light/dark mode support
- System preference detection
- Persistent theme selection

### Provider Hierarchy

The app uses a carefully ordered provider hierarchy:

```tsx
GestureHandlerRootView
  → KeyboardProvider
    → PostHogProvider
      → AuthProvider
        → QueryClientProvider
          → SignedUrlCacheProvider
            → AppThemeProvider
              → HeroUINativeProvider
```

## 📜 Available Scripts

```bash
# Development
npm start              # Start Expo dev server (clears cache)
npm run ios           # Build and run on iOS simulator
npm run ios:device    # Select an iOS device
npm run android       # Run on Android
npm run web           # Run web version

# Code Quality
npm run lint          # Run ESLint
npm run check         # Types, lint, adapter tests, and Expo alignment
npm run test:integrations # Run isolated RevenueCat adapter tests

# Database
npm run generate-types # Generate TypeScript types from Supabase

# iOS
npm run ios:pods      # Install CocoaPods for an existing generated iOS project
```

## 🔧 Configuration

### Update App Identity

Update the following files to customize for your app:

1. **package.json**: Change `name` and update version
2. **app.json**: Update `name`, `slug`, and bundle identifiers
3. **iOS Bundle ID**: Update in `app.json` → `ios.bundleIdentifier`
4. **Android Package**: Update in `app.json` → `android.package`

### Path Aliases

The project uses `@/` as a path alias for the `src/` directory:

```typescript
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";
```

### Font System

Custom font weights (100-900) using Roboto Slab:

```tsx
<Text className="font-w400">Regular text</Text>
<Text className="font-w700">Bold text</Text>
```

## 🎨 Styling Guidelines

This boilerplate uses Uniwind (TailwindCSS) for styling:

```tsx
import { View, Text } from "react-native";

export function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl font-w600 text-gray-900 dark:text-white">
        Hello World
      </Text>
    </View>
  );
}
```

## 🔐 Security Best Practices

- Environment variables are prefixed with `EXPO_PUBLIC_` for client-side access
- Sensitive data is stored in encrypted MMKV with keys in SecureStore
- Supabase uses Row Level Security (RLS) policies
- API keys are stored as environment variables (never committed)

## 🚢 Deployment

There is no configured EAS project, `eas.json`, signing setup, or automatic deployment in this repository. The following are setup steps, not a verified store release. Native dependency upgrades require a new binary; do not deliver them only as an OTA update. This upgrade adds no database migration or new environment variable. Configure the existing Supabase variables to launch and optional RevenueCat/PostHog keys to test those services.

### iOS

1. Update bundle identifier in `app.json`
2. Configure signing in Xcode
3. Build: `eas build --platform ios`

### Android

1. Update package name in `app.json`
2. Configure signing credentials
3. Build: `eas build --platform android`

See [Expo Application Services](https://expo.dev/eas) for full deployment documentation.

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Supabase Documentation](https://supabase.com/docs)
- [RevenueCat Documentation](https://www.revenuecat.com/docs)
- [Uniwind Documentation](https://docs.uniwind.dev/)

## 🤝 Contributing

This is a boilerplate project. Feel free to customize it for your needs!

## 📄 License

This project is private and proprietary.

## 💬 Support

For issues and questions, please refer to the documentation of the respective libraries and services used in this boilerplate.

---

**Built with ❤️ using React Native and Expo**

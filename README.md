# React Native App Boilerplate

A production-ready React Native boilerplate built with modern tools and best practices. This boilerplate includes authentication, subscriptions, analytics, beautiful UI components, and a complete onboarding flow - everything you need to jumpstart your next mobile app.

## ✨ Features

- 🎯 **File-based Routing** with Expo Router
- 🔐 **Authentication** powered by Supabase
- 💰 **Subscription Management** via RevenueCat
- 📊 **Analytics** with PostHog
- 🎨 **Modern UI** using HeroUI Native component library
- 🌈 **Theming System** with multiple pastel themes
- 💅 **TailwindCSS Styling** via NativeWind
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

### UI & Styling
- [HeroUI Native](https://www.npmjs.com/package/heroui-native) - Component library
- [NativeWind](https://www.nativewind.dev/) - TailwindCSS for React Native
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

- Node.js 18+ and npm
- iOS: Xcode 15+ and CocoaPods
- Android: Android Studio and JDK 17+
- Expo CLI: `npm install -g expo-cli`

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd app-boilerplate
```

### 2. Install Dependencies

```bash
npm install
```

For iOS, also install CocoaPods dependencies:

```bash
npm run pod-install
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

### 6. Configure PostHog

1. Create a project on [PostHog](https://posthog.com)
2. Add your API key to `.env`
3. The boilerplate is configured for EU instance by default

### 7. Run the App

```bash
# Start development server
npm start

# Run on iOS device
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

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
npm run ios           # Run on iOS device
npm run android       # Run on Android
npm run web           # Run web version

# Code Quality
npm run lint          # Run ESLint

# Database
npm run generate-types # Generate TypeScript types from Supabase

# iOS
npm run pod-install   # Install CocoaPods dependencies
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

This boilerplate uses NativeWind (TailwindCSS) for styling:

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
- [NativeWind Documentation](https://www.nativewind.dev/)

## 🤝 Contributing

This is a boilerplate project. Feel free to customize it for your needs!

## 📄 License

This project is private and proprietary.

## 💬 Support

For issues and questions, please refer to the documentation of the respective libraries and services used in this boilerplate.

---

**Built with ❤️ using React Native and Expo**


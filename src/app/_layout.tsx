// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import { useAppTheme } from "@/contexts/app-theme-context";
import Providers from "@/contexts/Providers";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { Stack } from "expo-router";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import "../../global.css";
import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Lora_400Regular, Lora_500Medium } from "@expo-google-fonts/lora";
import {
  RobotoSlab_100Thin,
  RobotoSlab_200ExtraLight,
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_600SemiBold,
  RobotoSlab_700Bold,
  RobotoSlab_800ExtraBold,
  RobotoSlab_900Black,
  useFonts,
} from "@expo-google-fonts/roboto-slab";
import { HeroUINativeProvider } from "heroui-native";
import { useMemo } from "react";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const RootRoutes = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="(auth)"
      options={{
        presentation: "modal",
        animation: "fade",
      }}
    />
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="(demo)" />
    <Stack.Screen
      name="(settings)"
      options={{
        presentation: "modal",
      }}
    />
    <Stack.Screen name="+not-found" />
  </Stack>
);

function ThemedLayout() {
  const { isDark } = useAppTheme();
  const navigationTheme = useMemo(() => {
    const baseTheme = isDark ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: isDark ? "#09090b" : "#ffffff",
        border: isDark ? "#27272a" : "#e4e4e7",
        card: isDark ? "#09090b" : "#ffffff",
        notification: isDark ? "#fafafa" : "#18181b",
        primary: isDark ? "#fafafa" : "#18181b",
        text: isDark ? "#fafafa" : "#18181b",
      },
    };
  }, [isDark]);

  return (
    <HeroUINativeProvider
      config={{
        textProps: {
          allowFontScaling: false,
        },
      }}
    >
      <ThemeProvider value={navigationTheme}>
        <RootRoutes />
      </ThemeProvider>
    </HeroUINativeProvider>
  );
}

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Lora_400Regular,
    Lora_500Medium,
    RobotoSlab_100Thin,
    RobotoSlab_200ExtraLight,
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
    RobotoSlab_800ExtraBold,
    RobotoSlab_900Black,
  });

  // Native headers and toasts reference these families on their first render.
  if (!fontsLoaded && !fontError) return null;

  return (
    <Providers>
      <ThemedLayout />
    </Providers>
  );
}

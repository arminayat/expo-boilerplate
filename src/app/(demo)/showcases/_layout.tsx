// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { useThemeColor } from 'heroui-native';

export default function Layout() {
  const themeColorBackground = useThemeColor('background');

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: isLiquidGlassAvailable() ? false : true,
        animation: 'none',
        contentStyle: {
          backgroundColor: themeColorBackground,
        },
      }}
    >
      <Stack.Screen name="raycast" options={{ animation: 'fade' }} />
      <Stack.Screen name="super-app-paywall" options={{ animation: 'fade' }} />
    </Stack>
  );
}

// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import { useBottomSheet, useBottomSheetAnimation } from 'heroui-native';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';
import { useAppTheme } from '../contexts/app-theme-context';
import { AnimatedBlurView } from './animated-blur-view';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const BottomSheetBlurOverlay = () => {
  const { isDark } = useAppTheme();
  const { isOpen, onOpenChange } = useBottomSheet();
  const { progress } = useBottomSheetAnimation();

  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, 40, 0]);
  });

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatedPressable
      style={StyleSheet.absoluteFill}
      onPress={() => onOpenChange(false)}
    >
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={isDark ? 'dark' : 'systemUltraThinMaterialDark'}
        style={StyleSheet.absoluteFill}
      />
    </AnimatedPressable>
  );
};

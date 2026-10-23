// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

export const simulatePress = () => {
  if (__DEV__) {
    Alert.alert('Pressed');
  }

  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

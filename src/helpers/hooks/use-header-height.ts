// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import { useHeaderHeight as useHeaderHeightElements } from 'expo-router/react-navigation';
import { useState } from 'react';
import { Platform } from 'react-native';

function useHeaderHeight(): number {
  const headerHeight = useHeaderHeightElements();
  const [fixedHeight] = useState(headerHeight);

  return Platform.OS === 'android' ? fixedHeight : headerHeight;
}
export default useHeaderHeight;

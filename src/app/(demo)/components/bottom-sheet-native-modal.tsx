// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import { View } from 'react-native';
import { BasicBottomSheetContent } from '../../../components/bottom-sheet/basic';

export default function BottomSheetNativeModalScreen() {
  return (
    <View className="pt-24 px-5">
      <View className="mt-8">
        <BasicBottomSheetContent />
      </View>
    </View>
  );
}

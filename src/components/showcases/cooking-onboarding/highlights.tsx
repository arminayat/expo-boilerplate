// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import { type FC } from 'react';
import { View } from 'react-native';
import { AppText } from '../../app-text';

type HighlightItemProps = {
  label: string;
  value: string;
};

const HighlightItem: FC<HighlightItemProps> = ({ label, value }) => {
  return (
    <View>
      <AppText className="text-base text-muted">{label}</AppText>
      <AppText className="text-base font-semibold text-foreground">
        {value}
      </AppText>
    </View>
  );
};

export const Highlights: FC = () => {
  return (
    <View className="flex-row justify-between mb-8">
      <HighlightItem label="Level" value="Beginner" />
      <HighlightItem label="Cooking" value="15m" />
      <HighlightItem label="Overall" value="35m" />
      <HighlightItem label="Ready" value="3:03pm" />
    </View>
  );
};

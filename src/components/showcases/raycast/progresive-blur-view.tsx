// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import NativeMaskedView, {
  type MaskedViewProps,
} from '@react-native-masked-view/masked-view';
import { BlurView, type BlurViewProps } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { cn, colorKit, useThemeColor } from 'heroui-native';
import { type ComponentType, type FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

// Masked View 0.3.2 still types its class with the removed RN NativeMethods mixin.
// Its runtime is a React component; retain its published props at this boundary.
const MaskedView = NativeMaskedView as unknown as ComponentType<MaskedViewProps>;

type Props = {
  position?: 'top' | 'bottom';
  height?: number;
  blurViewProps?: BlurViewProps;
};

export const ProgressiveBlurView: FC<Props> = ({
  position = 'top',
  height = 100,
  blurViewProps,
}) => {
  const themeColorBackground = useThemeColor('background');

  return (
    <View
      className={cn(
        'absolute left-0 right-0 pointer-events-none',
        position === 'top' ? 'top-0' : 'bottom-0'
      )}
      style={[
        {
          position: 'absolute',
          height,
        },
      ]}
    >
      {Platform.OS === 'ios' ? (
        <MaskedView
          maskElement={
            <LinearGradient
              locations={position === 'top' ? [0.5, 1] : [0, 0.5]}
              colors={
                position === 'top'
                  ? ['black', 'transparent']
                  : ['transparent', 'black']
              }
              style={StyleSheet.absoluteFill}
            />
          }
          style={[StyleSheet.absoluteFill]}
        >
          <BlurView
            style={[StyleSheet.absoluteFill, blurViewProps?.style]}
            intensity={blurViewProps?.intensity ?? 75}
            {...blurViewProps}
          />
        </MaskedView>
      ) : (
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={
            position === 'top'
              ? [
                  colorKit.setAlpha(themeColorBackground, 0.9).hex(),
                  colorKit.setAlpha(themeColorBackground, 0).hex(),
                ]
              : [
                  colorKit.setAlpha(themeColorBackground, 0).hex(),
                  colorKit.setAlpha(themeColorBackground, 0.9).hex(),
                ]
          }
        />
      )}
    </View>
  );
};

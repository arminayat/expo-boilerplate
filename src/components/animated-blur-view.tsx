// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import { BlurView, type BlurViewProps } from 'expo-blur';
import { type FC } from 'react';
import Animated, {
  type SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';

const RBlurView = Animated.createAnimatedComponent(BlurView);

interface Props extends BlurViewProps {
  blurIntensity: SharedValue<number>;
}

export const AnimatedBlurView: FC<Props> = ({ blurIntensity, ...props }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      intensity: blurIntensity.get(),
    };
  });

  return <RBlurView animatedProps={animatedProps} {...props} />;
};

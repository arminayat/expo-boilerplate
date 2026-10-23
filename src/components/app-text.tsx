// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
import { cn } from 'heroui-native';
import React from 'react';
import {
  Text as RNText,
  type TextInstance,
  type TextProps as RNTextProps,
} from 'react-native';

export const AppText = React.forwardRef<TextInstance, RNTextProps>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <RNText ref={ref} className={cn('font-normal', className)} {...restProps} />
  );
});

AppText.displayName = 'AppText';

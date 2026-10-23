// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
/**
 * Common props for icon components
 */
export interface IconProps {
  /**
   * Size of the icon in pixels
   * @default 20
   */
  size?: number;
  /**
   * Color of the icon (fill)
   * @default "currentColor"
   */
  color?: string;
  /**
   * ClassName prop for color (mapped to color via withUniwind)
   * Example: "accent-blue-500" maps to color prop with resolved color value
   */
  colorClassName?: string;
}

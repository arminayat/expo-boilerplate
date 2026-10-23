// Derived from HeroUI Native (Copyright 2025 NextUI Inc.).
// Adapted for Expo Boilerplate; local changes are described in Git history.
// SPDX-License-Identifier: Apache-2.0
/**
 * Central registry of all component screens displayed in the example app.
 * Consumed by the component list, navigation layout, and home page.
 */

export const COMPONENTS = [
  {
    title: 'Accordion',
    path: 'accordion',
  },
  {
    title: 'Alert',
    path: 'alert',
  },
  {
    title: 'Avatar',
    path: 'avatar',
  },
  {
    title: 'BottomSheet',
    path: 'bottom-sheet',
  },
  {
    title: 'Button',
    path: 'button',
  },
  {
    title: 'Card',
    path: 'card',
  },
  {
    title: 'Checkbox',
    path: 'checkbox',
  },
  {
    title: 'Chip',
    path: 'chip',
  },
  {
    title: 'CloseButton',
    path: 'close-button',
  },
  {
    title: 'ControlField',
    path: 'control-field',
  },
  {
    title: 'Description',
    path: 'description',
  },
  {
    title: 'Dialog',
    path: 'dialog',
  },
  {
    title: 'FieldError',
    path: 'field-error',
  },
  {
    title: 'Input',
    path: 'input',
  },
  {
    title: 'InputGroup',
    path: 'input-group',
  },
  {
    title: 'InputOTP',
    path: 'input-otp',
  },
  {
    title: 'Label',
    path: 'label',
  },
  {
    title: 'LinkButton',
    path: 'link-button',
  },
  {
    title: 'ListGroup',
    path: 'list-group',
  },
  {
    title: 'Menu',
    path: 'menu',
  },
  {
    title: 'Popover',
    path: 'popover',
  },
  {
    title: 'PressableFeedback',
    path: 'pressable-feedback',
  },
  {
    title: 'RadioGroup',
    path: 'radio-group',
  },
  {
    title: 'ScrollShadow',
    path: 'scroll-shadow',
  },
  {
    title: 'SearchField',
    path: 'search-field',
  },
  {
    title: 'Select',
    path: 'select',
  },
  {
    title: 'Separator',
    path: 'separator',
  },
  {
    title: 'Skeleton',
    path: 'skeleton',
  },
  {
    title: 'Slider',
    path: 'slider',
  },
  {
    title: 'Spinner',
    path: 'spinner',
  },
  {
    title: 'Surface',
    path: 'surface',
  },
  {
    title: 'Switch',
    path: 'switch',
  },
  {
    title: 'Tabs',
    path: 'tabs',
  },
  {
    title: 'TagGroup',
    path: 'tag-group',
  },
  {
    title: 'Text',
    path: 'text',
  },
  {
    title: 'TextArea',
    path: 'text-area',
  },
  {
    title: 'TextField',
    path: 'text-field',
  },
  {
    title: 'Toast',
    path: 'toast',
  },
] as const;

export type ComponentItem = (typeof COMPONENTS)[number];

# Design System

## Current Visual Direction

Current implementation combines two surfaces:

- App shell: minimal placeholder tabs and simple auth screens, with some early custom colors such as `bg-lightYellow`, `text-purple`, and `bg-yellow`.
- Demo shell: polished HeroUI Native showcase with tokenized backgrounds/surfaces, translucent headers, theme switching, animated cards, dialogs, popovers, and full-screen showcase compositions.

The most established design direction in code is the HeroUI Native demo system: token-driven light/dark themes, soft surfaces, animated interactions, icon-rich controls, and mobile-first layouts.

## Typography

Implemented:

- Root layout loads Roboto Slab weights 100 through 900 using `@expo-google-fonts/roboto-slab`.
- `HeroUINativeProvider` sets `textProps.allowFontScaling` to `false`.
- `AppText` wraps React Native `Text` with `font-normal`.

Referenced but not fully wired:

- README documents custom font weights.
- Demo header styles reference `Inter_600SemiBold`.
- Toast styles reference `Lora_500Medium` and `Lora_400Regular`.
- Root font loading currently does not load Inter or Lora.

## Colors And Theme Tokens

Styling sources:

- `global.css` imports Tailwind CSS, Uniwind, HeroUI Native styles, and theme CSS files.
- `themes/lavander.css`, `themes/mint.css`, and `themes/sky.css` define extra theme variants.
- `themes/alpha.css` exists but is not imported by `global.css` and is not listed as an extra theme in `metro.config.js`.
- `src/contexts/app-theme-context.tsx` supports `light`, `dark`, `lavender-light`, `lavender-dark`, `mint-light`, `mint-dark`, `sky-light`, and `sky-dark`.

Primary token families used in code:

- Base: `background`, `foreground`.
- Surfaces: `surface`, `surface-foreground`, `overlay`, `overlay-foreground`.
- Text/support: `muted`, `link`.
- Action: `accent`, `accent-foreground`, `default`, `default-foreground`.
- Status: `success`, `warning`, `danger`.
- Structure: `border`, `divider`, `segment`.
- Forms: `field-background`, `field-foreground`, `field-placeholder`, `field-border`.

## Spacing And Layout Principles

Implemented patterns:

- Mobile-first vertical stacks with `flex-1`, `gap-*`, `px-*`, and safe-area/header offsets.
- `ScreenScrollView` sets `bg-background`, default horizontal padding, top padding from header height, and bottom padding from safe-area insets.
- `SafeAreaView` sets `bg-background` and safe-area bottom padding; on iOS it uses header height for top padding.
- Demo cards and component surfaces often use `rounded-2xl` or larger radii, while auth screens use a different early style.
- Showcases favor full-screen compositions rather than nested page cards.

## Component Library Usage

Primary UI library:

- `heroui-native` for buttons, cards, chips, dialogs, popovers, selects, tabs, surfaces, radio groups, checkboxes, form fields, toasts, utility `cn`, and `useThemeColor`.

Supporting UI/interaction libraries:

- `@expo/vector-icons` and `lucide-react-native` for icons.
- `expo-glass-effect`, `expo-blur`, and translucent headers for visual effects.
- `react-native-reanimated` for animations.
- `react-native-keyboard-controller` for keyboard-aware screens and preloading.
- `expo-haptics` for tactile feedback in demos.

## Accessibility And Interaction Conventions

Implemented:

- Demo layout detects reduced motion and shows a persistent warning toast.
- `useAccessibilityInfo()` can observe reduce motion and reduce transparency, though it is not widely used.
- Many demo actions include haptic feedback through `simulatePress()` or direct `expo-haptics` calls.
- Dialog/select examples include native-modal variants and keyboard-aware behavior.

Current concerns:

- `allowFontScaling: false` disables system font scaling globally for HeroUI Native text props.
- Some placeholder screens have minimal semantics and no accessibility-specific handling.
- Several demo actions are simulated and may not represent final accessible product flows.

## Product UX Principles Reflected In Code

- Keep the main app shell simple until real product behavior exists.
- Use tokenized theme classes rather than hard-coded colors for reusable surfaces.
- Prefer HeroUI Native primitives before custom-building common controls.
- Keep demo/showcase state local unless it represents real app data.
- Use motion and haptics to clarify interactions, but respect reduced-motion state where implemented.
- Use full-screen mobile compositions for showcase experiences.

## Do Guidance

- Use `bg-background`, `text-foreground`, `text-muted`, `bg-surface`, and other theme tokens for app surfaces.
- Use `AppText` in shared/demo components when matching existing demo typography.
- Use HeroUI Native components for controls already covered by the library.
- Use `withUniwind()` when styling icons or animated components with class names.
- Keep theme additions synchronized across `themes/*.css`, `metro.config.js`, `app-theme-context.tsx`, and generated Uniwind types.
- Preserve the local style of the file you are editing.

## Do Not Guidance

- Do not assume the auth screen color classes define the mature product design system; they are not aligned with the tokenized demo system.
- Do not edit `src/uniwind-types.d.ts` manually.
- Do not add new hard-coded brand palettes when existing theme tokens can express the UI.
- Do not claim a font is available just because it is referenced in styles; verify root font loading.
- Do not wire real payments to showcase buttons without replacing simulated actions and documenting the behavior.

## Implemented Versus Intended

Implemented:

- Theme-aware HeroUI Native provider.
- Light/dark plus lavender/mint/sky theme variants.
- Demo theme selector and theme toggle.
- Token-based CSS themes.
- Reanimated demo transitions and local component interactions.
- Custom toast config for `react-native-toast-message`.

Intended or incomplete:

- Consistent product-wide visual direction outside the demo area.
- Full onboarding UX.
- Real paywall and subscription UX.
- Fully loaded/consistent font system for Roboto Slab, Inter, and Lora references.
- Accessibility policy for font scaling, reduced transparency, labels, and final product flows.

# Agent Instructions

This repository uses `docs/agents/` as persistent project memory. Start here, then read the relevant memory files before making code, product, architecture, tooling, folder, or UI changes.

Code is the source of truth. README files, briefs, specs, generated types, and product notes describe intent only when the behavior is not implemented in code. When intent and code disagree, document the current implementation separately from planned or aspirational behavior.

## Required iOS Navigation

This rule applies to this boilerplate and every project derived from it. Retain it when copying, customizing, or regenerating project instructions.

- Always use actual iOS native navigation and tabs: Expo Router `Stack` and `NativeTabs` from `expo-router/native-tabs`. Do not substitute JavaScript tab bars or navigation components that only look native.
- Screen titles, back navigation, and header actions belong to the native stack header. Use native text titles and `Stack.Toolbar` buttons/menus for header actions; do not recreate them in screen content, custom header renderers, or floating overlays.
- Native navigation must respond to scrolling: use native large-title collapse where appropriate, preserve system scroll-edge appearance, and use native tab minimization on supported iOS versions. Connect the screen's scroll view/list to automatic native content insets; do not simulate header or tab transitions in JavaScript.
- Keep native system typography, gestures, accessibility, and OS-version fallbacks. HeroUI Native remains appropriate for screen content, not as a replacement for navigation chrome.
- Existing placeholder screens and copied demos do not override this rule. When adapting them into product screens, fix their navigation to comply. See [implementation guidance and current gaps](docs/agents/04-implementation-patterns.md#required-ios-native-navigation) and the [design system](docs/agents/06-design-system.md#required-navigation-and-scroll-behavior).

## Memory Index

- `docs/agents/01-app-overview.md` - product purpose, implemented flows, intended direction, boundaries, and non-goals.
- `docs/agents/02-pages-and-actions.md` - routes, screens, workflows, commands, user actions, mutations, external calls, and placeholders.
- `docs/agents/03-architecture-and-tools.md` - stack, runtime, package manager, data layer, integrations, environment, testing, build, and deployment assumptions.
- `docs/agents/04-implementation-patterns.md` - conventions currently used in components, routes, data fetching, mutations, styling, testing, and framework boundaries.
- `docs/agents/05-folder-structure.md` - practical directory map and placement rules for new code.
- `docs/agents/06-design-system.md` - current visual system, theme tokens, component usage, accessibility, UX direction, and design gaps.

## Maintenance Rule

Whenever an agent changes product behavior, introduces a new architectural boundary, adds or changes a folder convention, changes tooling, or materially changes UI direction, update the relevant `docs/agents/*.md` file in the same turn before finishing.

Keep memory notes concise, current, and non-contradictory. Rewrite stale statements instead of appending historical clutter.

# Agent Instructions

This repository uses `docs/agents/` as persistent project memory. Start here, then read the relevant memory files before making code, product, architecture, tooling, folder, or UI changes.

Code is the source of truth. README files, briefs, specs, generated types, and product notes describe intent only when the behavior is not implemented in code. When intent and code disagree, document the current implementation separately from planned or aspirational behavior.

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

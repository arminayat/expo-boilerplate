# Contributing

Thanks for helping improve Expo Boilerplate. Small fixes, clear bug reports, and practical documentation are useful contributions. This project is maintained on a best-effort basis.

## Before starting

- Read the [README](README.md), [setup guide](docs/getting-started.md), and [AGENTS.md](AGENTS.md). Code is the source of truth; the agent notes describe current implementation.
- Search existing issues before reporting a bug. Open an issue to discuss a substantial feature or dependency/architecture change before investing in a large pull request.
- Follow the [code of conduct](CODE_OF_CONDUCT.md). Report sensitive security issues using [SECURITY.md](SECURITY.md).

## Local development

1. Fork and clone the repository.
2. Follow the setup guide, including your own `.env` and native build prerequisites.
3. Create a focused branch from `main`.
4. Make the smallest complete change, preserving existing data and unrelated behavior.

Use npm and commit `package-lock.json` when dependency declarations change. Keep Expo-coupled React Native, React, Reanimated, Worklets, and native packages within the supported compatibility set; do not use `--force` or `--legacy-peer-deps` to conceal conflicts.

## Code and documentation

- Prefer existing providers, components, theme tokens, and folder conventions. Avoid speculative services and configuration.
- Keep components/files focused; consider splitting files that grow beyond about 500 lines.
- Update the relevant `docs/agents/*.md` notes when product behavior, architecture, tooling, or folder conventions change.
- Preserve upstream copyright/license notices and identify modifications to copied HeroUI files. See [NOTICE](NOTICE).
- Do not commit `.env`, credentials, native signing files, generated native folders, build output, or local editor/cache files.
- Add focused tests for behavior changes. The existing adapter tests use Node's built-in runner, not a browser or live service.
- Coding agents must not browser-test unless explicitly instructed. Native runtime testing and local command checks are separate evidence.

## Verification

```sh
npm run check
npm run doctor
npm ls --all --omit=optional
npm run export:native
npm audit --audit-level=high
git diff --check
```

Run the checks relevant to your change and report exactly what you ran. Dependency/native changes require fresh native build/device verification where possible. Never describe a Hermes export as a device test.

The documented `braces` and `node-forge` advisories currently fail the high-severity audit gate. State that baseline accurately; do not remove the gate or introduce new vulnerable dependencies to work around it. See the [audit](docs/dependency-upgrade-audit.md) for known failures and platform limitations.

## Pull requests

Explain the problem, the resulting behavior, the verification performed, and any environment/migration/rebuild requirements. Include screenshots for visual changes when available, with private information removed. Keep each PR focused and use the PR template.

Original contributions are accepted under Apache-2.0. By contributing, you represent that you have the right to submit your contribution under that license. Dependencies and existing third-party material retain their licenses; no separate CLA is currently required.

# Security policy

## Reporting a vulnerability

Use [GitHub private vulnerability reporting](https://github.com/arminayat/expo-boilerplate/security/advisories/new). Do not post credentials, personal data, or exploit details in a public issue. Include the affected commit/version, impact, and a minimal reproduction with synthetic data.

If private reporting is unavailable, contact the maintainer at **arminayat3@gmail.com** and ask for a private exchange before sending sensitive material. Response is best-effort; no response-time guarantee is offered.

## Supported versions

Security fixes target the current `main` branch. There is no maintained release/backport policy yet. Applications built from this starter must track their own dependency updates, backend access rules, and deployed versions.

## Known findings

As of October 23, 2026, the dependency audit reports two unpatched upstream advisories in `braces` and `node-forge`, propagated to 25 high-severity package flags. The high/critical CI audit gate remains enabled and currently fails. See the [full audit](docs/dependency-upgrade-audit.md#security-findings) for affected paths, source links, and verification limits.

## Using this starter safely

- `EXPO_PUBLIC_*` values are public client configuration. Use Supabase publishable/anon keys, never service-role/secret keys.
- Configure ownership-based Supabase RLS for your app's tables and storage. Client-side routing is not an authorization boundary.
- Root auth gating is intentionally bypassed in the demo. Change it before adding private screens.
- Preserve encrypted session storage and native Keychain/Keystore entitlements.
- Keep credentials out of commits, issue attachments, screenshots, and logs. Rotate an exposed credential; removing it from the latest file does not remove it from Git history.
- Production auth, payments, analytics, and native runtime behavior must be verified in your own environment. No deployed backend is provided.

---
name: ist-hr-mobile-app
description: Use when implementing or revising IST HR app screens, navigation, client branding, settings-driven behavior, request forms, or approval flows.
---

# IST HR mobile app workflow

1. Read the relevant sections of `APP_CONTEXT.md` and inspect the existing route/component structure before editing.
2. Keep the provided 16-screen design as the visual reference. Treat its names and sample records as UI content, not as backend/API specifications.
3. Build a screen as a route that composes shared components. Reuse common headers, tab navigation, input fields, status badges, request cards, filters, and approval-step displays.
4. Keep colors, spacing, typography, and client logos in centralized theme/brand configuration. Do not add client-specific colors or URLs directly to individual screen files.
5. Before the API contract exists, use isolated mock fixtures and local UI state. Make mock data easy to replace; do not create guessed endpoints or policy logic.
6. For settings-driven behavior, first map the supplied settings schema into typed app configuration, then keep company-rule decisions in domain helpers rather than presentation components.
7. Preserve accessibility labels, readable contrast, safe-area spacing, and layouts that work on common phone sizes.
8. After an implementation, summarize changed routes/components and any assumptions. Run tests or verification only when the user asks.

## Current app structure

- Route files: `src/app/`
- Shared components: `src/components/`
- Theme constants/hooks: `src/constants/` and `src/hooks/`
- App configuration: `app.json`

Use `npx expo install <package>` for dependencies with native code when possible. Keep iOS store distribution decisions open until the client-copy model is confirmed.

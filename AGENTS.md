# Repository instructions

- Read `APP_CONTEXT.md` before changing product behavior or adding HR workflows.
- For screen, theme, request-form, and approval-flow work, follow `.agents/skills/ist-hr-mobile-app/SKILL.md`.
- Keep this project on Expo, TypeScript, and Expo Router unless a concrete native requirement justifies a change.
- Keep screens focused and reuse shared components for navigation, fields, request cards, status labels, and approval steps.
- Put shared visual values in theme tokens. Keep tenant branding/configuration centralized so a client change does not require editing every screen.
- Until API specifications are supplied, use clearly labeled mock data and local state. Do not invent production endpoints, payloads, credentials, or business rules.
- Keep network code in a service layer and keep secrets out of source control.
- Comment each logical step in new code so a React Native beginner can follow it.
- Use `npx expo install <package>` for Expo/native dependencies when possible so versions match the installed Expo SDK.
- Preserve the existing project structure and dependency choices unless the task calls for changing them.
- Do not prepare or submit client-specific App Store copies until the distribution/ownership model is decided.
- Do not add or run tests unless the user asks for testing or verification.

## Useful commands

- `npm run start` — start Expo development server
- `npm run android` — start on Android
- `npm run web` — start the web target
- `npm run lint` — run the configured Expo lint command

Local iOS simulator builds require macOS/Xcode. Use EAS cloud builds for iOS from Windows.

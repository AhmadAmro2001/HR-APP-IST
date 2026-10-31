# IST HR Mobile App Context

## Product summary

IST HR is a mobile employee self-service app for employees and authorized approvers. The provided design focuses on submitting and tracking leave, permission, and business trip requests, plus reviewing requests from employees.

## Confirmed product direction

- Build a reusable React Native app template for client organizations.
- Clients share the core business APIs. The settings API is client-specific and supplies company rules.
- Apply client branding such as logo and colors through configuration rather than scattering client-specific values across screens.
- The first implementation is UI-first. Use local mock data until API documentation and the settings contract are provided.
- The design contains 16 mobile screens, summarized below.

## Design screen map

| Page | Screen | Main purpose |
|---|---|---|
| 1 | Login | Username/password entry and password recovery link |
| 2 | Home | Shortcuts to personal data, payslip, requests, and approvals; notification and profile navigation |
| 3 | Request types | Choose leave, permission, or business trip |
| 4 | Approval types | Choose leave, permission, or business trip approvals |
| 5 | Leave requests | Search/filter submitted leave requests and start a new one |
| 6 | Leave details | Review dates, status, and approval workflow |
| 7 | New leave request | Enter leave type, dates, days, note, and optional attachment |
| 8 | Permission requests | Search/filter submitted permission requests and start a new one |
| 9 | Permission details | Review permission time, status, and approval workflow |
| 10 | New permission request | Enter type, date, start time, hours, and optional attachment |
| 11 | Business trips | Search/filter submitted trips and start a new one |
| 12 | Business trip details | Review route, dates, times, purpose, status, and approval workflow |
| 13 | New business trip | Enter trip type, date range, route, times, and purpose |
| 14 | Leave approvals | Review employee leave requests and approve/reject pending items |
| 15 | Permission approvals | Review employee permission requests and approve/reject pending items |
| 16 | Business trip approvals | Review employee trip requests and approve/reject pending items |

## Design observations and limits

- Request detail screens depict a multi-level approval chain, with up to six levels in the examples.
- The home screen implies personal data and payslip features, but their detailed screens are not in the supplied design.
- Profile details, notification behavior, and the password recovery flow are not specified by the supplied screens.
- Attendance and clock-in/clock-out are not shown; do not add them without a product decision.
- Names and request records in the design are sample content, not production data.

## Initial technical direction

- Expo with TypeScript and Expo Router is the starting stack.
- Use Expo-compatible dependency installation and keep Expo packages aligned with the installed SDK.
- Use EAS Build for iOS cloud builds from the Windows development machine when device/store builds are needed.
- Keep tenant branding and settings behind central theme/configuration interfaces. Do not hardcode a client's colors, URLs, or rules inside individual screens.
- Keep API access in a separate service layer. Do not invent endpoint paths, payloads, authentication rules, or company-policy calculations.

## Current implementation

- The first screen is `src/app/login.tsx`, using `assets/images/IST_LOGO.png`; `src/app/index.tsx` opens it by default.
- Client name, logo, and primary color are centralized in `src/config/tenant.ts`.
- Shared screen tokens are in `src/constants/theme.ts`; reusable inputs and buttons are in `src/components/`.
- `src/services/api/` reserves separate modules for shared APIs, authentication, and the client-specific settings API. No backend contract or endpoint has been supplied yet.
- The user-provided demo credentials `test` / `1234` are isolated in `src/mocks/auth.ts`. A successful demo login opens `src/app/home.tsx`.
- The Home screen follows page 2 of the design. The employee name is clearly marked mock data in `src/mocks/employee.ts`.
- `src/components/app-shell.tsx` provides the teal header, notification button, bottom navigation, and side menu. The menu mirrors Home, Requests, Approvals, and Profile from the bottom bar, then adds Logout.
- Demo Logout returns to the login route; real session clearing awaits the authentication contract.
- Home shortcuts and navigation open placeholder routes for features whose screens have not yet been designed or implemented.
- Missing or incorrect demo credentials show a reusable inline form error; future authentication API failures can use the same message component.
- The login screen's circle is a `Remember me` selection with its text on the left. Its state is local only until session storage behavior is specified.
- Shared form fields have a teal border only while focused, then return to the normal border when focus leaves.
- New code should comment each logical step for a developer learning React Native.

## Open decisions

- Whether each client will receive a separately branded app binary/listing or whether one app will serve multiple tenants. Review the Apple distribution path before preparing client-specific iOS submissions.
- The settings API schema, client selection/identification mechanism, and how settings failures or stale settings are handled.
- Authentication, roles, and which approval screens are available to which employees.
- Exact request rules, date/time calculations, attachment limits, cancellation/edit rules, and approval transitions.
- Supported languages, localization, and right-to-left layout requirements.
- Production branding assets, app name, bundle identifiers, and store distribution ownership.

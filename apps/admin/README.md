# Libya Charity Admin Dashboard

Operational admin dashboard scaffold for **Libya Charity** built with Next.js App Router.

## Stack
- Next.js + TypeScript
- Tailwind CSS
- lucide-react
- React Query

## Run
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Implemented pages
- Login: `/login`
- Dashboard overview: `/`
- Cases: `/cases`
- Case detail: `/cases/[id]`
- Organizations: `/organizations`
- Donations: `/donations`
- Reports: `/reports`
- Support: `/support`
- Audit logs: `/audit`
- Internal users: `/users`

## Current mock scope
- Auth/session is frontend-only mock (`lib/auth/auth-context.tsx`).
- Data currently comes from mock API layer (`lib/api/mock-data.ts`, `lib/api/client.ts`).
- All critical actions are UI placeholders with confirmation patterns.

## Ready for backend integration
- API abstraction (`lib/api/client.ts` + `lib/api/endpoints.ts`) can be swapped to real fetch calls.
- TypeScript domain types are centralized in `lib/types/index.ts`.
- Dashboard modules map directly to backend resources (`cases`, `organizations`, `donations`, `reports`, `support`, `audit`, `users`).

## Notes
- TODO markers identify future backend wiring points.
- No Flutter/mobile files are touched by this admin scaffold.

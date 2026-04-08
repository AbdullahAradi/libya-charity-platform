# Libya Charity API (Backend Foundation)

Backend scaffold for **Libya Charity / ليبيا الخيرية** built for future mobile/web integration.

## Stack
- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT auth
- Zod validation
- bcrypt password hashing
- dotenv + cors

## Structure
```
src/
  app.ts
  server.ts
  config/
  modules/
    auth/
    users/
    organizations/
    cases/
    campaigns/
    sponsorships/
    donations/
    reports/
    support/
    admin/
    audit/
  middleware/
  utils/
  lib/
prisma/
  schema.prisma
  seed.ts
```

## Setup
1. Copy env:
   - `cp .env.example .env`
2. Install dependencies:
   - `npm install`
3. Generate Prisma client:
   - `npm run prisma:generate`
4. Run migrations:
   - `npm run prisma:migrate`
5. Seed sample data:
   - `npm run seed`
6. Start dev server:
   - `npm run dev`

## Environment variables
- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `NODE_ENV`

## Implemented modules
- Auth: register, login, current user.
- Users: own profile read/update, admin list users.
- Organizations: public listing/details + admin lifecycle.
- Cases: public browsing, submission, reviewer workflow, admin publish state, updates, public reports.
- Campaigns: public browsing + admin CRUD/status.
- Sponsorship programs: public browsing + admin CRUD.
- Donations: record keeping only (one-time + recurring), receipts.
- Reports: public list/detail + admin create/publish.
- Support requests: user create/list + support/admin queue updates.
- Audit logs: stored for sensitive admin/reviewer actions.

## Intentionally postponed (TODO)
- Payment gateway integration and webhooks.
- File upload service and storage integration for case documents.
- Chatbot backend.
- Advanced admin analytics/BI endpoints.
- Background jobs/queue workers.

## Notes
- Public case endpoints expose only published data.
- Sensitive personal fields are kept out of public case listing/detail responses.

# Libya Charity Platform

Libya Charity (ليبيا الخيرية) is a mobile-first charity platform for verified humanitarian cases inside Libya.

## App summary
- Arabic-first, RTL-first mobile UX.
- Dedicated giving tracks: الزكاة، الصدقة، الكفالات.
- Donor-focused case browsing, campaign support, donation flow, receipts, and reports.
- Controlled family case submission workflow pending Zakat Authority verification.

## Architecture summary
- `apps/mobile`: Flutter frontend foundation (Material 3 + Riverpod + GoRouter).
- Mock-first data architecture with models/repositories for easy backend replacement.
- Modular feature folders for onboarding, auth, home, cases, campaigns, zakat, sadaqah, sponsorships, donations, reports, profile, notifications, and support.

## How to run
1. `cd apps/mobile`
2. `flutter pub get`
3. `flutter run`

## Mock vs future backend work
### Currently mocked
- Authentication flow and session behavior.
- Cases/campaigns/sponsorship/report/notification/user donation data.
- Payment methods and donation confirmation behavior.
- Document uploads and report downloads.

### Planned backend integration (TODO)
- Real auth APIs + token/session handling.
- Case/campaign/report data APIs.
- Donation order APIs and payment gateway integrations.
- Receipt generation + downloadable files.
- File upload for family submissions.
- WhatsApp deep links, chatbot engine, and notifications backend.

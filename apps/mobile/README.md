# Libya Charity Mobile App

Production-ready frontend foundation for **ليبيا الخيرية** built with Flutter.

## Stack
- Flutter (Material 3)
- Riverpod (state management)
- GoRouter (navigation)
- Mock repositories (no real backend yet)

## Structure
- `lib/app`: app bootstrap + router.
- `lib/core`: theme, constants, localization, reusable widgets.
- `lib/data`: models, mock data, repository abstraction.
- `lib/features`: vertical feature modules.
- `lib/l10n`: localization generation placeholder.

## Notes
- Arabic is the default locale.
- RTL-aware layouts are used by default.
- TODO markers are placed where backend/payment/APIs will be integrated.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../features/auth/auth_screen.dart';
import '../features/campaigns/campaigns_screen.dart';
import '../features/cases/case_detail_screen.dart';
import '../features/cases/cases_screen.dart';
import '../features/donations/donation_flow_screen.dart';
import '../features/donations/donation_success_screen.dart';
import '../features/home/home_screen.dart';
import '../features/notifications/notifications_screen.dart';
import '../features/onboarding/onboarding_screen.dart';
import '../features/profile/profile_screen.dart';
import '../features/reports/report_detail_screen.dart';
import '../features/reports/reports_screen.dart';
import '../features/sadaqah/sadaqah_screen.dart';
import '../features/splash/splash_screen.dart';
import '../features/sponsorships/sponsorships_screen.dart';
import '../features/submit_case/submit_case_screen.dart';
import '../features/submit_case/submit_case_success_screen.dart';
import '../features/support/support_screen.dart';
import '../features/zakat/zakat_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(path: '/splash', builder: (_, __) => const SplashScreen()),
      GoRoute(path: '/onboarding', builder: (_, __) => const OnboardingScreen()),
      GoRoute(path: '/auth', builder: (_, __) => const AuthScreen()),
      StatefulShellRoute.indexedStack(
        builder: (context, state, shell) => MainNavigationShell(shell: shell),
        branches: [
          StatefulShellBranch(routes: [GoRoute(path: '/home', builder: (_, __) => const HomeScreen())]),
          StatefulShellBranch(routes: [GoRoute(path: '/cases', builder: (_, __) => const CasesScreen())]),
          StatefulShellBranch(routes: [GoRoute(path: '/campaigns', builder: (_, __) => const CampaignsScreen())]),
          StatefulShellBranch(routes: [GoRoute(path: '/zakat', builder: (_, __) => const ZakatScreen())]),
          StatefulShellBranch(routes: [GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen())]),
        ],
      ),
      GoRoute(path: '/case/:id', builder: (_, s) => CaseDetailScreen(caseId: s.pathParameters['id']!)),
      GoRoute(path: '/donation', builder: (_, __) => const DonationFlowScreen()),
      GoRoute(path: '/donation-success', builder: (_, __) => const DonationSuccessScreen()),
      GoRoute(path: '/sadaqah', builder: (_, __) => const SadaqahScreen()),
      GoRoute(path: '/sponsorships', builder: (_, __) => const SponsorshipsScreen()),
      GoRoute(path: '/submit-case', builder: (_, __) => const SubmitCaseScreen()),
      GoRoute(path: '/submit-case-success', builder: (_, __) => const SubmitCaseSuccessScreen()),
      GoRoute(path: '/reports', builder: (_, __) => const ReportsScreen()),
      GoRoute(path: '/report/:id', builder: (_, s) => ReportDetailScreen(reportId: s.pathParameters['id']!)),
      GoRoute(path: '/notifications', builder: (_, __) => const NotificationsScreen()),
      GoRoute(path: '/support', builder: (_, __) => const SupportScreen()),
    ],
  );
});

class MainNavigationShell extends StatelessWidget {
  const MainNavigationShell({super.key, required this.shell});

  final StatefulNavigationShell shell;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: shell,
      bottomNavigationBar: NavigationBar(
        selectedIndex: shell.currentIndex,
        onDestinationSelected: (index) => shell.goBranch(index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'الرئيسية'),
          NavigationDestination(icon: Icon(Icons.folder_open_outlined), label: 'الحالات'),
          NavigationDestination(icon: Icon(Icons.campaign_outlined), label: 'الحملات'),
          NavigationDestination(icon: Icon(Icons.calculate_outlined), label: 'الزكاة'),
          NavigationDestination(icon: Icon(Icons.person_outline), label: 'حسابي'),
        ],
      ),
    );
  }
}

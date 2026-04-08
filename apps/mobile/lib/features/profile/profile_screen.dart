import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';
import '../../data/repositories/mock_repository.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final repo = ref.watch(repositoryProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('حسابي')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: [AppConstants.brandGreen, AppConstants.brandGreenDark]),
              borderRadius: BorderRadius.circular(18),
            ),
            child: const Row(children: [
              CircleAvatar(radius: 28, backgroundColor: Colors.white24, child: Icon(Icons.person, color: Colors.white, size: 28)),
              SizedBox(width: 12),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('المتبرع محمد سالم', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 18)),
                  SizedBox(height: 2),
                  Text('عضو نشط منذ 2024', style: TextStyle(color: Colors.white70)),
                ]),
              ),
            ]),
          ),
          const SizedBox(height: 14),
          const Text('تبرعاتي', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
          ...repo.getDonations().map((d) => Card(
                child: ListTile(
                  leading: const CircleAvatar(backgroundColor: AppConstants.brandGreenSoft, child: Icon(Icons.volunteer_activism_outlined, color: AppConstants.brandGreenDark)),
                  title: Text('${d.amount.toStringAsFixed(0)} د.ل - ${d.type}', style: const TextStyle(fontWeight: FontWeight.w700)),
                  subtitle: Text(d.date),
                ),
              )),
          const SizedBox(height: 8),
          const Text('الإيصالات', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
          ...repo.getReceipts().map((r) => Card(
                child: ListTile(
                  leading: const Icon(Icons.receipt_long_outlined, color: AppConstants.brandGreenDark),
                  title: Text(r.reference),
                  subtitle: Text('${r.amount.toStringAsFixed(0)} د.ل - ${r.date}'),
                  trailing: const Icon(Icons.download_outlined),
                ),
              )),
          const SizedBox(height: 8),
          _ProfileAction(title: 'التقارير', icon: Icons.description_outlined, onTap: () => context.push('/reports')),
          _ProfileAction(title: 'تقديم حالة', icon: Icons.assignment_outlined, onTap: () => context.push('/submit-case')),
          _ProfileAction(title: 'الدعم / واتساب', icon: Icons.support_agent_outlined, onTap: () => context.push('/support')),
          const Card(child: ListTile(leading: Icon(Icons.language_outlined), title: Text('اللغة (قريباً)'), subtitle: Text('العربية / English'))),
          const SizedBox(height: 8),
          OutlinedButton.icon(onPressed: () => context.go('/auth'), icon: const Icon(Icons.logout), label: const Text('تسجيل الخروج')),
        ],
      ),
    );
  }
}

class _ProfileAction extends StatelessWidget {
  const _ProfileAction({required this.title, required this.icon, required this.onTap});
  final String title;
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: Icon(icon, color: AppConstants.brandGreenDark),
        title: Text(title),
        trailing: const Icon(Icons.chevron_left),
        onTap: onTap,
      ),
    );
  }
}

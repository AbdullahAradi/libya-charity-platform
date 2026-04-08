import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

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
          const CircleAvatar(radius: 34, child: Icon(Icons.person, size: 34)),
          const SizedBox(height: 8),
          Center(child: Text('المتبرع محمد سالم', style: Theme.of(context).textTheme.titleMedium)),
          const SizedBox(height: 12),
          const ListTile(title: Text('تبرعاتي')), 
          ...repo.getDonations().map((d) => ListTile(title: Text('${d.amount.toStringAsFixed(0)} د.ل - ${d.type}'), subtitle: Text(d.date))),
          const Divider(),
          const ListTile(title: Text('إيصالاتي')),
          ...repo.getReceipts().map((r) => ListTile(title: Text(r.reference), subtitle: Text('${r.amount.toStringAsFixed(0)} د.ل - ${r.date}'))),
          const Divider(),
          ListTile(title: const Text('التقارير'), trailing: const Icon(Icons.chevron_left), onTap: () => context.push('/reports')),
          ListTile(title: const Text('تقديم حالة'), trailing: const Icon(Icons.chevron_left), onTap: () => context.push('/submit-case')),
          ListTile(title: const Text('الدعم / واتساب'), trailing: const Icon(Icons.chevron_left), onTap: () => context.push('/support')),
          const ListTile(title: Text('اللغة (قريباً)'), subtitle: Text('العربية / English')),
          OutlinedButton(onPressed: () => context.go('/auth'), child: const Text('تسجيل الخروج')),
        ],
      ),
    );
  }
}

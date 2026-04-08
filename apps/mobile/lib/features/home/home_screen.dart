import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final repo = ref.watch(repositoryProvider);
    final cases = repo.getCases();
    final campaigns = repo.getCampaigns();
    final partners = repo.getPartners();
    final reports = repo.getReports();

    return Scaffold(
      appBar: AppBar(
        title: const Text('ليبيا الخيرية'),
        actions: [IconButton(onPressed: () => context.push('/notifications'), icon: const Icon(Icons.notifications_none))],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('معاً نُعيد الأمل للأسر داخل ليبيا', style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 8),
                const Text('منصة موثوقة للتبرع للحالات الإنسانية عبر شركاء رسميين وتقارير شفافة.'),
              ]),
            ),
          ),
          const SizedBox(height: 12),
          Wrap(spacing: 8, runSpacing: 8, children: [
            FilledButton.tonal(onPressed: () => context.push('/zakat'), child: const Text('الزكاة')),
            FilledButton.tonal(onPressed: () => context.push('/sadaqah'), child: const Text('الصدقة')),
            FilledButton.tonal(onPressed: () => context.push('/sponsorships'), child: const Text('الكفالات')),
            FilledButton(onPressed: () => context.push('/donation'), child: const Text('تبرع الآن')),
          ]),
          const SizedBox(height: 16),
          const SectionHeader(title: 'الحالات العاجلة'),
          ...cases.take(2).map((c) => CaseCard(item: c, partnerName: partners.firstWhere((p) => p.id == c.partnerId).name, onTap: () => context.push('/case/${c.id}'))),
          const SectionHeader(title: 'حملات مميزة'),
          ...campaigns.take(2).map((c) => CampaignCard(item: c)),
          const SectionHeader(title: 'أحدث التقارير', actionLabel: 'عرض الكل'),
          ...reports.map((r) => ReportCard(item: r, onTap: () => context.push('/report/${r.id}'))),
          const SectionHeader(title: 'شركاؤنا'),
          ...partners.map((p) => ListTile(title: Text(p.name), subtitle: Text(p.city), leading: const Icon(Icons.business))),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(onPressed: () => context.push('/support'), icon: const Icon(Icons.support_agent), label: const Text('الدعم')),
    );
  }
}

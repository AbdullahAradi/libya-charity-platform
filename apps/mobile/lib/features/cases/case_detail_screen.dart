import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class CaseDetailScreen extends ConsumerWidget {
  const CaseDetailScreen({super.key, required this.caseId});
  final String caseId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final repo = ref.watch(repositoryProvider);
    final item = repo.getCases().firstWhere((e) => e.id == caseId);
    final partner = repo.getPartners().firstWhere((e) => e.id == item.partnerId);

    return Scaffold(
      appBar: AppBar(title: const Text('تفاصيل الحالة')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(height: 180, decoration: BoxDecoration(color: Colors.blueGrey.shade100, borderRadius: BorderRadius.circular(14)), alignment: Alignment.center, child: const Icon(Icons.image, size: 64)),
          const SizedBox(height: 12),
          Text(item.title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 8),
          Text(item.summary),
          const SizedBox(height: 8),
          Text('المدينة: ${item.city}'),
          Text('الجهة الشريكة: ${partner.name}'),
          const SizedBox(height: 8),
          ProgressPanel(raised: item.raised, target: item.target),
          const SizedBox(height: 12),
          const SectionHeader(title: 'تحديثات الحالة'),
          const ListTile(title: Text('تم استلام جزء من المبلغ'), subtitle: Text('2026-04-02')),
          const ListTile(title: Text('رفع التقرير الطبي النهائي'), subtitle: Text('2026-03-29')),
          const SectionHeader(title: 'تقارير مرتبطة'),
          ...repo.getReports().map((r) => ReportCard(item: r, onTap: () => context.push('/report/${r.id}'))),
          const SizedBox(height: 12),
          Wrap(spacing: 8, runSpacing: 8, children: [
            FilledButton(onPressed: () => context.push('/donation'), child: const Text('تبرع الآن')),
            FilledButton.tonal(onPressed: () => context.push('/sponsorships'), child: const Text('اكفل')),
            OutlinedButton(onPressed: () {}, child: const Text('مشاركة')),
            OutlinedButton(onPressed: () => context.push('/reports'), child: const Text('عرض التقارير')),
          ]),
        ],
      ),
    );
  }
}

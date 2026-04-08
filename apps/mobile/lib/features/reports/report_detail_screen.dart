import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/repositories/mock_repository.dart';

class ReportDetailScreen extends ConsumerWidget {
  const ReportDetailScreen({super.key, required this.reportId});
  final String reportId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final item = ref.watch(repositoryProvider).getReports().firstWhere((e) => e.id == reportId);
    return Scaffold(
      appBar: AppBar(title: const Text('تفاصيل التقرير')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(item.title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 8),
          Text('التاريخ: ${item.date}'),
          Text('المرتبط بـ: ${item.relatedTo}'),
          const SizedBox(height: 12),
          Text(item.summary),
          const SizedBox(height: 16),
          FilledButton.tonal(onPressed: () {}, child: const Text('تحميل التقرير (TODO: ربط API الملفات)')),
        ],
      ),
    );
  }
}

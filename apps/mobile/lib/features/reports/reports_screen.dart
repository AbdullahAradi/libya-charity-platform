import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class ReportsScreen extends ConsumerWidget {
  const ReportsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reports = ref.watch(repositoryProvider).getReports();
    return Scaffold(
      appBar: AppBar(title: const Text('التقارير')),
      body: reports.isEmpty
          ? const EmptyStateView(title: 'لا توجد تقارير حالياً', subtitle: 'ستظهر هنا التقارير فور نشرها.')
          : ListView(
              padding: const EdgeInsets.all(16),
              children: reports.map((r) => ReportCard(item: r, onTap: () => context.push('/report/${r.id}'))).toList(),
            ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/constants/app_constants.dart';
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
          Text(item.title, style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: 8),
          Wrap(spacing: 8, runSpacing: 8, children: [
            _MetaPill(label: item.date, icon: Icons.event_outlined),
            _MetaPill(label: item.relatedTo, icon: Icons.link_outlined),
          ]),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Text(item.summary, style: const TextStyle(height: 1.8)),
            ),
          ),
          const SizedBox(height: 16),
          FilledButton.tonalIcon(onPressed: () {}, icon: const Icon(Icons.download), label: const Text('تحميل التقرير (TODO: ربط API الملفات)')),
        ],
      ),
    );
  }
}

class _MetaPill extends StatelessWidget {
  const _MetaPill({required this.label, required this.icon});
  final String label;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(100), border: Border.all(color: AppConstants.border)),
      child: Row(mainAxisSize: MainAxisSize.min, children: [Icon(icon, size: 14, color: AppConstants.brandGreenDark), const SizedBox(width: 4), Text(label)]),
    );
  }
}

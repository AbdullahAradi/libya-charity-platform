import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';
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
    final remaining = (item.target - item.raised).clamp(0, item.target);

    return Scaffold(
      appBar: AppBar(title: const Text('تفاصيل الحالة')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 24),
        children: [
          Stack(
            children: [
              GradientPlaceholder(icon: Icons.volunteer_activism_outlined, label: item.category, height: 210),
              PositionedDirectional(
                top: 12,
                start: 12,
                child: Row(children: [
                  if (item.isUrgent) const StatusBadge(label: 'عاجلة', color: AppConstants.urgent, icon: Icons.priority_high),
                  const SizedBox(width: 8),
                  if (item.isVerified) const StatusBadge(label: 'موثقة', color: AppConstants.success, icon: Icons.verified),
                ]),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Text(item.title, style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 8),
          Text(item.summary, style: const TextStyle(color: AppConstants.textMuted)),
          const SizedBox(height: 12),
          Wrap(spacing: 8, runSpacing: 8, children: [
            StatusBadge(label: item.city, color: const Color(0xFF4F666A), icon: Icons.location_on_outlined),
            StatusBadge(label: partner.name, color: AppConstants.brandGreenDark, icon: Icons.account_balance_outlined),
          ]),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('ملخص التبرع', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                ProgressPanel(raised: item.raised, target: item.target),
                const SizedBox(height: 10),
                Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  _AmountItem(label: 'المبلغ المطلوب', value: '${item.target.toStringAsFixed(0)} د.ل'),
                  _AmountItem(label: 'تم جمعه', value: '${item.raised.toStringAsFixed(0)} د.ل'),
                  _AmountItem(label: 'المتبقي', value: '${remaining.toStringAsFixed(0)} د.ل'),
                ]),
              ]),
            ),
          ),
          const SectionHeader(title: 'التحديثات الميدانية', subtitle: 'آخر مستجدات الحالة والمصروفات'),
          const _TimelineTile(title: 'تم تحويل الدفعة الأولى للمستشفى', date: '2026-04-02'),
          const _TimelineTile(title: 'استلام التقرير الطبي النهائي', date: '2026-03-29'),
          SectionHeader(title: 'تقارير مرتبطة', actionLabel: 'عرض الكل', onAction: () => context.push('/reports')),
          ...repo.getReports().take(2).map((r) => ReportCard(item: r, onTap: () => context.push('/report/${r.id}'))),
          const SizedBox(height: 10),
          Wrap(spacing: 8, runSpacing: 8, children: [
            FilledButton.icon(onPressed: () => context.push('/donation'), icon: const Icon(Icons.favorite_border), label: const Text('تبرع الآن')),
            FilledButton.tonalIcon(onPressed: () => context.push('/sponsorships'), icon: const Icon(Icons.groups_2_outlined), label: const Text('اكفل الحالة')),
            OutlinedButton.icon(onPressed: () {}, icon: const Icon(Icons.share_outlined), label: const Text('مشاركة')),
          ]),
        ],
      ),
    );
  }
}

class _AmountItem extends StatelessWidget {
  const _AmountItem({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(value, style: const TextStyle(fontWeight: FontWeight.w800, color: AppConstants.brandGreenDark)),
        const SizedBox(height: 2),
        Text(label, style: const TextStyle(fontSize: 12, color: AppConstants.textMuted)),
      ],
    );
  }
}

class _TimelineTile extends StatelessWidget {
  const _TimelineTile({required this.title, required this.date});
  final String title;
  final String date;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          margin: const EdgeInsets.only(top: 4),
          width: 24,
          height: 24,
          decoration: const BoxDecoration(color: AppConstants.brandGreenSoft, shape: BoxShape.circle),
          child: const Icon(Icons.check, size: 14, color: AppConstants.brandGreenDark),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppConstants.border)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
              const SizedBox(height: 4),
              Text(date, style: const TextStyle(color: AppConstants.textMuted, fontSize: 12)),
            ]),
          ),
        ),
      ]),
    );
  }
}

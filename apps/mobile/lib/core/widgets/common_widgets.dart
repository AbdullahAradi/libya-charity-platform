import 'package:flutter/material.dart';

import '../../data/models/entities.dart';

class SectionHeader extends StatelessWidget {
  const SectionHeader({super.key, required this.title, this.actionLabel, this.onAction});
  final String title;
  final String? actionLabel;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
        if (actionLabel != null) TextButton(onPressed: onAction, child: Text(actionLabel!)),
      ],
    );
  }
}

class StatusBadge extends StatelessWidget {
  const StatusBadge({super.key, required this.label, required this.color});
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(color: color.withOpacity(0.12), borderRadius: BorderRadius.circular(100)),
      child: Text(label, style: TextStyle(color: color, fontWeight: FontWeight.w700, fontSize: 12)),
    );
  }
}

class ProgressPanel extends StatelessWidget {
  const ProgressPanel({super.key, required this.raised, required this.target});
  final double raised;
  final double target;

  @override
  Widget build(BuildContext context) {
    final progress = target == 0 ? 0.0 : (raised / target).clamp(0, 1);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LinearProgressIndicator(value: progress, minHeight: 8, borderRadius: BorderRadius.circular(100)),
        const SizedBox(height: 6),
        Text('تم جمع ${raised.toStringAsFixed(0)} د.ل من أصل ${target.toStringAsFixed(0)} د.ل'),
      ],
    );
  }
}

class CaseCard extends StatelessWidget {
  const CaseCard({super.key, required this.item, required this.partnerName, this.onTap});
  final CharityCase item;
  final String partnerName;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(item.title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
            const SizedBox(height: 6),
            Text(item.summary, maxLines: 2, overflow: TextOverflow.ellipsis),
            const SizedBox(height: 8),
            Wrap(spacing: 8, runSpacing: 8, children: [
              StatusBadge(label: item.city, color: Colors.blueGrey),
              StatusBadge(label: partnerName, color: Colors.teal),
              if (item.isUrgent) const StatusBadge(label: 'عاجلة', color: Colors.red),
              if (item.isVerified) const StatusBadge(label: 'موثقة', color: Colors.green),
            ]),
            const SizedBox(height: 10),
            ProgressPanel(raised: item.raised, target: item.target),
          ]),
        ),
      ),
    );
  }
}

class CampaignCard extends StatelessWidget {
  const CampaignCard({super.key, required this.item});
  final Campaign item;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(item.title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(item.type, style: const TextStyle(color: Colors.blueGrey)),
          const SizedBox(height: 8),
          ProgressPanel(raised: item.raised, target: item.target),
        ]),
      ),
    );
  }
}

class SponsorshipCard extends StatelessWidget {
  const SponsorshipCard({super.key, required this.item});
  final SponsorshipType item;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(item.title),
        subtitle: Text(item.description),
        trailing: Text('${item.monthlyAmount.toStringAsFixed(0)} د.ل/شهرياً'),
      ),
    );
  }
}

class ReportCard extends StatelessWidget {
  const ReportCard({super.key, required this.item, this.onTap});
  final ReportItem item;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        onTap: onTap,
        title: Text(item.title),
        subtitle: Text('${item.relatedTo}\n${item.date}'),
        isThreeLine: true,
        trailing: const Icon(Icons.chevron_left),
      ),
    );
  }
}

class EmptyStateView extends StatelessWidget {
  const EmptyStateView({super.key, required this.title, required this.subtitle});
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const Icon(Icons.inbox_rounded, size: 42, color: Colors.blueGrey),
          const SizedBox(height: 12),
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 4),
          Text(subtitle, textAlign: TextAlign.center),
        ]),
      ),
    );
  }
}

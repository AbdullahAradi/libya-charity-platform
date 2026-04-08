import 'package:flutter/material.dart';

import '../../data/models/entities.dart';
import '../constants/app_constants.dart';

class SectionHeader extends StatelessWidget {
  const SectionHeader({super.key, required this.title, this.subtitle, this.actionLabel, this.onAction});
  final String title;
  final String? subtitle;
  final String? actionLabel;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsetsDirectional.only(top: 10, bottom: 8),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                if (subtitle != null)
                  Text(subtitle!, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppConstants.textMuted)),
              ],
            ),
          ),
          if (actionLabel != null)
            TextButton(
              onPressed: onAction,
              child: Text(actionLabel!, style: const TextStyle(fontWeight: FontWeight.w700)),
            ),
        ],
      ),
    );
  }
}

class StatusBadge extends StatelessWidget {
  const StatusBadge({super.key, required this.label, required this.color, this.icon});
  final String label;
  final Color color;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(color: color.withOpacity(0.12), borderRadius: BorderRadius.circular(100)),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        if (icon != null) ...[Icon(icon, size: 13, color: color), const SizedBox(width: 4)],
        Text(label, style: TextStyle(color: color, fontWeight: FontWeight.w700, fontSize: 12)),
      ]),
    );
  }
}

class GradientPlaceholder extends StatelessWidget {
  const GradientPlaceholder({super.key, required this.icon, required this.label, this.height = 160});
  final IconData icon;
  final String label;
  final double height;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppConstants.radiusMd),
        gradient: LinearGradient(
          colors: [AppConstants.brandGreen.withOpacity(0.85), AppConstants.brandGreenDark],
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
        ),
      ),
      child: Align(
        alignment: Alignment.bottomRight,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Icon(icon, size: 30, color: Colors.white.withOpacity(0.92)),
            Text(label, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
          ]),
        ),
      ),
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
        ClipRRect(
          borderRadius: BorderRadius.circular(100),
          child: LinearProgressIndicator(
            value: progress,
            minHeight: 8,
            backgroundColor: AppConstants.brandGreenSoft,
            valueColor: const AlwaysStoppedAnimation(AppConstants.brandGreen),
          ),
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('تم جمع ${raised.toStringAsFixed(0)} د.ل', style: const TextStyle(fontWeight: FontWeight.w700)),
            Text('المطلوب ${target.toStringAsFixed(0)} د.ل', style: const TextStyle(color: AppConstants.textMuted)),
          ],
        ),
      ],
    );
  }
}

class ImpactStatCard extends StatelessWidget {
  const ImpactStatCard({super.key, required this.title, required this.value, required this.icon});
  final String title;
  final String value;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppConstants.border)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppConstants.brandGreen),
          const SizedBox(height: 8),
          Text(value, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
          Text(title, style: const TextStyle(color: AppConstants.textMuted)),
        ],
      ),
    );
  }
}

class QuickActionTile extends StatelessWidget {
  const QuickActionTile({super.key, required this.title, required this.icon, required this.onTap});
  final String title;
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppConstants.radiusMd),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 10),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(AppConstants.radiusMd), border: Border.all(color: AppConstants.border)),
        child: Column(children: [
          CircleAvatar(radius: 18, backgroundColor: AppConstants.brandGreenSoft, child: Icon(icon, color: AppConstants.brandGreenDark, size: 18)),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
        ]),
      ),
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
        borderRadius: BorderRadius.circular(AppConstants.radiusMd),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            GradientPlaceholder(icon: _caseIcon(item.category), label: item.category, height: 112),
            const SizedBox(height: 12),
            Text(item.title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
            const SizedBox(height: 6),
            Text(item.summary, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(color: AppConstants.textMuted)),
            const SizedBox(height: 10),
            Wrap(spacing: 8, runSpacing: 8, children: [
              StatusBadge(label: item.city, color: const Color(0xFF4F666A), icon: Icons.location_on_outlined),
              StatusBadge(label: partnerName, color: AppConstants.brandGreenDark, icon: Icons.verified_user_outlined),
              if (item.isUrgent) const StatusBadge(label: 'عاجلة', color: AppConstants.urgent, icon: Icons.priority_high),
              if (item.isVerified) const StatusBadge(label: 'موثقة', color: AppConstants.success, icon: Icons.verified),
            ]),
            const SizedBox(height: 12),
            ProgressPanel(raised: item.raised, target: item.target),
          ]),
        ),
      ),
    );
  }

  IconData _caseIcon(String category) {
    switch (category) {
      case 'طبي':
        return Icons.local_hospital_outlined;
      case 'تعليم':
        return Icons.school_outlined;
      case 'سكن':
        return Icons.home_work_outlined;
      default:
        return Icons.volunteer_activism_outlined;
    }
  }
}

class CampaignCard extends StatelessWidget {
  const CampaignCard({super.key, required this.item});
  final Campaign item;

  @override
  Widget build(BuildContext context) {
    final icon = item.type == 'طوارئ' ? Icons.warning_amber_rounded : item.type == 'رمضان' ? Icons.nightlight_round : Icons.favorite_border;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          GradientPlaceholder(icon: icon, label: item.type, height: 100),
          const SizedBox(height: 10),
          Text(item.title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
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
        contentPadding: const EdgeInsets.all(14),
        leading: CircleAvatar(backgroundColor: AppConstants.brandGreenSoft, child: const Icon(Icons.groups_2_outlined, color: AppConstants.brandGreenDark)),
        title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.w700)),
        subtitle: Padding(
          padding: const EdgeInsetsDirectional.only(top: 6),
          child: Text(item.description),
        ),
        trailing: Text('${item.monthlyAmount.toStringAsFixed(0)} د.ل\nشهرياً', textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.w700, color: AppConstants.brandGreenDark)),
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
        contentPadding: const EdgeInsets.all(14),
        leading: const CircleAvatar(backgroundColor: AppConstants.brandGreenSoft, child: Icon(Icons.description_outlined, color: AppConstants.brandGreenDark)),
        title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.w700)),
        subtitle: Text('${item.relatedTo}\n${item.date}', style: const TextStyle(color: AppConstants.textMuted)),
        isThreeLine: true,
        trailing: const Icon(Icons.chevron_left),
      ),
    );
  }
}

class EmptyStateView extends StatelessWidget {
  const EmptyStateView({super.key, required this.title, required this.subtitle, this.ctaLabel, this.onCta});
  final String title;
  final String subtitle;
  final String? ctaLabel;
  final VoidCallback? onCta;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const CircleAvatar(radius: 26, backgroundColor: AppConstants.brandGreenSoft, child: Icon(Icons.inbox_rounded, color: AppConstants.brandGreenDark)),
          const SizedBox(height: 14),
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 6),
          Text(subtitle, textAlign: TextAlign.center, style: const TextStyle(color: AppConstants.textMuted)),
          if (ctaLabel != null) ...[
            const SizedBox(height: 14),
            FilledButton.tonal(onPressed: onCta, child: Text(ctaLabel!)),
          ],
        ]),
      ),
    );
  }
}

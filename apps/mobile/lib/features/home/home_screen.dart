import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';
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
        actions: [IconButton(onPressed: () => context.push('/notifications'), icon: const Icon(Icons.notifications_none_rounded))],
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 22),
        children: [
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: [AppConstants.brandGreen, AppConstants.brandGreenDark], begin: Alignment.topRight, end: Alignment.bottomLeft),
              borderRadius: BorderRadius.circular(AppConstants.radiusLg),
            ),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const StatusBadge(label: 'منصة موثوقة للتبرع المحلي', color: Colors.white),
              const SizedBox(height: 12),
              Text('معاً نُعيد الأمل للأسر داخل ليبيا', style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white, fontWeight: FontWeight.w800)),
              const SizedBox(height: 6),
              Text('حالات موثقة، تقارير شفافة، وأثر واضح لتبرعك.', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white.withOpacity(0.9))),
              const SizedBox(height: 14),
              FilledButton(
                style: FilledButton.styleFrom(backgroundColor: Colors.white, foregroundColor: AppConstants.brandGreenDark),
                onPressed: () => context.push('/donation'),
                child: const Text('ابدأ التبرع الآن'),
              ),
            ]),
          ),
          const SizedBox(height: 16),
          GridView.count(
            crossAxisCount: 4,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 8,
            crossAxisSpacing: 8,
            childAspectRatio: .9,
            children: [
              QuickActionTile(title: 'الزكاة', icon: Icons.calculate_outlined, onTap: () => context.push('/zakat')),
              QuickActionTile(title: 'الصدقة', icon: Icons.volunteer_activism_outlined, onTap: () => context.push('/sadaqah')),
              QuickActionTile(title: 'الكفالات', icon: Icons.groups_2_outlined, onTap: () => context.push('/sponsorships')),
              QuickActionTile(title: 'تبرع الآن', icon: Icons.credit_card_outlined, onTap: () => context.push('/donation')),
            ],
          ),
          const SectionHeader(title: 'أثر المنصة', subtitle: 'مؤشرات موثقة ومحدثة دورياً'),
          Row(children: const [
            Expanded(child: ImpactStatCard(title: 'حالة موثقة', value: '1,248', icon: Icons.verified_outlined)),
            SizedBox(width: 8),
            Expanded(child: ImpactStatCard(title: 'أسرة مدعومة', value: '3,920', icon: Icons.family_restroom_outlined)),
            SizedBox(width: 8),
            Expanded(child: ImpactStatCard(title: 'تقرير منشور', value: '286', icon: Icons.description_outlined)),
          ]),
          const SectionHeader(title: 'الحالات العاجلة', actionLabel: 'عرض الكل'),
          ...cases.take(3).map((c) => CaseCard(item: c, partnerName: partners.firstWhere((p) => p.id == c.partnerId).name, onTap: () => context.push('/case/${c.id}'))),
          const SectionHeader(title: 'حملات مميزة', subtitle: 'رمضانية، طبية، وإغاثية'),
          ...campaigns.take(2).map((c) => CampaignCard(item: c)),
          SectionHeader(title: 'أحدث التقارير', actionLabel: 'عرض الكل', onAction: () => context.push('/reports')),
          ...reports.map((r) => ReportCard(item: r, onTap: () => context.push('/report/${r.id}'))),
          const SectionHeader(title: 'المنظمات الشريكة'),
          ...partners.map((p) => Card(
                child: ListTile(
                  leading: const CircleAvatar(backgroundColor: AppConstants.brandGreenSoft, child: Icon(Icons.business, color: AppConstants.brandGreenDark)),
                  title: Text(p.name, style: const TextStyle(fontWeight: FontWeight.w700)),
                  subtitle: Text(p.city),
                ),
              )),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppConstants.brandGreenDark,
        onPressed: () => context.push('/support'),
        icon: const Icon(Icons.support_agent, color: Colors.white),
        label: const Text('الدعم', style: TextStyle(color: Colors.white)),
      ),
    );
  }
}

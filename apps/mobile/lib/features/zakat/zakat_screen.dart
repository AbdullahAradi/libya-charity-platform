import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';
import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class ZakatScreen extends ConsumerWidget {
  const ZakatScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final repo = ref.watch(repositoryProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('الزكاة')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: const Color(0xFFF0F6EE), borderRadius: BorderRadius.circular(16), border: Border.all(color: AppConstants.border)),
            child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('الزكاة الشرعية', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
              SizedBox(height: 6),
              Text('قسم مخصص لأموال الزكاة وفق الضوابط الشرعية ومراجعات التحقق الميداني.'),
            ]),
          ),
          const SectionHeader(title: 'حاسبة الزكاة (واجهة مبدئية)', subtitle: 'أدخل القيم لحساب تقديري سريع'),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(children: [
                const TextField(decoration: InputDecoration(labelText: 'إجمالي المدخرات بالدينار الليبي')),
                const SizedBox(height: 10),
                const TextField(decoration: InputDecoration(labelText: 'إجمالي الديون المستحقة')),
                const SizedBox(height: 10),
                FilledButton.tonal(onPressed: () {}, child: const Text('احسب الزكاة (TODO: ربط منطق الحساب)')),
              ]),
            ),
          ),
          const SectionHeader(title: 'حالات مستحقة للزكاة'),
          ...repo.getCases().map((c) => CaseCard(item: c, partnerName: repo.getPartners().firstWhere((p) => p.id == c.partnerId).name)),
          const SectionHeader(title: 'الأسئلة الشائعة'),
          const Card(
            child: ExpansionTile(
              title: Text('كيف يتم التحقق من الاستحقاق؟'),
              children: [Padding(padding: EdgeInsets.all(12), child: Text('تُراجع الحالات بالتعاون مع الشركاء المحليين والجهات المختصة قبل اعتمادها.'))],
            ),
          ),
        ],
      ),
      bottomNavigationBar: SafeArea(
        minimum: const EdgeInsets.all(16),
        child: FilledButton(onPressed: () => context.push('/donation'), child: const Text('إخراج الزكاة الآن')),
      ),
    );
  }
}

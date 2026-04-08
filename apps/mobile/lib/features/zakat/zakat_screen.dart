import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

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
          const Card(child: ListTile(title: Text('الزكاة الشرعية'), subtitle: Text('زكاتك توجّه إلى مصارف مستحقة بعد التحقق الشرعي.'))),
          const SectionHeader(title: 'حاسبة الزكاة (واجهة مبدئية)'),
          const TextField(decoration: InputDecoration(labelText: 'إجمالي المدخرات بالدينار الليبي')),
          const SizedBox(height: 8),
          const TextField(decoration: InputDecoration(labelText: 'إجمالي الديون المستحقة')),
          const SizedBox(height: 8),
          FilledButton.tonal(onPressed: () {}, child: const Text('احسب الزكاة (TODO: ربط منطق الحساب)')),
          const SizedBox(height: 12),
          const SectionHeader(title: 'حالات مستحقة للزكاة'),
          ...repo.getCases().map((c) => CaseCard(item: c, partnerName: repo.getPartners().firstWhere((p) => p.id == c.partnerId).name)),
          const SectionHeader(title: 'الأسئلة الشائعة'),
          const ExpansionTile(title: Text('كيف يتم التحقق من الاستحقاق؟'), children: [Padding(padding: EdgeInsets.all(12), child: Text('تتم مراجعة الحالات بالتعاون مع الشركاء والجهات المختصة.'))]),
        ],
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16),
        child: FilledButton(onPressed: () => context.push('/donation'), child: const Text('إخراج الزكاة الآن')),
      ),
    );
  }
}

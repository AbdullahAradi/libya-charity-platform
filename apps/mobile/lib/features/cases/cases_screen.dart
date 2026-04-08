import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class CasesScreen extends ConsumerStatefulWidget {
  const CasesScreen({super.key});

  @override
  ConsumerState<CasesScreen> createState() => _CasesScreenState();
}

class _CasesScreenState extends ConsumerState<CasesScreen> {
  String selectedCategory = 'الكل';

  @override
  Widget build(BuildContext context) {
    final repo = ref.watch(repositoryProvider);
    final partners = repo.getPartners();
    final allItems = repo.getCases();
    const categories = ['الكل', 'طبي', 'غذائي', 'سكن', 'تعليم', 'ديون', 'أرامل', 'أيتام', 'إعاقة', 'عاجلة'];

    final items = selectedCategory == 'الكل'
        ? allItems
        : allItems.where((e) => e.category == selectedCategory || (selectedCategory == 'عاجلة' && e.isUrgent)).toList();

    return Scaffold(
      appBar: AppBar(title: const Text('الحالات')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const SectionHeader(title: 'ابحث عن حالة', subtitle: 'تصفح حسب المدينة، نوع الحالة، أو مستوى الاستعجال'),
          const TextField(
            decoration: InputDecoration(
              prefixIcon: Icon(Icons.search),
              hintText: 'ابحث عن حالة، مدينة، أو منظمة',
            ),
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                for (final c in categories)
                  Padding(
                    padding: const EdgeInsetsDirectional.only(end: 8),
                    child: ChoiceChip(
                      label: Text(c),
                      selected: selectedCategory == c,
                      onSelected: (_) => setState(() => selectedCategory = c),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          if (items.isEmpty)
            const EmptyStateView(
              title: 'لا توجد حالات مطابقة',
              subtitle: 'جرّب تغيير الفئة أو إزالة التصفية.',
            )
          else
            ...items.map((c) => CaseCard(
                  item: c,
                  partnerName: partners.firstWhere((p) => p.id == c.partnerId).name,
                  onTap: () => context.push('/case/${c.id}'),
                )),
        ],
      ),
    );
  }
}

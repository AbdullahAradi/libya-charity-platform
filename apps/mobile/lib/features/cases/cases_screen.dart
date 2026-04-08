import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class CasesScreen extends ConsumerWidget {
  const CasesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final repo = ref.watch(repositoryProvider);
    final items = repo.getCases();
    final partners = repo.getPartners();
    const categories = ['طبي', 'غذائي', 'سكن', 'تعليم', 'ديون', 'أرامل', 'أيتام', 'إعاقة', 'عاجلة'];

    return Scaffold(
      appBar: AppBar(title: const Text('الحالات')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const TextField(decoration: InputDecoration(prefixIcon: Icon(Icons.search), hintText: 'ابحث عن حالة أو مدينة')),
          const SizedBox(height: 12),
          SingleChildScrollView(scrollDirection: Axis.horizontal, child: Row(children: [for (final c in categories) Padding(padding: EdgeInsetsDirectional.only(end: 8), child: Chip(label: Text(c)))])),
          const SizedBox(height: 8),
          ...items.map((c) => CaseCard(item: c, partnerName: partners.firstWhere((p) => p.id == c.partnerId).name, onTap: () => context.push('/case/${c.id}'))),
        ],
      ),
    );
  }
}

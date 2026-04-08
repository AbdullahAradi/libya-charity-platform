import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class SponsorshipsScreen extends ConsumerWidget {
  const SponsorshipsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final items = ref.watch(repositoryProvider).getSponsorships();
    return Scaffold(
      appBar: AppBar(title: const Text('الكفالات')),
      body: ListView(padding: const EdgeInsets.all(16), children: [
        const Card(child: ListTile(title: Text('كفالات شهرية'), subtitle: Text('اختر نوع الكفالة وفعل التكرار الشهري بسهولة.'))),
        ...items.map((item) => SponsorshipCard(item: item)),
      ]),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16),
        child: FilledButton(onPressed: () => context.push('/donation'), child: const Text('ابدأ كفالة متكررة')),
      ),
    );
  }
}

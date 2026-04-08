import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class CampaignsScreen extends ConsumerWidget {
  const CampaignsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final campaigns = ref.watch(repositoryProvider).getCampaigns();
    return Scaffold(
      appBar: AppBar(title: const Text('الحملات')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Card(child: ListTile(title: Text('حملات موسمية وطوارئ'), subtitle: Text('رمضان، طوارئ، حملات طبية وغذائية'))),
          ...campaigns.map((c) => CampaignCard(item: c)),
        ],
      ),
    );
  }
}

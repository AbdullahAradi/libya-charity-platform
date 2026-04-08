import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/widgets/common_widgets.dart';
import '../../data/repositories/mock_repository.dart';

class NotificationsScreen extends ConsumerWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final items = ref.watch(repositoryProvider).getNotifications();
    return Scaffold(
      appBar: AppBar(title: const Text('الإشعارات')),
      body: items.isEmpty
          ? const EmptyStateView(title: 'لا توجد إشعارات', subtitle: 'ستظهر تنبيهات التبرعات والتحديثات هنا.')
          : ListView.builder(
              itemCount: items.length,
              itemBuilder: (_, i) => Card(
                child: ListTile(
                  leading: const Icon(Icons.notifications_active_outlined),
                  title: Text(items[i].title),
                  subtitle: Text('${items[i].body}\n${items[i].time}'),
                  isThreeLine: true,
                ),
              ),
            ),
    );
  }
}

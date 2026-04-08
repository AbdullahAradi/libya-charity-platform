import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SadaqahScreen extends StatelessWidget {
  const SadaqahScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('الصدقة')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Card(child: ListTile(title: Text('فرص صدقة يومية'), subtitle: Text('صدقة عامة، صدقة عاجلة، وصدقة جارية متكررة.'))),
          const ListTile(title: Text('صدقة الجمعة'), subtitle: Text('ساهم في دعم الحالات الحرجة كل جمعة.')),
          const ListTile(title: Text('صدقة يومية متكررة'), subtitle: Text('حدد مبلغاً ثابتاً يومياً أو أسبوعياً.')),
          FilledButton(onPressed: () => context.push('/donation'), child: const Text('تبرع صدقة')),
        ],
      ),
    );
  }
}

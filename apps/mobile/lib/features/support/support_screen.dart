import 'package:flutter/material.dart';

class SupportScreen extends StatelessWidget {
  const SupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('الدعم والمساعدة')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Card(child: ListTile(leading: Icon(Icons.chat), title: Text('دعم واتساب'), subtitle: Text('ابدأ محادثة دعم مباشرة (TODO: ربط الرابط).'))),
          Card(child: ListTile(leading: Icon(Icons.smart_toy_outlined), title: Text('المساعد الذكي'), subtitle: Text('قسم مساعد افتراضي (واجهة فقط حالياً).'))),
          Card(child: ListTile(leading: Icon(Icons.help_outline), title: Text('الأسئلة الشائعة'), subtitle: Text('كيف أتأكد من توثيق الحالة؟\nكيف أتابع الإيصالات؟'))),
          Card(child: ListTile(leading: Icon(Icons.call_outlined), title: Text('معلومات التواصل'), subtitle: Text('البريد: support@libyacharity.ly\nالهاتف: 0910000000'))),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';

class SupportScreen extends StatelessWidget {
  const SupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('الدعم والمساعدة')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          _SupportTile(icon: Icons.chat, title: 'دعم واتساب', subtitle: 'تواصل مباشر مع فريق الدعم (TODO: ربط الرابط).'),
          _SupportTile(icon: Icons.smart_toy_outlined, title: 'المساعد الذكي', subtitle: 'مساعد افتراضي للإجابات السريعة (واجهة فقط حالياً).'),
          _SupportTile(icon: Icons.help_outline, title: 'الأسئلة الشائعة', subtitle: 'كيف أتأكد من توثيق الحالة؟\nكيف أتابع الإيصالات؟'),
          _SupportTile(icon: Icons.call_outlined, title: 'معلومات التواصل', subtitle: 'support@libyacharity.ly\n0910000000'),
        ],
      ),
    );
  }
}

class _SupportTile extends StatelessWidget {
  const _SupportTile({required this.icon, required this.title, required this.subtitle});
  final IconData icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        contentPadding: const EdgeInsets.all(14),
        leading: CircleAvatar(backgroundColor: AppConstants.brandGreenSoft, child: Icon(icon, color: AppConstants.brandGreenDark)),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
        subtitle: Padding(
          padding: const EdgeInsetsDirectional.only(top: 6),
          child: Text(subtitle),
        ),
      ),
    );
  }
}

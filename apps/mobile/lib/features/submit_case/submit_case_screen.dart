import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';

class SubmitCaseScreen extends StatefulWidget {
  const SubmitCaseScreen({super.key});

  @override
  State<SubmitCaseScreen> createState() => _SubmitCaseScreenState();
}

class _SubmitCaseScreenState extends State<SubmitCaseScreen> {
  final _form = GlobalKey<FormState>();
  bool consent = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('تقديم حالة')),
      body: Form(
        key: _form,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(color: AppConstants.brandGreenSoft, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppConstants.border)),
              child: const Text('هذا القسم مخصص للأسر أو من ينوب عنها. بعد الإرسال، يخضع الطلب للمراجعة والتحقق من هيئة الزكاة الليبية قبل النشر.'),
            ),
            const SizedBox(height: 12),
            const TextField(decoration: InputDecoration(labelText: 'اسم مقدم الطلب')),
            const SizedBox(height: 8),
            const TextField(decoration: InputDecoration(labelText: 'اسم الممثل (إن وجد)')),
            const SizedBox(height: 8),
            const TextField(decoration: InputDecoration(labelText: 'معلومات التواصل')),
            const SizedBox(height: 8),
            const TextField(decoration: InputDecoration(labelText: 'المدينة / المنطقة')),
            const SizedBox(height: 8),
            const TextField(decoration: InputDecoration(labelText: 'نوع الاحتياج')),
            const SizedBox(height: 8),
            const TextField(decoration: InputDecoration(labelText: 'المبلغ المطلوب')),
            const SizedBox(height: 8),
            const TextField(maxLines: 4, decoration: InputDecoration(labelText: 'ملخص الحالة')),
            const SizedBox(height: 10),
            OutlinedButton.icon(onPressed: () {}, icon: const Icon(Icons.upload_file), label: const Text('رفع المستندات الداعمة (TODO: ربط رفع الملفات)')),
            CheckboxListTile(
              value: consent,
              onChanged: (v) => setState(() => consent = v ?? false),
              title: const Text('أوافق على سياسة الخصوصية وصحة المعلومات المقدمة.'),
              subtitle: const Text('سيتم مراجعة الطلب قبل اعتماده.'),
            ),
            FilledButton(
              onPressed: consent ? () => context.push('/submit-case-success') : null,
              child: const Text('إرسال الطلب'),
            ),
          ],
        ),
      ),
    );
  }
}

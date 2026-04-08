import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

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
            const SizedBox(height: 8),
            OutlinedButton.icon(onPressed: () {}, icon: const Icon(Icons.upload_file), label: const Text('رفع المستندات (TODO: ربط رفع الملفات)')),
            CheckboxListTile(
              value: consent,
              onChanged: (v) => setState(() => consent = v ?? false),
              title: const Text('أوافق على سياسة الخصوصية وصحة المعلومات المقدمة.'),
              subtitle: const Text('سيتم التحقق من الحالة عبر هيئة الزكاة الليبية قبل النشر.'),
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

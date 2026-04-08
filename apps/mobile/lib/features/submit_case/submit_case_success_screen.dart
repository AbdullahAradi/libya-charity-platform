import 'package:flutter/material.dart';

class SubmitCaseSuccessScreen extends StatelessWidget {
  const SubmitCaseSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('تم الاستلام')),
      body: const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Text('تم استلام طلبكم بنجاح، وحالياً قيد المراجعة والتحقق من هيئة الزكاة الليبية قبل النشر.', textAlign: TextAlign.center),
        ),
      ),
    );
  }
}

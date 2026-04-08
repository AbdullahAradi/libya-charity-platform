import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';

class SubmitCaseSuccessScreen extends StatelessWidget {
  const SubmitCaseSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('تم الاستلام')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            const CircleAvatar(radius: 36, backgroundColor: AppConstants.brandGreenSoft, child: Icon(Icons.schedule, color: AppConstants.brandGreenDark, size: 36)),
            const SizedBox(height: 14),
            Text('طلبكم قيد المراجعة', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            const Text('تم استلام طلب الحالة بنجاح. سيتم التواصل معكم بعد إكمال التحقق من هيئة الزكاة الليبية.', textAlign: TextAlign.center),
          ]),
        ),
      ),
    );
  }
}

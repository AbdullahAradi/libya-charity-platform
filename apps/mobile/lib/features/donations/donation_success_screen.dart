import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';

class DonationSuccessScreen extends StatelessWidget {
  const DonationSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            const CircleAvatar(radius: 42, backgroundColor: AppConstants.brandGreenSoft, child: Icon(Icons.check_circle, size: 56, color: AppConstants.success)),
            const SizedBox(height: 14),
            Text('تم التبرع بنجاح', style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 8),
            const Text('بارك الله في عطائكم.\nتم إصدار إيصال إلكتروني لهذه العملية.', textAlign: TextAlign.center),
            const SizedBox(height: 14),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppConstants.border)),
              child: const Column(
                children: [
                  _ReceiptRow(label: 'رقم الإيصال', value: 'LC-2026-00123'),
                  _ReceiptRow(label: 'المبلغ', value: '200 د.ل'),
                  _ReceiptRow(label: 'نوع العملية', value: 'تبرع خيري'),
                ],
              ),
            ),
            const SizedBox(height: 16),
            FilledButton(onPressed: () => context.go('/home'), child: const Text('العودة للرئيسية')),
          ]),
        ),
      ),
    );
  }
}

class _ReceiptRow extends StatelessWidget {
  const _ReceiptRow({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text(label), Text(value, style: const TextStyle(fontWeight: FontWeight.w700))]),
    );
  }
}

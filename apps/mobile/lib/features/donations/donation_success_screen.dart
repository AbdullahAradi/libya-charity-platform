import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DonationSuccessScreen extends StatelessWidget {
  const DonationSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            const Icon(Icons.check_circle, size: 80, color: Colors.green),
            const SizedBox(height: 12),
            Text('تم التبرع بنجاح', style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 8),
            const Text('رقم الإيصال: LC-2026-00123'),
            const SizedBox(height: 16),
            FilledButton(onPressed: () => context.go('/home'), child: const Text('العودة للرئيسية')),
          ]),
        ),
      ),
    );
  }
}

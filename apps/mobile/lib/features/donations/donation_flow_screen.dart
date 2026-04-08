import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DonationFlowScreen extends StatefulWidget {
  const DonationFlowScreen({super.key});

  @override
  State<DonationFlowScreen> createState() => _DonationFlowScreenState();
}

class _DonationFlowScreenState extends State<DonationFlowScreen> {
  int step = 0;
  final amountController = TextEditingController(text: '100');
  String payment = 'بطاقة دولية';
  bool recurring = false;
  bool anonymous = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('إتمام التبرع')),
      body: Stepper(
        currentStep: step,
        onStepContinue: () {
          if (step < 4) {
            setState(() => step++);
          } else {
            // TODO: connect with real payment API and backend order creation.
            context.go('/donation-success');
          }
        },
        onStepCancel: () => setState(() => step = step == 0 ? 0 : step - 1),
        steps: [
          Step(title: const Text('المبلغ'), content: TextField(controller: amountController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'المبلغ بالدينار'))),
          Step(
            title: const Text('طريقة الدفع'),
            content: Column(children: [
              for (final method in ['بطاقة دولية', 'محفظة رقمية ليبية', 'LY Pay', 'بطاقة مصرف محلية'])
                RadioListTile<String>(value: method, groupValue: payment, onChanged: (v) => setState(() => payment = v!), title: Text(method)),
            ]),
          ),
          Step(
            title: const Text('نوع التبرع'),
            content: SwitchListTile(value: recurring, onChanged: (v) => setState(() => recurring = v), title: const Text('تفعيل تبرع متكرر')),
          ),
          Step(
            title: const Text('الإهداء والخصوصية'),
            content: Column(children: [
              const TextField(decoration: InputDecoration(labelText: 'إهداء التبرع (اختياري)')),
              SwitchListTile(value: anonymous, onChanged: (v) => setState(() => anonymous = v), title: const Text('تبرع مجهول')),
            ]),
          ),
          Step(
            title: const Text('المراجعة'),
            content: ListTile(
              title: Text('المبلغ: ${amountController.text} د.ل'),
              subtitle: Text('الدفع: $payment\n${recurring ? 'متكرر' : 'مرة واحدة'}\n${anonymous ? 'مجهول' : 'علني'}'),
            ),
          ),
        ],
      ),
    );
  }
}

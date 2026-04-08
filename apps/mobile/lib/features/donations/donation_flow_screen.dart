import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/constants/app_constants.dart';

class DonationFlowScreen extends StatefulWidget {
  const DonationFlowScreen({super.key});

  @override
  State<DonationFlowScreen> createState() => _DonationFlowScreenState();
}

class _DonationFlowScreenState extends State<DonationFlowScreen> {
  int step = 0;
  final amountController = TextEditingController(text: '200');
  String payment = 'بطاقة دولية';
  String donationType = 'مرة واحدة';
  bool anonymous = false;

  final methods = const ['بطاقة دولية', 'محفظة رقمية ليبية', 'LY Pay', 'بطاقة مصرف محلية'];
  final presetAmounts = const [50, 100, 200, 500, 1000];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('إتمام التبرع')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(100),
              child: LinearProgressIndicator(
                value: (step + 1) / 5,
                minHeight: 8,
                backgroundColor: AppConstants.brandGreenSoft,
                valueColor: const AlwaysStoppedAnimation(AppConstants.brandGreen),
              ),
            ),
          ),
          Expanded(
            child: Stepper(
              currentStep: step,
              type: StepperType.vertical,
              controlsBuilder: (context, details) {
                return Padding(
                  padding: const EdgeInsets.only(top: 12),
                  child: Row(children: [
                    Expanded(child: FilledButton(onPressed: details.onStepContinue, child: Text(step == 4 ? 'تأكيد التبرع' : 'متابعة'))),
                    const SizedBox(width: 8),
                    if (step > 0) Expanded(child: OutlinedButton(onPressed: details.onStepCancel, child: const Text('رجوع'))),
                  ]),
                );
              },
              onStepTapped: (index) => setState(() => step = index),
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
                Step(
                  isActive: step >= 0,
                  title: const Text('اختيار المبلغ'),
                  content: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        for (final amt in presetAmounts)
                          ChoiceChip(
                            label: Text('$amt د.ل'),
                            selected: amountController.text == '$amt',
                            onSelected: (_) => setState(() => amountController.text = '$amt'),
                          ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    TextField(controller: amountController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'مبلغ مخصص بالدينار')),
                  ]),
                ),
                Step(
                  isActive: step >= 1,
                  title: const Text('طريقة الدفع'),
                  content: Column(children: [
                    for (final method in methods)
                      Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        child: RadioListTile<String>(
                          value: method,
                          groupValue: payment,
                          onChanged: (v) => setState(() => payment = v!),
                          secondary: const Icon(Icons.credit_card_outlined),
                          title: Text(method),
                        ),
                      ),
                  ]),
                ),
                Step(
                  isActive: step >= 2,
                  title: const Text('نوع التبرع'),
                  content: Column(children: [
                    SegmentedButton<String>(
                      segments: const [ButtonSegment(value: 'مرة واحدة', label: Text('مرة واحدة')), ButtonSegment(value: 'متكرر', label: Text('متكرر'))],
                      selected: {donationType},
                      onSelectionChanged: (s) => setState(() => donationType = s.first),
                    ),
                    const SizedBox(height: 10),
                    const TextField(decoration: InputDecoration(labelText: 'إهداء التبرع (اختياري)')),
                    SwitchListTile(value: anonymous, onChanged: (v) => setState(() => anonymous = v), title: const Text('تبرع مجهول')),
                  ]),
                ),
                Step(
                  isActive: step >= 3,
                  title: const Text('المراجعة'),
                  content: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppConstants.border)),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      _row('المبلغ', '${amountController.text} د.ل'),
                      _row('طريقة الدفع', payment),
                      _row('نوع التبرع', donationType),
                      _row('الخصوصية', anonymous ? 'مجهول' : 'علني'),
                      const Divider(),
                      const ListTile(
                        contentPadding: EdgeInsets.zero,
                        leading: Icon(Icons.security, color: AppConstants.brandGreenDark),
                        title: Text('منصة موثوقة وآمنة'),
                        subtitle: Text('سيصدر إيصال إلكتروني فور إتمام العملية.'),
                      ),
                    ]),
                  ),
                ),
                Step(
                  isActive: step >= 4,
                  title: const Text('التأكيد'),
                  content: const Text('بالضغط على "تأكيد التبرع" سيتم إنشاء عملية تبرع وإصدار إيصال.'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text(label), Text(value, style: const TextStyle(fontWeight: FontWeight.w700))]),
    );
  }
}

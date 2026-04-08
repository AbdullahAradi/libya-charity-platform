import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final _pageController = PageController();
  int _index = 0;

  final _slides = const [
    ('عطاء محلي موثوق', 'تبرعاتك تصل لحالات داخل ليبيا عبر شركاء معتمدين.'),
    ('حالات موثقة', 'كل حالة تمر بمراجعة الجهات المختصة قبل النشر.'),
    ('تقارير شفافة', 'تابع أثر تبرعك عبر تحديثات وتقارير دورية واضحة.'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(children: [
            Align(alignment: Alignment.centerLeft, child: TextButton(onPressed: () => context.go('/auth'), child: const Text('تخطي'))),
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _slides.length,
                onPageChanged: (value) => setState(() => _index = value),
                itemBuilder: (_, i) => Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Icon(Icons.favorite, size: 90, color: Theme.of(context).colorScheme.primary),
                  const SizedBox(height: 24),
                  Text(_slides[i].$1, style: Theme.of(context).textTheme.headlineSmall, textAlign: TextAlign.center),
                  const SizedBox(height: 10),
                  Text(_slides[i].$2, textAlign: TextAlign.center),
                ]),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_slides.length, (i) => Container(margin: const EdgeInsets.all(4), height: 8, width: _index == i ? 24 : 8, decoration: BoxDecoration(color: _index == i ? Theme.of(context).colorScheme.primary : Colors.grey.shade400, borderRadius: BorderRadius.circular(12)))),
            ),
            const SizedBox(height: 12),
            FilledButton(onPressed: () => context.go('/auth'), child: const Text('ابدأ الآن')),
          ]),
        ),
      ),
    );
  }
}

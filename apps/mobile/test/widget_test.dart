import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/app/libya_charity_app.dart';

void main() {
  testWidgets('app boots', (tester) async {
    await tester.pumpWidget(const ProviderScope(child: LibyaCharityApp()));
    expect(find.text('ليبيا الخيرية'), findsOneWidget);
  });
}

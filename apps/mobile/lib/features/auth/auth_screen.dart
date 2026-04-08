import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _formKey = GlobalKey<FormState>();
  bool _signup = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(_signup ? 'إنشاء حساب' : 'تسجيل الدخول')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            TextFormField(decoration: const InputDecoration(labelText: 'الهاتف أو البريد الإلكتروني'), validator: (v) => (v == null || v.isEmpty) ? 'هذا الحقل مطلوب' : null),
            const SizedBox(height: 12),
            TextFormField(obscureText: true, decoration: const InputDecoration(labelText: 'كلمة المرور'), validator: (v) => (v == null || v.length < 6) ? '6 أحرف على الأقل' : null),
            if (_signup) ...[
              const SizedBox(height: 12),
              TextFormField(decoration: const InputDecoration(labelText: 'الاسم الكامل')),
            ],
            const SizedBox(height: 16),
            FilledButton(
              onPressed: () {
                if (_formKey.currentState!.validate()) context.go('/home');
              },
              child: Text(_signup ? 'إنشاء حساب' : 'دخول'),
            ),
            TextButton(onPressed: () => context.go('/home'), child: const Text('الدخول كزائر')),
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              Text(_signup ? 'لديك حساب؟' : 'ليس لديك حساب؟'),
              TextButton(onPressed: () => setState(() => _signup = !_signup), child: Text(_signup ? 'سجل الدخول' : 'إنشاء حساب')),
            ]),
            const Divider(),
            const ListTile(leading: Icon(Icons.g_mobiledata), title: Text('Google (قريباً)')),
            const ListTile(leading: Icon(Icons.apple), title: Text('Apple (قريباً)')),
          ],
        ),
      ),
    );
  }
}

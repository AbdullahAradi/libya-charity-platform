import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 2), () {
      if (mounted) context.go('/onboarding');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const CircleAvatar(radius: 38, child: Icon(Icons.volunteer_activism, size: 38)),
          const SizedBox(height: 16),
          Text('ليبيا الخيرية', style: Theme.of(context).textTheme.headlineSmall),
          const Text('Libya Charity'),
        ]),
      ),
    );
  }
}

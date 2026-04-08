import { BarChart3, Building2, FileText, HandCoins, Headset, Home, ShieldCheck, Users } from 'lucide-react';

export const navItems = [
  { label: 'Overview', href: '/', icon: Home },
  { label: 'Cases', href: '/cases', icon: ShieldCheck },
  { label: 'Organizations', href: '/organizations', icon: Building2 },
  { label: 'Donations', href: '/donations', icon: HandCoins },
  { label: 'Reports', href: '/reports', icon: FileText },
  { label: 'Support', href: '/support', icon: Headset },
  { label: 'Audit', href: '/audit', icon: BarChart3 },
  { label: 'Users', href: '/users', icon: Users },
];

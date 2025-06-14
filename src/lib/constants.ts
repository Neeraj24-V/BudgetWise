
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Wallet, Coins, Lightbulb, Settings } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Budgets',
    href: '/budgets',
    icon: Wallet,
  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: Coins,
  },
  {
    title: 'AI Tips',
    href: '/ai-tips',
    icon: Lightbulb,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    disabled: true, // Example of a disabled item
  },
];

export const CATEGORY_ICONS: { [key: string]: string } = {
  food: 'Utensils',
  transport: 'Car',
  housing: 'Home',
  utilities: 'Zap',
  entertainment: 'Gamepad2',
  clothing: 'Shirt',
  health: 'HeartPulse',
  education: 'BookOpen',
  groceries: 'ShoppingCart',
  gifts: 'Gift',
  travel: 'Plane',
  other: 'MoreHorizontal',
};

export const DEFAULT_CATEGORIES: { name: string, icon: string }[] = [
  { name: 'Food', icon: 'Utensils' },
  { name: 'Transport', icon: 'Car' },
  { name: 'Housing', icon: 'Home' },
  { name: 'Utilities', icon: 'Zap' },
  { name: 'Entertainment', icon: 'Gamepad2' },
  { name: 'Groceries', icon: 'ShoppingCart' },
];

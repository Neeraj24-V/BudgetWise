
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, type NavItem } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2 p-4 h-full">
      {NAV_ITEMS.map((item) => {
        const Icon = (LucideIcons[item.icon as keyof typeof LucideIcons] as LucideIcons.LucideIcon) || LucideIcons.HelpCircle;
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start transition-colors duration-200',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90'
                : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              item.disabled && 'cursor-not-allowed opacity-50'
            )}
            disabled={item.disabled}
          >
            <Link href={item.disabled ? '#' : item.href}>
              <Icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}

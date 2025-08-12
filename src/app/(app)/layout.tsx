
"use client";

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SidebarNav } from '@/components/sidebar-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex flex-1 container mx-auto px-0 sm:px-4 pt-4 pb-8 gap-6">
        <aside className="hidden md:block w-64 flex-shrink-0 rounded-lg border bg-card text-card-foreground shadow-sm overflow-y-auto">
          <SidebarNav />
        </aside>
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}


"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SidebarNav } from '@/components/sidebar-nav';
import { Loader2 } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
     // This will be briefly visible before redirect or if JS is disabled.
     // Or, you could return null, but a loading state for auth check is better.
    return null;
  }

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

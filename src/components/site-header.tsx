
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, LogOut, LayoutDashboard, Home } from 'lucide-react';

export function SiteHeader() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M21 10c-1.56.34-3.24.16-4.66-.5A5 5 0 0 0 12 8c-1.76 0-3.37.83-4.47 2.17L2 15h10v2H2l7-7c.34-.34.71-.64 1.1-.89A6.046 6.046 0 0 1 12 8c1.85 0 3.56.83 4.79 2.21.35.34.66.73.94 1.15.45.66.77 1.4.93 2.19.22 1.08-.23 2.2-.98 3-.74.81-1.84 1.18-2.93.95-1.11-.23-2.07-.95-2.48-1.91a3.501 3.501 0 0 1 1.25-4.38"/>
            <path d="M17 9.49A3.5 3.5 0 1 1 15 3a3.5 3.5 0 0 1 2 6.49Z"/>
          </svg>
          <span className="font-bold text-lg text-gradient-primary">BudgetWise</span>
        </Link>
        <nav className="flex items-center space-x-2">
          {loading ? (
             <div className="h-8 w-20 animate-pulse bg-muted rounded-md"></div>
          ) : user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" /> Home
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary/10">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button size="sm" asChild className="gradient-accent text-accent-foreground hover:opacity-90">
                <Link href="/register">
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from 'next/link';
import { BudgetWiseLogo } from './logo';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';


export function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
            <Link href="/" className="flex items-center space-x-2">
                <BudgetWiseLogo className="h-6 w-6 text-primary" />
                <span className="font-bold inline-block">BudgetWise</span>
            </Link>
            <div className="flex flex-1 items-center justify-end space-x-2">
              <nav className="hidden md:flex items-center space-x-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" onClick={() => handleNavigation('/dashboard')}>Dashboard</Button>
                    <Button variant="ghost" onClick={() => handleNavigation('/settings')}>Settings</Button>
                    <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" onClick={() => handleNavigation('/login')}>Login</Button>
                    <Button onClick={() => handleNavigation('/login?view=register')}>Sign Up</Button>
                  </>
                )}
              </nav>
              <ThemeToggle />
            </div>
        </div>
    </header>
  );
}


"use client";

import { usePathname } from 'next/navigation';
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from '@/lib/utils';
import { Settings, LogOut, LogIn } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from './ui/button';
import Link from 'next/link';
import { BudgetWiseLogo } from './logo';


export function Header() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === 'loading';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
            <Link href="/" className="flex items-center space-x-2">
                <BudgetWiseLogo className="h-6 w-6 text-primary" />
                <span className="font-bold inline-block">BudgetWise</span>
            </Link>
            <div className="flex flex-1 items-center justify-end space-x-4">
                <nav className="hidden md:flex items-center space-x-2">
                    {isLoading ? (
                      <div className="h-8 w-24 bg-muted/50 animate-pulse rounded-md" />
                    ) : user ? (
                       <>
                            <Link href="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary">
                                Dashboard
                            </Link>
                            <Link href="/settings" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary flex items-center">
                               <Settings className="w-4 h-4 mr-1" /> Settings
                            </Link>
                            <Button variant="ghost" size="sm" onClick={() => signOut()}>
                                <LogOut className="w-4 h-4 mr-1" />
                                Sign Out
                            </Button>
                       </>
                    ) : (
                        <>
                            <Button variant="ghost" onClick={() => signIn('google')}>
                                <LogIn className="w-4 h-4 mr-2" />
                                Login
                            </Button>
                            <Button onClick={() => signIn('google')}>
                                Register
                            </Button>
                        </>
                    )}
                </nav>
                <ThemeToggle />
                {user && (
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image ?? undefined} alt="User profile picture" />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
            </div>
        </div>
    </header>
  );
}

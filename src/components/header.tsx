
"use client";

import { usePathname } from 'next/navigation';
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BudgetWiseLogo = ({ className }: {className?: string}) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
            <a href="/" className="flex items-center space-x-2">
                <BudgetWiseLogo className="h-6 w-6 text-primary" />
                <span className="font-bold inline-block">BudgetWise</span>
            </a>
            <div className="flex flex-1 items-center justify-end space-x-4">
                <nav className="hidden md:flex items-center space-x-2">
                    {isHomePage ? (
                        <>
                            <a href="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary">
                                Dashboard
                            </a>
                            <a href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary">
                                Login
                            </a>
                            <a href="/register" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                                Register
                            </a>
                        </>
                    ) : (
                       <>
                            <a href="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary">
                                Dashboard
                            </a>
                            <a href="/settings" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary flex items-center">
                               <Settings className="w-4 h-4 mr-1" /> Settings
                            </a>
                       </>
                    )}
                </nav>
                <ThemeToggle />
                {!isHomePage && (
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User profile picture" data-ai-hint="person portrait" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                )}
            </div>
        </div>
    </header>
  );
}

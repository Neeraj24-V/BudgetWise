
"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from 'next/link';
import { BudgetWiseLogo } from './logo';
import SessionProvider from "./session-provider";
import { AuthComponents } from "./auth-components";


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center">
            <Link href="/" className="flex items-center space-x-2">
                <BudgetWiseLogo className="h-6 w-6 text-primary" />
                <span className="font-bold inline-block">BudgetWise</span>
            </Link>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <SessionProvider>
                <AuthComponents />
              </SessionProvider>
              <ThemeToggle />
            </div>
        </div>
    </header>
  );
}

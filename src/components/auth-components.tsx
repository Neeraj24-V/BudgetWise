
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from './ui/button';
import Link from 'next/link';
import { Settings, LogOut, LogIn } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthComponents() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === 'loading';

  return (
    <nav className="flex items-center space-x-2">
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
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image ?? undefined} alt="User profile picture" />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
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
  );
}


"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from './ui/button';
import Link from 'next/link';
import { LogIn, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function AuthComponents() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-10 w-24 bg-muted/50 animate-pulse rounded-md"></div>;
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user?.image ?? ''} alt={session.user?.name ?? ''} />
              <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
             <Link href="/dashboard"><User className="w-4 h-4 mr-2"/>Dashboard</Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="/settings"><User className="w-4 h-4 mr-2"/>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut className="w-4 h-4 mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <nav className="flex items-center space-x-2">
       <Link href="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary">
            Dashboard
       </Link>
        <Button variant="ghost" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
            <LogIn className="w-4 h-4 mr-2" />
            Login
        </Button>
        <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
            Register
        </Button>
    </nav>
  );
}

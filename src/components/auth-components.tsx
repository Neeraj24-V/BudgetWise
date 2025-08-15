
"use client";

import { Button } from './ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export function AuthComponents() {
  
  return (
    <nav className="flex items-center space-x-2">
       <Link href="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary">
            Dashboard
       </Link>
        <Link href="/login" passHref>
          <Button variant="ghost">
              <LogIn className="w-4 h-4 mr-2" />
              Login
          </Button>
        </Link>
        <Link href="/login" passHref>
          <Button>
              Register
          </Button>
        </Link>
    </nav>
  );
}

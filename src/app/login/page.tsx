
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BudgetWiseLogo } from "@/components/logo";
import { signIn } from "next-auth/react";
import Link from "next/link";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 398.8 0 261.8 0 125.2 111.8 12.8 244 12.8c70.3 0 129.8 27.8 174.9 72.8l-67.9 67.9C315.8 119.5 282.5 102 244 102c-84.3 0-152.3 65.7-152.3 159.8s68 159.8 152.3 159.8c94.5 0 131.3-64.4 135.2-98.8H244v-73.4h239.5c1.4 12.4 2.1 24.4 2.1 36.8z"></path>
    </svg>
);


export default function LoginPage() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <BudgetWiseLogo className="h-8 w-8 text-primary" />
            </div>
          <CardTitle>Welcome to BudgetWise</CardTitle>
          <CardDescription>Sign in to access your financial dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
           <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
               <Link href="#" onClick={(e) => {e.preventDefault(); signIn("google", { callbackUrl: "/dashboard" })}} className="text-primary hover:underline">
                Register
              </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}

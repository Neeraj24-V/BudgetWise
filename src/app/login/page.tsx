
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BudgetWiseLogo } from "@/components/logo";
import Link from "next/link";

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
          <p className="text-center text-muted-foreground">Authentication is currently being rebuilt. Please check back later.</p>
        </CardContent>
      </Card>
    </div>
  );
}

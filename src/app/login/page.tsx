
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BudgetWiseLogo } from "@/components/logo";
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
    const payload = isLoginView ? { email, password } : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Failed to ${isLoginView ? 'login' : 'register'}`);
      }
      
      // Notify context and redirect
      window.dispatchEvent(new Event('loggedIn'));
      router.push('/dashboard');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
              <div className="flex justify-center items-center mb-4">
                  <BudgetWiseLogo className="h-8 w-8 text-primary" />
              </div>
            <CardTitle>{isLoginView ? 'Welcome Back!' : 'Create an Account'}</CardTitle>
            <CardDescription>{isLoginView ? 'Sign in to access your dashboard.' : 'Enter your details to get started.'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isLoginView && (
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLoginView}
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
             <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
            </Button>
            <Button variant="link" size="sm" type="button" onClick={() => { setIsLoginView(!isLoginView); setError(null); }}>
              {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

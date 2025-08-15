
"use client";

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BudgetWiseLogo } from "@/components/logo";
import { Eye, EyeOff } from 'lucide-react';

// Simple debounce function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return function(...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}


function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  const [isLoginView, setIsLoginView] = useState(view !== 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // State for email existence check
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailCheckResult, setEmailCheckResult] = useState<'available' | 'exists' | 'error' | null>(null);

  useEffect(() => {
    setIsLoginView(view !== 'register');
  }, [view]);

  // Debounced email check function
  const checkEmailExists = useCallback(
    debounce(async (emailValue: string) => {
      // Basic email format validation before checking
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setEmailCheckResult(null); // Clear result if format is invalid
        return;
      }
      setIsCheckingEmail(true);
      setEmailCheckResult(null);
      try {
        const res = await fetch('/api/auth/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailValue }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to check email');
        
        setEmailCheckResult(data.exists ? 'exists' : 'available');
      } catch (err) {
        setEmailCheckResult('error');
      } finally {
        setIsCheckingEmail(false);
      }
    }, 500), // 500ms delay
    []
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!isLoginView) { // Only check email when on the register view
      checkEmailExists(newEmail);
    }
  };


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
      
      // For both login and registration, we now expect user data and will redirect.
      window.dispatchEvent(new Event('loggedIn'));
      router.push('/dashboard');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmailCheckMessage = () => {
    if (isLoginView) return null;

    if (isCheckingEmail) {
      return <p className="text-xs text-muted-foreground mt-1">Checking...</p>;
    }

    if (emailCheckResult === 'exists') {
      return <p className="text-xs text-destructive mt-1">Email already in use. Try signing in.</p>;
    }

    if (emailCheckResult === 'available') {
      return <p className="text-xs text-green-500 mt-1">Email is available!</p>;
    }
    
    if(emailCheckResult === 'error') {
       return <p className="text-xs text-destructive mt-1">Could not verify email. Please try again.</p>;
    }

    return null;
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
                onChange={handleEmailChange}
                required
                disabled={isLoading}
              />
               {getEmailCheckMessage()}
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            {error && <p className="text-sm text-center" style={{ color: error.includes('successful') ? 'green' : 'hsl(var(--destructive))' }}>{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading || (emailCheckResult === 'exists' && !isLoginView)}>
              {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
            </Button>
            <Button variant="link" size="sm" type="button" onClick={() => { setIsLoginView(!isLoginView); setError(null); setEmailCheckResult(null); }}>
              {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}


"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BudgetWiseLogo } from "@/components/logo";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/otp/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to generate OTP');
      }
      
      setStep('otp');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }

      // Dispatch a custom event to notify the AuthContext that the user has logged in.
      // This is more reliable than trying to time a context refresh with a redirect.
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
        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <CardHeader className="text-center">
                <div className="flex justify-center items-center mb-4">
                    <BudgetWiseLogo className="h-8 w-8 text-primary" />
                </div>
              <CardTitle>Welcome to BudgetWise</CardTitle>
              <CardDescription>Enter your email to sign in or create an account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send One-Time Password'}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <CardHeader className="text-center">
              <CardTitle>Check your Email</CardTitle>
              <CardDescription>
                We've sent a 6-digit code to <span className="font-semibold">{email}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                 <label htmlFor="otp">One-Time Password</label>
                 <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="_ _ _ _ _ _"
                    className="text-center tracking-[0.5em]"
                  />
              </div>
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Sign In'}
              </Button>
              <Button variant="link" size="sm" onClick={() => { setStep('email'); setError(null); setOtp(''); }}>
                Use a different email
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}

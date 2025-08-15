
"use client";

import { useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencyContext, Currency } from '@/context/currency-context';
import { AuthContext } from '@/context/auth-context';

export default function SettingsPage() {
    const { currency, setCurrency } = useContext(CurrencyContext);
    const { user, isAuthenticated, checkUserStatus } = useContext(AuthContext);
    
    // Local state for profile form, initialized from context
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const getInitials = (name?: string) => {
        if (!name) return 'G';
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    }
    
    const handleCurrencyChange = async (newCurrency: Currency) => {
        if (!isAuthenticated || !user) {
            alert("You must be logged in to save preferences.");
            return;
        }

        try {
            const res = await fetch('/api/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, currency: newCurrency }),
            });

            if (!res.ok) {
                throw new Error('Failed to update currency');
            }
            // Update currency in the local context
            setCurrency(newCurrency);
            // Optionally, refresh user data from server if currency is part of user object
            await checkUserStatus();
            alert("Currency updated successfully!");

        } catch (error) {
            console.error(error);
            alert("Failed to update currency preference.");
        }
    }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        {!isAuthenticated ? (
            <Card>
                <CardHeader>
                    <CardTitle>Please Log In</CardTitle>
                    <CardDescription>You need to be logged in to manage your settings.</CardDescription>
                </CardHeader>
            </Card>
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information and profile picture.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Profile picture editing coming soon.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="name">Name</label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} disabled />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" value={email} disabled/>
                </div>
                <Button disabled>Update Profile (Coming Soon)</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                  <p>Toggle light or dark mode.</p>
                  <ThemeToggle />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currency</CardTitle>
                <CardDescription>Select your preferred currency.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Select onValueChange={(value) => handleCurrencyChange(value as Currency)} value={currency}>
                      <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="JPY">JPY (¥)</SelectItem>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                      </SelectContent>
                  </Select>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle>Collaborative Budgeting</CardTitle>
                <CardDescription>Manage who you share your financial data with.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                   <div className="space-y-2">
                      <label htmlFor="invite">Invite new member</label>
                      <div className="flex space-x-2">
                          <Input id="invite" type="email" placeholder="Enter email address" disabled/>
                          <Button disabled>Send Invite</Button>
                      </div>
                  </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

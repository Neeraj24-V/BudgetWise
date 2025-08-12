
"use client";

import { useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencyContext, Currency } from '@/context/currency-context';
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
    const { data: session, update: updateSession } = useSession();
    const { currency, setCurrency } = useContext(CurrencyContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            setEmail(session.user.email || '');
        }
    }, [session]);

    const handleProfileUpdate = () => {
        alert('Profile update functionality coming soon!');
    };

    const handleCurrencyChange = async (newCurrency: Currency) => {
        setCurrency(newCurrency); // Update context immediately for responsive UI

        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currency: newCurrency }),
            });

            if (!response.ok) {
                throw new Error('Failed to update currency');
            }
            // Manually trigger a session update to refresh the data on the client
            await updateSession({ ...session, user: { ...session?.user, currency: newCurrency } });
            
        } catch (error) {
            console.error("Error updating currency:", error);
            // Optionally revert the change in the UI if the API call fails
            // setCurrency(currency); // Revert to old currency
            alert("Failed to update currency preference.");
        }
    }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information and profile picture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={session?.user?.image || "https://placehold.co/100x100.png"} alt="User profile picture" data-ai-hint="person portrait" />
                  <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <label htmlFor="picture" className="text-sm font-medium leading-none">Profile Picture</label>
                    <Input id="picture" type="file" className="max-w-xs" />
                    <p className="text-xs text-muted-foreground">Upload a new photo. PNG, JPG, GIF up to 10MB.</p>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button onClick={handleProfileUpdate}>Update Profile</Button>
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
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
                    </div>
                    <Button variant="destructive">Remove</Button>
                </div>
                 <div className="space-y-2">
                    <label htmlFor="invite">Invite new member</label>
                    <div className="flex space-x-2">
                        <Input id="invite" type="email" placeholder="Enter email address" />
                        <Button>Send Invite</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

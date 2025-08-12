"use client";

import { useState } from 'react';
import { Bot, Send, User, Target, PiggyBank, Briefcase, Car, GraduationCap, Sparkles, DollarSign, Wallet, Group, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm your AI Financial Co-Pilot. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      text: input,
      isUser: true,
    };
    setMessages([...messages, newMessage]);
    setInput('');
    // TODO: Add backend call to get AI response
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
       <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-4',
                message.isUser ? 'justify-end' : ''
              )}
            >
              {!message.isUser && (
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <Card
                className={cn(
                  'max-w-[75%] p-3 rounded-lg',
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <CardContent className="p-0 text-sm">
                  {message.text}
                </CardContent>
              </Card>
              {message.isUser && (
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t bg-background p-4 md:p-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your finances..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

const goals = [
  { id: 1, icon: <Briefcase />, name: 'New Laptop', current: 1250, target: 2000, color: 'text-blue-400' },
  { id: 2, icon: <Car />, name: 'Dream Vacation', current: 3400, target: 8000, color: 'text-purple-400' },
  { id: 3, icon: <GraduationCap />, name: 'Student Loan', current: 15000, target: 25000, color: 'text-green-400' },
];

const upcomingBills = [
  { id: 1, name: 'Netflix', date: 'June 25', amount: 15.49 },
  { id: 2, name: 'Phone Bill', date: 'June 28', amount: 75.20 },
  { id: 3, name: 'Rent', date: 'July 1', amount: 1800.00 },
];

const categorySpending = [
  { id: 1, category: 'Groceries', amount: 430.50, happiness: 4 },
  { id: 2, category: 'Dining Out', amount: 210.75, happiness: 5 },
  { id: 3, category: 'Shopping', amount: 150.00, happiness: 3 },
  { id: 4, category: 'Transport', amount: 85.00, happiness: 4 },
  { id: 5, category: 'Entertainment', amount: 120.00, happiness: 5 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="copilot" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="copilot"><Bot className="w-4 h-4 mr-2"/>AI Co-Pilot</TabsTrigger>
            <TabsTrigger value="goals"><Target className="w-4 h-4 mr-2"/>Goals</TabsTrigger>
            <TabsTrigger value="spending"><DollarSign className="w-4 h-4 mr-2"/>Spending</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2"/>Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="copilot">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Savings Goals</CardTitle>
                <CardDescription>Turn your financial goals into a motivating game. Track your progress and celebrate your wins!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {goals.map(goal => (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <div className={cn("mr-4", goal.color)}>{goal.icon}</div>
                            <span className="font-medium">{goal.name}</span>
                        </div>
                      <span className="text-sm text-muted-foreground">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} />
                  </div>
                ))}
                <Button className="w-full mt-4">
                  <PiggyBank className="w-4 h-4 mr-2" />
                  Create New Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spending">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Mindful Spending</CardTitle>
                  <CardDescription>Track your spending and rate purchases on happiness to align with your values.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Happiness Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categorySpending.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Sparkles key={i} className={cn("w-4 h-4", i < item.happiness ? "text-yellow-400 fill-current" : "text-muted-foreground")} />
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Smart Alerts</CardTitle>
                    <CardDescription>Upcoming bills and predictive reminders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {upcomingBills.map(bill => (
                        <li key={bill.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{bill.name}</p>
                            <p className="text-sm text-muted-foreground">{bill.date}</p>
                          </div>
                          <p className="font-bold text-right">${bill.amount.toFixed(2)}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Wallet className="w-8 h-8 mr-4 text-primary"/>
                        <p className="text-3xl font-bold">$12,345.67</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account and collaboration settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Collaborative Budgeting</h3>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Group className="w-6 h-6 mr-4 text-primary"/>
                        <p>You are managing finances on your own.</p>
                      </div>
                      <Button>Invite Partner</Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

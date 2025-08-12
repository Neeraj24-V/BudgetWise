"use client";

import { useState } from 'react';
import { Bot, Send, User, Target, PiggyBank, Briefcase, Car, GraduationCap, Sparkles, DollarSign, Wallet, Group, Settings, X } from 'lucide-react';
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

function ChatInterface({ onClose }: { onClose: () => void }) {
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
    <Card className="flex flex-col h-[60vh] w-full max-w-lg shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback><Bot /></AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>AI Financial Co-Pilot</CardTitle>
            <CardDescription>Your personal finance assistant</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-4',
                message.isUser ? 'justify-end' : ''
              )}
            >
              {!message.isUser && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] p-3 rounded-lg text-sm',
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p>{message.text}</p>
              </div>
              {message.isUser && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <div className="border-t bg-background p-4">
        <div className="flex items-center gap-4">
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
    </Card>
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
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="goals"><Target className="w-4 h-4 mr-2"/>Goals</TabsTrigger>
            <TabsTrigger value="spending"><DollarSign className="w-4 h-4 mr-2"/>Spending</TabsTrigger>
          </TabsList>

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
        </Tabs>
      </main>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <Bot className="h-8 w-8" />
          <span className="sr-only">Open Chat</span>
        </Button>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <ChatInterface onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
}

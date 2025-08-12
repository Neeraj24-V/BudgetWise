"use client";

import { useState } from 'react';
import { Bot, Send, User, Target, PiggyBank, Briefcase, Car, GraduationCap, Sparkles, DollarSign, Wallet, Group, Settings, X, PlusCircle, Utensils, Bus, Film, ShoppingBag } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
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

const budgetCategories = [
    {
      id: 1,
      name: 'Groceries',
      icon: <ShoppingBag className="w-6 h-6" />,
      budget: 500,
      spent: 285.50,
      transactions: [
        { id: 1, name: 'SuperMart', amount: 120.75 },
        { id: 2, name: 'Local Market', amount: 75.25 },
        { id: 3, name: 'SuperMart', amount: 89.50 },
      ],
    },
    {
      id: 2,
      name: 'Transport',
      icon: <Bus className="w-6 h-6" />,
      budget: 150,
      spent: 85.00,
      transactions: [
        { id: 1, name: 'Metro Pass', amount: 65.00 },
        { id: 2, name: 'Ride Share', amount: 20.00 },
      ],
    },
    {
        id: 3,
        name: 'Entertainment',
        icon: <Film className="w-6 h-6" />,
        budget: 200,
        spent: 124.99,
        transactions: [
            { id: 1, name: 'Movie Tickets', amount: 30.00 },
            { id: 2, name: 'Streaming Svc', amount: 14.99 },
            { id: 3, name: 'Concert', amount: 80.00 },
        ],
    },
     {
      id: 4,
      name: 'Dining Out',
      icon: <Utensils className="w-6 h-6" />,
      budget: 250,
      spent: 180.25,
      transactions: [
        { id: 1, name: 'The Great Cafe', amount: 45.50 },
        { id: 2, name: 'Pizza Place', amount: 30.00 },
        { id: 3, name: 'Local Restaurant', amount: 104.75 },
      ],
    },
];

const totalBudget = budgetCategories.reduce((acc, cat) => acc + cat.budget, 0);
const totalSpent = budgetCategories.reduce((acc, cat) => acc + cat.spent, 0);


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

function AddExpenseModal({ categoryName, isOpen, onOpenChange }: { categoryName: string, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense to {categoryName}</DialogTitle>
          <DialogDescription>
            Enter the details of your expense. This will be deducted from your budget.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">Description</label>
            <Input id="description" placeholder="e.g., Coffee, Movie tickets" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="amount" className="text-right">Amount</label>
            <Input id="amount" type="number" placeholder="e.g., 15.50" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Add Expense</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default function DashboardPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddExpenseClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsAddExpenseModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="budget" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="budget"><Target className="w-4 h-4 mr-2"/>Budget</TabsTrigger>
            <TabsTrigger value="spending"><DollarSign className="w-4 h-4 mr-2"/>Spending</TabsTrigger>
          </TabsList>

          <TabsContent value="budget">
             <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Monthly Budget Overview</CardTitle>
                    <CardDescription>Your financial command center for the month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-muted-foreground text-sm">Total Budget</p>
                            <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Spent</p>
                            <p className="text-2xl font-bold text-destructive">${totalSpent.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Remaining</p>
                            <p className="text-2xl font-bold text-green-500">${(totalBudget - totalSpent).toLocaleString()}</p>
                        </div>
                    </div>
                    <Progress value={(totalSpent / totalBudget) * 100} className="mt-4" />
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {budgetCategories.map(category => (
                    <Card key={category.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-secondary rounded-full">
                                    {category.icon}
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{category.name}</CardTitle>
                                    <CardDescription>${category.spent.toLocaleString()} of ${category.budget.toLocaleString()}</CardDescription>
                                </div>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleAddExpenseClick(category.name)}>
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Add Expense
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Progress value={(category.spent / category.budget) * 100} className="mb-4 h-2" />
                            <ul className="space-y-2 text-sm">
                                {category.transactions.map(tx => (
                                    <li key={tx.id} className="flex justify-between items-center">
                                        <span>{tx.name}</span>
                                        <span className="font-medium">${tx.amount.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <Button className="w-full mt-6" variant="secondary">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Budget Category
            </Button>
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

      <AddExpenseModal
        categoryName={selectedCategory}
        isOpen={isAddExpenseModalOpen}
        onOpenChange={setIsAddExpenseModalOpen}
      />

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

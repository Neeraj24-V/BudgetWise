"use client";

import { useState, useEffect, ReactElement } from 'react';
import { Bot, Send, User, Target, PiggyBank, Briefcase, Car, GraduationCap, Sparkles, DollarSign, Wallet, Group, Settings, X, PlusCircle, Utensils, Bus, Film, ShoppingBag, TrendingUp, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface Transaction {
  id: number;
  name: string;
  amount: number;
  category: string;
}

interface BudgetCategory {
  id: number;
  name: string;
  icon: string;
  budget: number;
  spent: number;
  transactions: Transaction[];
}

const iconComponents: { [key: string]: ReactElement } = {
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Bus: <Bus className="w-6 h-6" />,
  Film: <Film className="w-6 h-6" />,
  Utensils: <Utensils className="w-6 h-6" />,
};

const weeklyData = [
  { name: 'Mon', total: 0 },
  { name: 'Tue', total: 0 },
  { name: 'Wed', total: 0 },
  { name: 'Thu', total: 0 },
  { name: 'Fri', total: 0 },
  { name: 'Sat', total: 0 },
  { name: 'Sun', total: 0 },
];

const monthlyData = [
  { name: 'Jan', total: 0 },
  { name: 'Feb', total: 0 },
  { name: 'Mar', total: 0 },
  { name: 'Apr', total: 0 },
  { name: 'May', total: 0 },
  { name: 'Jun', total: 0 },
];

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

const upcomingBills = [
  { id: 1, name: 'Netflix', date: 'June 25', amount: 15.49 },
  { id: 2, name: 'Phone Bill', date: 'June 28', amount: 75.20 },
  { id: 3, name: 'Rent', date: 'July 1', amount: 1800.00 },
];

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const name = payload[0].payload.name || label;
    return (
      <div className="p-2 text-xs rounded-lg shadow-md bg-background border">
        <p className="font-bold text-foreground">{`${name}`}</p>
        <p className="text-muted-foreground">{`Spent: $${value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

export default function DashboardPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);

  const [dynamicWeeklyData, setDynamicWeeklyData] = useState(weeklyData);
  const [dynamicMonthlyData, setDynamicMonthlyData] = useState(monthlyData);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const budgetsRes = await fetch('/api/budgets');
        const budgetsData = await budgetsRes.json();
        setBudgetCategories(budgetsData);

        const transactionsRes = await fetch('/api/transactions');
        const transactionsData = await transactionsRes.json();
        setTransactionHistory(transactionsData);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // This effect runs only once on the client, after hydration
    setDynamicWeeklyData(weeklyData.map(d => ({ ...d, total: Math.floor(Math.random() * 100) + 20 })));
    setDynamicMonthlyData(monthlyData.map(d => ({ ...d, total: Math.floor(Math.random() * 500) + 200 })));
  }, []);

  const totalBudget = Array.isArray(budgetCategories) ? budgetCategories.reduce((acc, cat) => acc + cat.budget, 0) : 0;
  const totalSpent = Array.isArray(budgetCategories) ? budgetCategories.reduce((acc, cat) => acc + cat.spent, 0) : 0;

  const categorySpendingData = Array.isArray(budgetCategories) ? budgetCategories.map(c => ({ name: c.name, spent: c.spent })) : [];


  const handleAddExpenseClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsAddExpenseModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Card className="mb-6">
          <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>An overview of your financial health and trends.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="w-full">
              <div className="flex justify-between items-start">
                  <TabsList>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                  <div className="space-y-1 text-right">
                    <p className="text-sm text-muted-foreground">Total Spent (This Month)</p>
                    <p className="text-2xl font-bold">${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
              </div>
              <TabsContent value="weekly">
                  <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={dynamicWeeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                               </defs>
                              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                              <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--primary) / 0.1)'}} />
                              <Area type="monotone" dataKey="total" stroke="hsl(var(--primary))" fill="url(#colorTotal)" />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </TabsContent>
              <TabsContent value="monthly">
                  <div className="h-[250px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dynamicMonthlyData}>
                              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                              <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--primary) / 0.1)'}} />
                              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </TabsContent>
               <TabsContent value="yearly">
                  <div className="h-[250px] flex items-center justify-center">
                    <p className="text-muted-foreground">Yearly chart coming soon!</p>
                  </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Top Spending Category</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <ShoppingBag className="w-6 h-6 mr-2 text-primary"/>
                    Groceries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">You've spent $430.50 on Groceries this month.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>AI Driven Trends</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-accent"/>
                    Dining Out Up 15%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Your spending on restaurants is trending up.
                  <a href="#" className="text-primary hover:underline ml-1">See details <ArrowRight className="w-4 h-4 inline"/></a></p>
                </CardContent>
              </Card>
          </CardFooter>
        </Card>


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
                    <Progress value={(totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0)} className="mt-4" />
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {Array.isArray(budgetCategories) && budgetCategories.map(category => (
                    <Card key={category.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-secondary rounded-full">
                                    {iconComponents[category.icon]}
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
                            <Progress value={(category.budget > 0 ? (category.spent / category.budget) * 100 : 0)} className="mb-4 h-2" />
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
              <div className="space-y-6 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>A visual breakdown of where your money is going.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categorySpendingData} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--primary) / 0.1)'}} />
                        <Bar dataKey="spent" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>A detailed log of your recent spending.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.isArray(transactionHistory) && transactionHistory.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

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

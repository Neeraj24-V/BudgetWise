

"use client";

import React, { useState, useEffect, ReactElement, useContext } from 'react';
import { Bot, Send, User, Target, PiggyBank, Briefcase, Car, GraduationCap, Sparkles, DollarSign, Wallet, Group, Settings, X, PlusCircle, Utensils, Bus, Film, ShoppingBag, TrendingUp, ArrowRight, Home, Shirt } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyContext } from '@/context/currency-context';
import { financialCoPilotFlow, FinancialCoPilotInput } from '@/ai/flows/financial-co-pilot-flow';


interface Message {
  id: string;
  role: 'user' | 'model';
  content: string; // Simplified content to a string
}


interface Transaction {
  _id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface BudgetCategory {
  _id: string;
  name: string;
  icon: string;
  budget: number;
  spent: number;
}

const iconComponents: { [key: string]: ReactElement } = {
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Bus: <Bus className="w-6 h-6" />,
  Film: <Film className="w-6 h-6" />,
  Utensils: <Utensils className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Car: <Car className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
};
const iconOptions = Object.keys(iconComponents);


function ChatInterface({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: "Hello! I'm your AI Financial Co-Pilot. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;
    setIsLoading(true);

    const userMessage: Message = {
      id: (messages.length + 1).toString(),
      role: 'user',
      content: input,
    };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');

    try {
      // The history for the AI should be in the simplified format
      const historyForAI = messages.map(m => ({
        role: m.role,
        content: m.content, // Content is now just a string
      }));

      const flowInput: FinancialCoPilotInput = {
        history: historyForAI,
        message: currentInput,
      };

      const aiResponseText = await financialCoPilotFlow(flowInput);

      const aiMessage: Message = {
        id: (messages.length + 2).toString(),
        role: 'model',
        content: aiResponseText,
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("AI flow error:", error);
      const errorMessage: Message = {
        id: (messages.length + 2).toString(),
        role: 'model',
        content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
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
                message.role === 'user' ? 'justify-end' : ''
              )}
            >
              {message.role !== 'user' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] p-3 rounded-lg text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p>{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
              </Avatar>
              <div className="max-w-[75%] p-3 rounded-lg bg-muted flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"></div>
              </div>
            </div>
          )}
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
            disabled={isLoading}
          />
          <Button onClick={handleSend} size="icon" disabled={isLoading}>
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

function AddExpenseModal({ categoryName, isOpen, onOpenChange, onExpenseAdded }: { categoryName: string, isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onExpenseAdded: () => void }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) {
        alert("Please fill out both fields.");
        return;
    }

    try {
        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: description,
                amount: parseFloat(amount),
                category: categoryName
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add expense');
        }

        setDescription('');
        setAmount('');
        onExpenseAdded(); // Callback to refresh data
        onOpenChange(false); // Close modal
    } catch (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Please try again.");
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense to {categoryName}</DialogTitle>
          <DialogDescription>
            Enter the details of your expense. This will be deducted from your budget.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">Description</label>
              <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Coffee, Movie tickets" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right">Amount</label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 15.50" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddCategoryModal({ isOpen, onOpenChange, onCategoryAdded }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onCategoryAdded: () => void }) {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !budget || !icon) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const response = await fetch('/api/budgets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                budget: parseFloat(budget),
                spent: 0,
                icon,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add category');
        }

        setName('');
        setBudget('');
        setIcon('');
        onCategoryAdded();
        onOpenChange(false);
    } catch (error) {
        console.error("Error adding category:", error);
        alert("Failed to add category. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget Category</DialogTitle>
          <DialogDescription>
            Create a new category to track your spending.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">Name</label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Groceries" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="budget" className="text-right">Budget</label>
              <Input id="budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g., 500" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
               <label htmlFor="icon" className="text-right">Icon</label>
                <Select onValueChange={setIcon} value={icon}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                        {iconOptions.map(iconName => (
                            <SelectItem key={iconName} value={iconName}>
                                <div className="flex items-center">
                                    {iconComponents[iconName]}
                                    <span className="ml-2">{iconName}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


const CustomTooltip = ({ active, payload, label, currencySymbol }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const name = payload[0].payload.name || label;
    return (
      <div className="p-2 text-xs rounded-lg shadow-md bg-background border">
        <p className="font-bold text-foreground">{`${name}`}</p>
        <p className="text-muted-foreground">{`Amount: ${currencySymbol}${value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];


export default function DashboardPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);

  const [weeklyData, setWeeklyData] = useState<{name: string, total: number}[]>([]);
  const [monthlyData, setMonthlyData] = useState<{name: string, total: number}[]>([]);
  
  const { currencySymbol } = useContext(CurrencyContext);

  const fetchData = async () => {
    try {
      const budgetsRes = await fetch('/api/budgets');
      const budgetsData = await budgetsRes.json();
      setBudgetCategories(Array.isArray(budgetsData) ? budgetsData : []);

      const transactionsRes = await fetch('/api/transactions');
      const transactionsData = await transactionsRes.json();
      setTransactionHistory(Array.isArray(transactionsData) ? transactionsData : []);

    } catch (error) {
      console.error("Failed to fetch data:", error);
      // Set to empty arrays in case of error to prevent crashes
      setBudgetCategories([]);
      setTransactionHistory([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (transactionHistory.length > 0) {
      // Process data for weekly chart
      const today = new Date();
      const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, etc.
      const startOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek));

      const newWeeklyData = [
        { name: 'Sun', total: 0 }, { name: 'Mon', total: 0 },
        { name: 'Tue', total: 0 }, { name: 'Wed', total: 0 },
        { name: 'Thu', total: 0 }, { name: 'Fri', total: 0 },
        { name: 'Sat', total: 0 }
      ];

      transactionHistory.forEach(tx => {
        const txDate = new Date(tx.date);
        if (txDate >= startOfWeek) {
          const dayIndex = txDate.getDay();
          newWeeklyData[dayIndex].total += tx.amount;
        }
      });
      setWeeklyData(newWeeklyData);

      // Process data for monthly chart
      const now = new Date();
      const lastSixMonths: {name: string, total: number}[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        lastSixMonths.push({
          name: d.toLocaleString('default', { month: 'short' }),
          total: 0
        });
      }
      
      transactionHistory.forEach(tx => {
        const txDate = new Date(tx.date);
        const monthDiff = (now.getFullYear() - txDate.getFullYear()) * 12 + (now.getMonth() - txDate.getMonth());
        if (monthDiff >= 0 && monthDiff < 6) {
           const monthIndex = 5 - monthDiff;
           lastSixMonths[monthIndex].total += tx.amount;
        }
      });
      setMonthlyData(lastSixMonths);
    }
  }, [transactionHistory]);


  const totalBudget = Array.isArray(budgetCategories) ? budgetCategories.reduce((acc, cat) => acc + cat.budget, 0) : 0;
  const totalSpent = Array.isArray(budgetCategories) ? budgetCategories.reduce((acc, cat) => acc + cat.spent, 0) : 0;

  const categorySpendingData = Array.isArray(budgetCategories) ? budgetCategories.map(c => ({ name: c.name, value: c.spent })) : [];
  
  const topTransactionsData = Array.isArray(transactionHistory) ? [...transactionHistory].sort((a, b) => b.amount - a.amount).slice(0, 5).map(tx => ({ name: tx.name, value: tx.amount })) : [];

  const topSpendingCategory = Array.isArray(budgetCategories) && budgetCategories.length > 0
    ? [...budgetCategories].sort((a, b) => b.spent - a.spent)[0]
    : null;

  const handleAddExpenseClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsAddExpenseModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>An overview of your financial health and trends.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <TabsList>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                  <div className="space-y-1 text-left sm:text-right w-full sm:w-auto">
                    <p className="text-sm text-muted-foreground">Total Spent (This Month)</p>
                    <p className="text-2xl font-bold">{currencySymbol}{totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
              </div>
              <TabsContent value="weekly">
                  <div className="h-[250px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                               </defs>
                              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${currencySymbol}${value}`} />
                              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                              <Tooltip content={<CustomTooltip currencySymbol={currencySymbol} />} cursor={{fill: 'hsl(var(--primary) / 0.1)'}} />
                              <Area type="monotone" dataKey="total" stroke="hsl(var(--primary))" fill="url(#colorTotal)" />
                          </AreaChart>
                      </ResponsiveContainer>
                  </div>
              </TabsContent>
              <TabsContent value="monthly">
                  <div className="h-[250px] w-full mt-4">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={monthlyData}>
                              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${currencySymbol}${value}`} />
                              <Tooltip content={<CustomTooltip currencySymbol={currencySymbol} />} cursor={{fill: 'hsl(var(--primary) / 0.1)'}} />
                              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </TabsContent>
               <TabsContent value="yearly">
                  <div className="h-[250px] flex items-center justify-center mt-4">
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
                    {topSpendingCategory ? (
                        <>
                            {iconComponents[topSpendingCategory.icon] ? React.cloneElement(iconComponents[topSpendingCategory.icon], { className: "w-6 h-6 mr-2 text-primary" }) : <ShoppingBag className="w-6 h-6 mr-2 text-primary"/>}
                            {topSpendingCategory.name}
                        </>
                    ) : (
                       "No Spending Yet"
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    {topSpendingCategory ? (
                        <p className="text-muted-foreground">You've spent {currencySymbol}{topSpendingCategory.spent.toFixed(2)} on {topSpendingCategory.name} this month.</p>
                    ) : (
                        <p className="text-muted-foreground">Start adding expenses to see your top category.</p>
                    )}
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
             <Card>
                <CardHeader>
                    <CardTitle>Monthly Budget Overview</CardTitle>
                    <CardDescription>Your financial command center for the month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-muted-foreground text-sm">Total Budget</p>
                            <p className="text-2xl font-bold">{currencySymbol}{totalBudget.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Spent</p>
                            <p className="text-2xl font-bold text-destructive">{currencySymbol}{totalSpent.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Remaining</p>
                            <p className="text-2xl font-bold text-green-500">{currencySymbol}{(totalBudget - totalSpent).toLocaleString()}</p>
                        </div>
                    </div>
                    <Progress value={(totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0)} className="mt-4" />
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
                {Array.isArray(budgetCategories) && budgetCategories.map(category => (
                    <Card key={category._id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-secondary rounded-full">
                                    {iconComponents[category.icon] || <DollarSign className="w-6 h-6" />}
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{category.name}</CardTitle>
                                    <CardDescription>{currencySymbol}{category.spent.toLocaleString()} of {currencySymbol}{category.budget.toLocaleString()}</CardDescription>
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
                                {transactionHistory.filter(tx => tx.category === category.name).slice(0, 3).map(tx => (
                                    <li key={tx._id} className="flex justify-between items-center">
                                        <span>{tx.name}</span>
                                        <span className="font-medium">{currencySymbol}{tx.amount.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <Button className="w-full mt-6" variant="secondary" onClick={() => setIsAddCategoryModalOpen(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Budget Category
            </Button>
          </TabsContent>

          <TabsContent value="spending">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                 <Card>
                  <CardHeader>
                    <CardTitle>Spending Distribution</CardTitle>
                    <CardDescription>How your spending breaks down across categories.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categorySpendingData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categorySpendingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip currencySymbol={currencySymbol} />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Transactions</CardTitle>
                    <CardDescription>Your biggest individual purchases this period.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topTransactionsData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${currencySymbol}${value}`} />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
                        <Tooltip content={<CustomTooltip currencySymbol={currencySymbol} />} cursor={{fill: 'hsl(var(--primary) / 0.1)'}} />
                        <Bar dataKey="value" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]}>
                            {
                                topTransactionsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))
                            }
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6 lg:col-span-1">
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
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.isArray(transactionHistory) && transactionHistory.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">{currencySymbol}{item.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
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
                          <p className="font-bold text-right">{currencySymbol}{bill.amount.toFixed(2)}</p>
                        </li>
                      ))}
                    </ul>
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
        onExpenseAdded={fetchData}
      />
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onOpenChange={setIsAddCategoryModalOpen}
        onCategoryAdded={fetchData}
      />

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-24 right-6 h-16 w-16 rounded-full shadow-lg"
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

    

"use client";

import { useState, useEffect } from 'react';
import { DollarSign, CalendarDays, TrendingUp, BarChart2 } from 'lucide-react';
import { MonthlyExpenseChart } from '@/components/charts/monthly-expense-chart';
import { StatCard } from '@/components/stat-card';
import type { AnnualExpenseSummary } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data - replace with actual data fetching
const mockAnnualData: AnnualExpenseSummary[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - i);
  return {
    month: date.toLocaleString('default', { month: 'short' }),
    year: date.getFullYear(),
    totalExpenses: Math.floor(Math.random() * (2500 - 500 + 1) + 500), // Random expenses between 500 and 2500
  };
}).reverse();


export default function DashboardPage() {
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState<number>(0);
  const [currentYearExpenses, setCurrentYearExpenses] = useState<number>(0);
  const [annualExpenseData, setAnnualExpenseData] = useState<AnnualExpenseSummary[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const currentMonthData = mockAnnualData.find(d => 
        d.month === new Date().toLocaleString('default', { month: 'short' }) &&
        d.year === new Date().getFullYear()
    );
    setCurrentMonthExpenses(currentMonthData?.totalExpenses || Math.floor(Math.random() * 2000) + 500);
    
    const thisYearData = mockAnnualData.filter(d => d.year === new Date().getFullYear());
    setCurrentYearExpenses(thisYearData.reduce((sum, item) => sum + item.totalExpenses, 0));
    
    setAnnualExpenseData(mockAnnualData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gradient-primary">Dashboard</h1>
        <div className="flex gap-2">
            <Button asChild className="gradient-accent text-accent-foreground hover:opacity-90">
                <Link href="/expenses/new">Add Expense</Link>
            </Button>
            <Button asChild variant="outline">
                <Link href="/budgets">Manage Budgets</Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Current Month's Expenses"
          value={`$${currentMonthExpenses.toLocaleString()}`}
          icon={DollarSign}
          description="Total spending this month"
          className="animate-fade-in [animation-delay:0.2s]"
          iconBgClass="bg-accent/10"
        />
        <StatCard
          title="Current Year's Expenses"
          value={`$${currentYearExpenses.toLocaleString()}`}
          icon={CalendarDays}
          description="Total spending this year so far"
          className="animate-fade-in [animation-delay:0.4s]"
        />
        <StatCard
          title="Avg. Monthly Expense"
          value={`$${(currentYearExpenses / (new Date().getMonth() + 1)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          icon={TrendingUp}
          description="Average spending per month this year"
          className="animate-fade-in [animation-delay:0.6s]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in [animation-delay:0.8s]">
          <MonthlyExpenseChart data={annualExpenseData} />
        </div>
        <Card className="shadow-lg animate-fade-in [animation-delay:1s]">
            <CardHeader>
                <CardTitle className="text-xl text-gradient-primary">Quick Actions</CardTitle>
                <CardDescription>Manage your finances efficiently.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost" asChild>
                    <Link href="/expenses"><BarChart2 className="mr-2 h-4 w-4" />View All Expenses</Link>
                </Button>
                <Button className="w-full justify-start" variant="ghost" asChild>
                    <Link href="/budgets/new"><DollarSign className="mr-2 h-4 w-4" />Set New Budget</Link>
                </Button>
                <Button className="w-full justify-start" variant="ghost" asChild>
                    <Link href="/ai-tips"><TrendingUp className="mr-2 h-4 w-4" />Get AI Budget Tips</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Minimal Card and Header components if not using ShadCN (example)
// Keep these minimal as ShadCN is preferred and available.
const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>{children}</div>
);
const CardHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
);
const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <h3 className={cn("font-semibold leading-none tracking-tight", className)}>{children}</h3>
);
const CardDescription = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
);
const CardContent = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("p-6 pt-0", className)}>{children}</div>
);
const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

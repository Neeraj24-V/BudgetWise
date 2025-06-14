
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnnualExpenseSummary } from "@/types"
import { ChartTooltipContent } from "@/components/ui/chart" // Using ShadCN's chart tooltip for consistency

interface MonthlyExpenseChartProps {
  data: AnnualExpenseSummary[];
}

export function MonthlyExpenseChart({ data }: MonthlyExpenseChartProps) {
  // Ensure data is sorted by year then month for correct display
  const sortedData = [...data].sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });
  
  const chartData = sortedData.map(item => ({
    name: `${item.month} ${item.year}`,
    totalExpenses: item.totalExpenses,
  }));

  return (
    <Card className="shadow-lg col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient-primary">Monthly Expense Trend</CardTitle>
        <CardDescription>Your spending overview for the last 12 months.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`} 
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--accent) / 0.2)" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="totalExpenses" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getBudgetInsights, type BudgetInsightsInput, type BudgetInsightsOutput } from '@/ai/flows/budget-insights';
import { Loader2, Lightbulb, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

// Example past expense data (could be fetched or derived from user's actual expenses)
const exampleExpenses = [
  { category: "Food", amount: 450 },
  { category: "Transport", amount: 150 },
  { category: "Entertainment", amount: 200 },
  { category: "Utilities", amount: 180 },
  { category: "Shopping", amount: 300 },
];

export default function AiTipsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<BudgetInsightsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expenseDataInput, setExpenseDataInput] = useState(JSON.stringify(exampleExpenses, null, 2));

  const handleGetInsights = async () => {
    setIsLoading(true);
    setError(null);
    setInsights(null);

    let parsedExpenses;
    try {
      parsedExpenses = JSON.parse(expenseDataInput);
      if (!Array.isArray(parsedExpenses) || !parsedExpenses.every(item => typeof item.category === 'string' && typeof item.amount === 'number')) {
        throw new Error("Invalid JSON structure. Expects an array of {category: string, amount: number}.");
      }
    } catch (e: any) {
      setError(`Invalid JSON format for expenses: ${e.message}`);
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: `Please provide valid JSON for expenses. ${e.message}`,
      });
      setIsLoading(false);
      return;
    }

    const input: BudgetInsightsInput = {
      expenses: JSON.stringify(parsedExpenses), // The flow expects a JSON string
    };

    try {
      const result = await getBudgetInsights(input);
      setInsights(result);
    } catch (err: any) {
      console.error("AI Insights Error:", err);
      setError(err.message || "Failed to fetch AI budget insights. Please try again.");
      toast({
        variant: "destructive",
        title: "AI Error",
        description: err.message || "Could not retrieve AI suggestions.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-gradient-primary">AI-Powered Budget Tips</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Get Smart Suggestions</CardTitle>
          <CardDescription>
            Leverage AI to analyze your spending patterns and receive personalized advice for better budget management.
            Provide your expense data in JSON format (array of objects with `category` and `amount`).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="expenseData">Past Expense Data (JSON format)</Label>
            <Textarea
              id="expenseData"
              value={expenseDataInput}
              onChange={(e) => setExpenseDataInput(e.target.value)}
              placeholder='e.g., [{"category": "Food", "amount": 300}, {"category": "Transport", "amount": 100}]'
              rows={8}
              className="mt-1 font-code text-sm bg-slate-50 dark:bg-slate-800"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Edit the sample data or paste your own expense summary. Ensure it&apos;s a valid JSON array.
            </p>
          </div>

          <Button onClick={handleGetInsights} disabled={isLoading} className="w-full sm:w-auto gradient-accent text-accent-foreground">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Generate Insights
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive shadow-md">
          <CardHeader className="flex flex-row items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {insights && (
        <Card className="shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-gradient-primary">
              <Lightbulb className="mr-2 h-5 w-5" /> Your Budget Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{insights.suggestions}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

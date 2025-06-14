'use server';

/**
 * @fileOverview This file contains the Genkit flow for providing budget insights based on user's past spending habits.
 *
 * - getBudgetInsights - A function that takes expense data as input and returns AI-powered budget adjustment suggestions.
 * - BudgetInsightsInput - The input type for the getBudgetInsights function.
 * - BudgetInsightsOutput - The return type for the getBudgetInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BudgetInsightsInputSchema = z.object({
  expenses: z
    .string()
    .describe(
      'A JSON string representing the user past expenses. Each object will have a category and amount.'
    ),
});
export type BudgetInsightsInput = z.infer<typeof BudgetInsightsInputSchema>;

const BudgetInsightsOutputSchema = z.object({
  suggestions: z.string().describe('AI-powered suggestions for budget adjustments.'),
});
export type BudgetInsightsOutput = z.infer<typeof BudgetInsightsOutputSchema>;

export async function getBudgetInsights(input: BudgetInsightsInput): Promise<BudgetInsightsOutput> {
  return budgetInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'budgetInsightsPrompt',
  input: {schema: BudgetInsightsInputSchema},
  output: {schema: BudgetInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's past spending habits and provide suggestions for budget adjustments.

Past Expenses: {{{expenses}}}

Provide clear and actionable suggestions to help the user optimize their financial planning and identify areas where they can save money.`,
});

const budgetInsightsFlow = ai.defineFlow(
  {
    name: 'budgetInsightsFlow',
    inputSchema: BudgetInsightsInputSchema,
    outputSchema: BudgetInsightsOutputSchema,
  },
  async input => {
    try {
      JSON.parse(input.expenses);
    } catch (e) {
      throw new Error('Expenses must be a valid JSON string.');
    }

    const {output} = await prompt(input);
    return output!;
  }
);

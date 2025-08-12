/**
 * @fileOverview The main flow for the AI Financial Co-Pilot.
 */
'use server';

import { ai } from '@/ai/genkit';
import { getBudgetsTool, getTransactionsTool } from '@/ai/tools/database-tools';
import { z } from 'zod';

const FinancialCoPilotInputSchema = z.object({
  history: z.array(z.object({
    role: z.string(),
    content: z.array(z.object({
      text: z.string(),
    })),
  })),
  message: z.string(),
});
export type FinancialCoPilotInput = z.infer<typeof FinancialCoPilotInputSchema>;

const financialCoPilotPrompt = ai.definePrompt(
  {
    name: 'financialCoPilotPrompt',
    tools: [getBudgetsTool, getTransactionsTool],
    system: `You are an expert financial co-pilot.
    You can answer questions about the user's finances based on the data available in the tools.
    Use the tools to get the user's budget and transaction data.
    Be friendly and helpful. Do not make up information.
    If you don't know the answer, say that you don't know.`,
  },
  async (input: { history: any[]; message: string }) => {
    return {
      history: input.history,
      messages: [{role: 'user', content: [{text: input.message}]}],
    };
  }
);

export async function financialCoPilotFlow(input: FinancialCoPilotInput): Promise<string> {
  const llmResponse = await financialCoPilotPrompt(input);
  return llmResponse.text || 'Sorry, I had a problem responding.';
}

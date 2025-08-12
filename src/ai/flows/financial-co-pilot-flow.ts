/**
 * @fileOverview The main flow for the AI Financial Co-Pilot.
 */
'use server';

import { ai } from '@/ai/genkit';
import { getBudgetsTool, getTransactionsTool } from '@/ai/tools/database-tools';
import { Message, Part } from 'genkit';
import { z } from 'zod';

const FinancialCoPilotInputSchema = z.object({
  history: z.array(z.any()),
  message: z.string(),
});
export type FinancialCoPilotInput = z.infer<typeof FinancialCoPilotInputSchema>;

export async function financialCoPilotFlow(input: FinancialCoPilotInput): Promise<string> {
  const { history, message } = input;

  // Correctly map the history to Genkit Message objects.
  // The content of a message should be an array of `Part` objects.
  const messages: Message[] = history.map((msg: { role: 'user' | 'model'; content: { text: string }[] }) => {
    return new Message({
      role: msg.role,
      content: msg.content.map(c => ({ text: c.text }))
    });
  });

  // Add the new user message to the history
  messages.push(new Message({ role: 'user', content: [{ text: message }] }));

  try {
    const llmResponse = await ai.generate({
        model: 'gemini-pro',
        prompt: {
            messages
        },
        tools: [getBudgetsTool, getTransactionsTool],
        system: `You are an expert financial co-pilot.
        You can answer questions about the user's finances based on the data available in the tools.
        Use the tools to get the user's budget and transaction data.
        Be friendly and helpful. Do not make up information.
        If you don't know the answer, say that you don't know.`,
    });

    return llmResponse.text() || 'Sorry, I had a problem responding.';
  } catch(e) {
    console.error("Error in financialCoPilotFlow:", e);
    // Provide a more specific error message if possible, but keep it simple for the user.
    return 'Sorry, there was an error processing your request on the server. Please try again later.';
  }
}
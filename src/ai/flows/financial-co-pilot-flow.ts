/**
 * @fileOverview The main flow for the AI Financial Co-Pilot.
 */
'use server';

import { ai } from '@/ai/genkit';
import { getBudgetsTool, getTransactionsTool } from '@/ai/tools/database-tools';
import { Part } from 'genkit';
import { z } from 'zod';

// Simplified schema for individual messages
const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const FinancialCoPilotInputSchema = z.object({
  // History is now an array of simple message objects
  history: z.array(MessageSchema),
  message: z.string(),
});
export type FinancialCoPilotInput = z.infer<typeof FinancialCoPilotInputSchema>;

type GenkitMessage = {
    role: 'user' | 'model' | 'tool';
    content: Part[];
};


export async function financialCoPilotFlow(input: FinancialCoPilotInput): Promise<string> {
  const { history, message } = input;

  // Map the simplified history to Genkit Message objects.
  const messages: GenkitMessage[] = history.map(msg => ({
      role: msg.role,
      content: [{ text: msg.content }]
  }));

  // Add the new user message to the history
  messages.push({ role: 'user', content: [{ text: message }] });

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

    const responseText = llmResponse.text();

    if (!responseText) {
      console.error("AI response was empty or invalid.");
      // Throw an error that the client can catch
      throw new Error("I'm sorry, I received an empty response from the AI. Please try again.");
    }

    return responseText;
    
  } catch(e: any) {
    console.error("Error in financialCoPilotFlow:", e);
    // Re-throw the error with a user-friendly message so the client-side can handle it.
    // This allows the UI to show a proper error state.
    throw new Error(`Sorry, there was an error processing your request on the server. Details: ${e.message}`);
  }
}

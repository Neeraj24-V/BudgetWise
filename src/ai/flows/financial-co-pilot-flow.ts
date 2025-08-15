/**
 * @fileOverview The main flow for the AI Financial Co-Pilot.
 */
'use server';

import { ai } from '@/ai/genkit';
import { getBudgetsTool, getTransactionsTool } from '@/ai/tools/database-tools';
import { Message } from 'genkit';
import { z } from 'zod';

// Schema for individual messages in the history
const HistoryMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// The input schema for the main flow
const FinancialCoPilotInputSchema = z.object({
  history: z.array(HistoryMessageSchema),
  message: z.string(),
});
export type FinancialCoPilotInput = z.infer<typeof FinancialCoPilotInputSchema>;


/**
 * The main server-side flow for the financial co-pilot.
 * It takes the chat history and a new message, then returns the AI's response.
 */
export async function financialCoPilotFlow(input: FinancialCoPilotInput): Promise<string> {
  const { history, message } = input;

  // Map the incoming history to the format Genkit expects.
  // The content of each message must be an array of Parts.
  const messages: Message[] = history.map(msg => ({
      role: msg.role,
      content: [{ text: msg.content }]
  }));

  // Add the new user message to the conversation history.
  messages.push({ role: 'user', content: [{ text: message }] });

  try {
    const llmResponse = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', 
        history: messages, // Pass the entire conversation history
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
      throw new Error("I'm sorry, I received an empty response from the AI. Please try again.");
    }

    return responseText;
    
  } catch(e: any) {
    console.error("Error in financialCoPilotFlow:", e);
    // Re-throw the error with a user-friendly message so the client-side can handle it.
    throw new Error(`Sorry, there was an error processing your request on the server. Details: ${e.message}`);
  }
}

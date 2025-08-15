
import { NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { getBudgetsTool, getTransactionsTool } from '@/ai/tools/database-tools';
import { Message } from 'genkit';

export async function POST(request: Request) {
  try {
    const { history, message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Map the incoming history to the format Genkit expects.
    // The content of each message must be an array of Parts.
    const messages: Message[] = history.map((msg: any) => ({
        role: msg.role,
        content: [{ text: msg.content }]
    }));

    // Add the new user message to the conversation history.
    messages.push({ role: 'user', content: [{ text: message }] });

    const llmResponse = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        history: messages,
        tools: [getBudgetsTool, getTransactionsTool],
        system: `You are an expert financial co-pilot.
        You can answer questions about the user's finances based on the data available in the tools.
        Use the tools to get the user's budget and transaction data.
        Be friendly and helpful. Do not make up information.
        If you don't know the answer, say that you don't know.`,
    });

    const responseText = llmResponse.text();

    if (!responseText) {
       return NextResponse.json({ error: "AI response was empty or invalid." }, { status: 500 });
    }

    return NextResponse.json({ response: responseText });

  } catch (e: any) {
    console.error("Error in /api/chat:", e);
    return NextResponse.json({ error: `Sorry, there was an error processing your request. Details: ${e.message}` }, { status: 500 });
  }
}

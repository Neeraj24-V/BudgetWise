/**
 * @fileOverview Tools for the AI to interact with the database.
 */
'use server';

import { ai } from '@/ai/genkit';
import { connectToDatabase } from '@/lib/mongodb';
import { z } from 'zod';

export const getBudgetsTool = ai.defineTool(
  {
    name: 'getBudgets',
    description: 'Returns all of the budget categories and their spending.',
    outputSchema: z.any(),
  },
  async () => {
    const { db } = await connectToDatabase();
    return await db.collection('budgets').find({}).toArray();
  }
);

export const getTransactionsTool = ai.defineTool(
  {
    name: 'getTransactions',
    description: 'Returns all of the recent transactions.',
    outputSchema: z.any(),
  },
  async () => {
    const { db } = await connectToDatabase();
    return await db.collection('transactions').find({}).sort({ date: -1 }).toArray();
  }
);

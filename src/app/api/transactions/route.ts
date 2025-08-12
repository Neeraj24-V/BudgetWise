import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    // In a real app, you might want to fetch transactions across all budgets
    // or based on specific user query. For now, let's fetch from a 'transactions' collection.
    const allTransactions = await db.collection('transactions').find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(allTransactions);
  } catch (error) {
     console.error('Failed to fetch transactions:', error);
     return NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const newTransaction = await request.json();
        const { db } = await connectToDatabase();

        // In a real app, you would also update the 'spent' amount in the corresponding budget category.
        // This is a simplified example.
        const result = await db.collection('transactions').insertOne({ ...newTransaction, date: new Date() });

        // Logic to update budget 'spent' amount would go here

        return NextResponse.json({ message: "Transaction added successfully", transaction: { ...newTransaction, _id: result.insertedId } }, { status: 201 });

    } catch (error) {
        console.error('Failed to add transaction:', error);
        return NextResponse.json({ message: 'Failed to add transaction' }, { status: 500 });
    }
}

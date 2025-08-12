
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
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

        const transactionToInsert = {
            ...newTransaction,
            amount: parseFloat(newTransaction.amount),
            date: new Date()
        };
        
        const result = await db.collection('transactions').insertOne(transactionToInsert);

        // Update the 'spent' amount in the corresponding budget category
        await db.collection('budgets').updateOne(
            { name: newTransaction.category },
            { $inc: { spent: parseFloat(newTransaction.amount) } }
        );

        return NextResponse.json({ message: "Transaction added successfully", transaction: { ...transactionToInsert, _id: result.insertedId } }, { status: 201 });

    } catch (error) {
        console.error('Failed to add transaction:', error);
        return NextResponse.json({ message: 'Failed to add transaction' }, { status: 500 });
    }
}

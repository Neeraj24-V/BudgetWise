import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const budgetCategories = await db.collection('budgets').find({}).toArray();
    return NextResponse.json(budgetCategories);
  } catch (error) {
    console.error('Failed to fetch budget categories:', error);
    return NextResponse.json({ message: 'Failed to fetch budget categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const newCategory = await request.json();
        const { db } = await connectToDatabase();
        const result = await db.collection('budgets').insertOne(newCategory);
        return NextResponse.json({ message: "Category added successfully", category: { ...newCategory, _id: result.insertedId } }, { status: 201 });
    } catch (error) {
        console.error('Failed to add category:', error);
        return NextResponse.json({ message: 'Failed to add category' }, { status: 500 });
    }
}

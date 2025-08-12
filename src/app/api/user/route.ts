
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { currency } = await request.json();
    
    // Basic validation
    if (!currency || !['USD', 'EUR', 'GBP', 'JPY', 'INR'].includes(currency)) {
        return NextResponse.json({ message: 'Invalid currency provided' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const userId = (session.user as any).id;

    if (!userId) {
        return NextResponse.json({ message: 'User ID not found in session' }, { status: 400 });
    }

    const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { currency: currency } }
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Currency updated successfully', currency }, { status: 200 });

  } catch (error) {
    console.error('Failed to update currency:', error);
    return NextResponse.json({ message: 'Failed to update currency' }, { status: 500 });
  }
}

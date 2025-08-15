
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });

    return NextResponse.json({ exists: !!existingUser });

  } catch (error) {
    console.error('Check Email Error:', error);
    return NextResponse.json({ message: 'Error checking email' }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
        return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      currency: 'USD',
      createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);
    
    // We don't sign them in automatically, they have to go to the login page.
    // This is a common pattern.

    return NextResponse.json({ message: 'User created successfully', userId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

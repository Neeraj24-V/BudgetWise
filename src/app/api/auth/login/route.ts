
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

if (!process.env.JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id.toHexString(),
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set token in an httpOnly cookie
    cookies().set('session-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    const { _id, name, currency } = user;
    const userData = { id: _id.toHexString(), email, name, currency };

    return NextResponse.json({ message: 'Login successful', user: userData }, { status: 200 });

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

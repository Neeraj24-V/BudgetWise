
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Ensure the JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env');
}
const JWT_SECRET = process.env.JWT_SECRET;

interface DecodedToken {
    userId: string;
    // other properties from your token payload...
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token');

  if (!token) {
    return NextResponse.json({ message: 'Authentication token not found.' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token.value, JWT_SECRET) as DecodedToken;
    
    if (!decoded || !decoded.userId) {
        return NextResponse.json({ message: 'Invalid token payload.' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(decoded.userId) },
      // Projection to exclude sensitive fields like OTP
      { projection: { otp: 0, otpExpires: 0 } } 
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }
    
    // Sanitize user data before sending it to the client
    const { _id, name, email, currency } = user;
    const userData = { id: _id.toHexString(), name, email, currency };

    return NextResponse.json({ user: userData }, { status: 200 });

  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
        return NextResponse.json({ message: `Token error: ${error.message}` }, { status: 401 });
    }
    // Handle other potential errors
    console.error('Me Endpoint Error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}

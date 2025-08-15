import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Clear the session cookie
    cookies().set('session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Set expiry to a past date
      path: '/',
    });

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { randomInt } from 'crypto';
import bcrypt from 'bcryptjs';

// This is a placeholder for a real email sending service
async function sendOTPEmail(email: string, otp: string) {
  // In a production environment, you would use a service like SendGrid, AWS SES, or Resend.
  // For this example, we'll just log it to the console.
  console.log(`
    ================================================
    SENDING OTP EMAIL (SIMULATED)
    ------------------------------------------------
    To: ${email}
    OTP: ${otp}
    ------------------------------------------------
    This is where you'd integrate your email service.
    For now, use the OTP above to complete the login.
    ================================================
  `);
  return Promise.resolve();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Generate a 6-digit OTP
    const otp = randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Find user or create a new one
    const user = await db.collection('users').findOneAndUpdate(
      { email },
      { 
        $set: { 
          otp: otpHash,
          otpExpires: otpExpires,
          email: email // Ensure email is set on update
        },
        $setOnInsert: {
            name: `Guest-${randomInt(1000, 9999)}`,
            currency: 'USD',
            createdAt: new Date(),
        }
      },
      { upsert: true, returnDocument: 'after' }
    );
    
    // In a real application, you would not send the OTP in the response.
    // You would send it via email or SMS using a service.
    await sendOTPEmail(email, otp);

    return NextResponse.json({ 
        message: 'OTP has been generated. Check your console for the simulated email.',
        // The OTP is returned here for development convenience.
        // DO NOT do this in production.
        otpForDevelopment: otp 
    }, { status: 200 });

  } catch (error) {
    console.error('OTP Generation Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

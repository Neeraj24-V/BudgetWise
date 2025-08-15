import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { randomInt } from 'crypto';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

// Initialize Resend
if (!process.env.RESEND_API_KEY) {
  // Note: This check runs at build time, so the key must be present.
  // In a real production environment, you'd want to handle this gracefully.
  console.log('Missing RESEND_API_KEY. OTP emails will not be sent.');
}
const resend = new Resend(process.env.RESEND_API_KEY);


// This function now sends a real email using Resend.
async function sendOTPEmail(email: string, otp: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API Key is not configured. Cannot send email.');
    // In development, we can fallback to console logging.
    // In production, this should throw a hard error.
    console.log(`
      ================================================
      SIMULATING OTP EMAIL (Resend not configured)
      ------------------------------------------------
      To: ${email}
      OTP: ${otp}
      ================================================
    `);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Must be from a verified domain on Resend
      to: [email],
      subject: `Your BudgetWise Login Code: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h2>Your One-Time Password</h2>
          <p>Use the code below to log in to your BudgetWise account.</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px; border: 1px solid #ddd; padding: 15px; display: inline-block;">
            ${otp}
          </p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('OTP email sent successfully:', data);

  } catch (error) {
    console.error('Error in sendOTPEmail:', error);
    // Rethrow to be caught by the main handler
    throw error;
  }
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
    
    // Send the OTP via our new email function
    await sendOTPEmail(email, otp);

    return NextResponse.json({ 
        message: 'An OTP has been sent to your email address.',
    }, { status: 200 });

  } catch (error) {
    console.error('OTP Generation Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

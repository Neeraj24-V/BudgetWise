import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { randomInt } from 'crypto';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

// This function now sends a real email using Resend.
async function sendOTPEmail(email: string, otp: string) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('Resend API Key is not configured. Cannot send email.');
    throw new Error('Server is not configured to send emails. Missing RESEND_API_KEY.');
  }
  
  const resend = new Resend(resendApiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'BudgetWise <onboarding@finflow.example.com>', // Using your verified domain
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
      // Log the detailed error from Resend
      const errorDetails = JSON.stringify(error, null, 2);
      console.error('Resend API Error:', errorDetails);
      // Pass a more informative error message
      throw new Error(`Failed to send email via Resend. Details: ${errorDetails}`);
    }

    console.log('OTP email sent successfully via Resend:', data);

  } catch (error) {
    console.error('Error in sendOTPEmail function:', error);
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
    await db.collection('users').findOneAndUpdate(
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
    
    // Send the OTP via our email function
    await sendOTPEmail(email, otp);

    return NextResponse.json({ 
        message: 'An OTP has been sent to your email address.',
    }, { status: 200 });

  } catch (error: any) {
    // Log the detailed error to the server console
    console.error('OTP Generation API Error:', error);
    // Return a generic error message to the client for security
    return NextResponse.json({ message: `Internal server error: ${error.message}` }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
// You might need to adjust this path based on your actual auth options file
// import { authOptions } from '../auth/[...nextauth]/route'; 


export async function PUT(request: Request) {
    // This is a placeholder for how you might get the session on the server
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const { currency, userId } = await request.json();

        if (!userId) {
             return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }
        
        const { db } = await connectToDatabase();
        
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: { currency: currency } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Currency updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Failed to update currency:', error);
        return NextResponse.json({ message: 'Failed to update currency' }, { status: 500 });
    }
}

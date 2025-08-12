
import NextAuth, { AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.NEXTAUTH_SECRET) {
    throw new Error('Missing Google OAuth or NextAuth secret environment variables');
}

const clientPromise = connectToDatabase().then(connection => connection.client);

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user }) {
      // Add custom fields to the session object
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).currency = (user as any).currency || 'USD'; // Default to USD
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

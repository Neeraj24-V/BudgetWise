
import NextAuth, { AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.NEXTAUTH_SECRET) {
    throw new Error('Missing Google OAuth or NextAuth secret environment variables. Please check your .env file.');
}

const clientPromise = connectToDatabase().then(conn => conn.client);

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database", // Use database strategy with an adapter
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login on error
  },
  callbacks: {
    async session({ session, user }) {
      // The user object here is the one from the database
      if (session.user && user) {
        (session.user as any).id = user.id;
        (session.user as any).currency = (user as any).currency; // Pass currency to session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

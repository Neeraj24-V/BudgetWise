import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectToDatabase } from '@/lib/mongodb';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.NEXTAUTH_SECRET) {
    throw new Error('Missing Google OAuth or NextAuth secret environment variables');
}

const authOptions = {
  // The adapter expects a promise that resolves to a MongoClient instance
  adapter: MongoDBAdapter(connectToDatabase().then(c => c.client)),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.sub; // Add user ID to the session object
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

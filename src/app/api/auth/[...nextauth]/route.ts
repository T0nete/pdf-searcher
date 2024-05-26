import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  }),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;

      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };

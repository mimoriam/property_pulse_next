import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      return true;
    },

    // Modifies the session object
    async session({ session }) {
      return session;
    },
  },
});

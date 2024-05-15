import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getUserByEmail } from '@/utils/getUser';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    // Invoked on successful signin
    signIn: async ({ profile }) => {
      await connectDB();
      // console.log(await User.find({}));

      // Check if user exists
      const userExists = await User.findOne({ email: profile.email });

      // If not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      return true;
    },

    // Modifies the session object
    async session({ token, session }) {
      if (token.id && session.user) {
        session.user.id = token.id.toString();
      }

      return session;
    },

    async jwt({ token }) {
      // If no token.sub, it means user is logged out
      if (!token.sub) return token;

      const existingUser = await getUserByEmail(token.email!.toString());

      if (!existingUser) return token;

      token.id = existingUser._id.toString();

      return token;
    },
  },
  ...authConfig,
});

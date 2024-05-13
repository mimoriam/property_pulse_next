import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import connectDB from '@/config/database';
import User from '@/models/User';

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
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });

      // Assign the user id to the session
      session.user.id = user._id.toString();

      return session;
    },
  },
  ...authConfig,
});

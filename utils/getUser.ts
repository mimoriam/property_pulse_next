import connectDB from '@/config/database';
import User from '@/models/User';

export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();

    const existingUser = await User.findOne({ email: email });

    return existingUser;
  } catch {
    return null;
  }
};

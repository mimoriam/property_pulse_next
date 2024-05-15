import { auth } from '@/auth';

export const getUserSession = async () => {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return null;
    }

    return { user: session.user };
  } catch (err) {
    console.error(err);
    return null;
  }
};

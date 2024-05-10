import connectDB from '@/config/database';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
  try {
    await connectDB();

    return NextResponse.json({ message: 'DB connected' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
};

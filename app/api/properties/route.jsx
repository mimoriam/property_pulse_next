import connectDB from '@/config/database';
import { NextResponse } from 'next/server';
import Property from '../../../models/Property';

export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return NextResponse.json({ properties }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
};

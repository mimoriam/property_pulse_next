import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextResponse } from 'next/server';

// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 },
      );
    }

    const properties = await Property.find({ owner: userId });
    1;

    return NextResponse.json(properties, { status: 200 });

    // return new Response(JSON.stringify(properties), {
    //   status: 200,
    // });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
};

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/properties/:id
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string | number } },
) => {
  try {
    await connectDB();

    const ObjectId = require('mongoose').Types.ObjectId;

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid property ID' },
        { status: 400 },
      );
    }

    const property = await Property.findById(params.id);

    if (!property)
      return NextResponse.json(
        { message: 'Property Not Found' },
        { status: 404 },
      );

    return NextResponse.json({ property }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
};

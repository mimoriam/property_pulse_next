import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/utils/getUserSession';

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

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getUserSession();

    // Check for session
    if (!sessionUser || !sessionUser.user.id) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 401 },
      );
    }

    const { id } = sessionUser.user;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property)
      return NextResponse.json(
        { message: 'Property Not Found' },
        { status: 404 },
      );

    // Verify ownership
    if (property.owner.toString() !== id) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    await property.deleteOne();

    return NextResponse.json(
      { message: 'Property Deleted' },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Something Went Wrong' },
      { status: 500 },
    );
  }
};

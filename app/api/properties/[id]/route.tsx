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

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getUserSession();

    if (!sessionUser || !sessionUser.user.id) {
      return new Response('User ID is required', { status: 401 });
    }

    const { id } = params;
    const { id: userId } = sessionUser.user;

    const formData = await request.formData();

    // Access all values from amenities
    const amenities = formData.getAll('amenities');

    // Get property to update
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response('Property does not exist', { status: 404 });
    }

    // Verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create propertyData object for database
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly.'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    // Update property in database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return NextResponse.json(updatedProperty, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Failed to add property' },
      { status: 500 },
    );
  }
};

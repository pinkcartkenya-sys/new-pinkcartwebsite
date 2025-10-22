import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching all categories...');
    
    // Simply get all categories from database
    const categories = await Database.getCategories();
    
    console.log('Categories found:', categories.length);

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would implement category creation logic
    return NextResponse.json({
      success: true,
      message: 'Category creation not implemented yet',
      data: body,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create category',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

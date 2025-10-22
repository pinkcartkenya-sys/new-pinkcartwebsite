import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract filters from query parameters
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');
    
    console.log('Fetching products with filters:', { categoryId, search, featured, active });
    
    // Build filters object
    const filters: any = {};
    
    if (categoryId && categoryId !== 'all') {
      filters.categoryId = categoryId;
    }
    
    if (search && search.trim() !== '') {
      filters.search = search.trim();
    }
    
    if (featured !== null) {
      filters.featured = featured === 'true';
    }
    
    if (active !== null) {
      filters.active = active === 'true';
    }
    
    // Get products with filters
    console.log('API - Filters being applied:', filters);
    const products = await Database.getProducts(filters);
    
    console.log('API - Products found:', products.length);
    console.log('API - First product:', products[0]?.name || 'No products');

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would implement product creation logic
    // For now, return a success response
    return NextResponse.json({
      success: true,
      message: 'Product creation not implemented yet',
      data: body,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

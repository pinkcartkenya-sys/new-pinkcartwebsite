import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Validate required fields
    if (!orderData.customerName || !orderData.customerPhone || !orderData.items) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: customerName, customerPhone, and items are required'
        },
        { status: 400 }
      );
    }

    // Get database connection
    const db = await getDatabase();
    const ordersCollection = db.collection('orders');

    // Add order metadata
    const order = {
      ...orderData,
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert order into database
    const result = await ordersCollection.insertOne(order);
    
    if (!result.insertedId) {
      throw new Error('Failed to save order to database');
    }

    // Return success response with order data
    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId.toString(),
        orderId: order.orderId,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        items: order.items,
        totalPrice: order.totalPrice,
        totalItems: order.totalItems,
        status: order.status,
        createdAt: order.createdAt
      },
      message: 'Order saved successfully'
    });

  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save order',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const ordersCollection = db.collection('orders');
    
    // Get all orders, sorted by creation date (newest first)
    const orders = await ordersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch orders',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

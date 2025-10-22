// Database schema definitions for Pinkcart

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  video?: string;
  hasVideo?: boolean;
  categoryId: string;
  category: string;
  joinedCount: number;
  maxParticipants?: number;
  isActive: boolean;
  featured: boolean;
  dimensions?: string;
  weight?: string;
  material?: string;
  quality?: string;
  shippingTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shipment {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'active' | 'closed' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
}

// Database connection interface
export interface DatabaseConfig {
  url: string;
  type: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
}

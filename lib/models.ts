import { getDatabase } from './mongodb';

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  video?: string;
  hasVideo?: boolean;
  categoryId?: string;
  category: string;
  joinedCount: number;
  maxParticipants?: number;
  isActive?: boolean;
  featured?: boolean;
  dimensions?: string;
  weight?: string;
  material?: string;
  quality?: string;
  shippingTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Additional fields from your database
  cloudinaryIds?: string[];
  features?: string[];
  inStock?: boolean;
  shippingEstimate?: string;
  __v?: number;
}

export interface Shipment {
  _id?: string;
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

export class Database {
  private static async getCollection(collectionName: string) {
    const db = await getDatabase();
    return db.collection(collectionName);
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    const collection = await this.getCollection('categories');
    return await collection.find({}).toArray();
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    const collection = await this.getCollection('categories');
    return await collection.findOne({ slug });
  }

  static async createCategory(category: Omit<Category, '_id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const collection = await this.getCollection('categories');
    const now = new Date();
    const newCategory = {
      ...category,
      createdAt: now,
      updatedAt: now,
    };
    const result = await collection.insertOne(newCategory);
    return { ...newCategory, _id: result.insertedId.toString() };
  }

  // Products
  static async getProducts(filters: {
    categoryId?: string;
    search?: string;
    featured?: boolean;
    active?: boolean;
    minPrice?: number;
    maxPrice?: number;
  } = {}): Promise<Product[]> {
    try {
      const collection = await this.getCollection('products');
      let query: any = {};

      if (filters.categoryId && filters.categoryId !== 'all') {
        // Map category slugs to actual category names for filtering
        const categoryNameMap: Record<string, string> = {
          'beauty-self-care-items': 'Beauty & Self Care Items',
          'shoes': 'Shoes',
          'bags': 'Bags',
          'accessories': 'Accessories',
          'organisers': 'Organisers',
          'journal': 'Journal',
          'cute-lighting': 'Cute Lighting'
        };
        
        const categoryName = categoryNameMap[filters.categoryId];
        console.log('Database - Filtering by categoryId:', filters.categoryId, '-> categoryName:', categoryName);
        if (categoryName) {
          query.category = categoryName;
        }
      }

      if (filters.search) {
        query.$or = [
          { name: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } }
        ];
      }

      if (filters.featured !== undefined) {
        query.featured = filters.featured;
      }

      if (filters.active !== undefined) {
        query.isActive = filters.active;
      }

      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query.price = {};
        if (filters.minPrice !== undefined) {
          query.price.$gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
          query.price.$lte = filters.maxPrice;
        }
        console.log('Database - Price filter applied:', query.price);
      }

      // Sort by createdAt in descending order (latest first)
      return await collection.find(query).sort({ createdAt: -1 }).toArray();
    } catch (error) {
      console.error('Database connection error:', error);
      // Return empty array if database is not connected
      return [];
    }
  }

  static async getProductById(id: string): Promise<Product | null> {
    const collection = await this.getCollection('products');
    return await collection.findOne({ _id: id });
  }

  static async createProduct(product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const collection = await this.getCollection('products');
    const now = new Date();
    const newProduct = {
      ...product,
      createdAt: now,
      updatedAt: now,
    };
    const result = await collection.insertOne(newProduct);
    return { ...newProduct, _id: result.insertedId.toString() };
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const collection = await this.getCollection('products');
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const collection = await this.getCollection('products');
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  // Shipments
  static async getShipments(): Promise<Shipment[]> {
    const collection = await this.getCollection('shipments');
    return await collection.find({}).toArray();
  }

  static async getActiveShipments(): Promise<Shipment[]> {
    const collection = await this.getCollection('shipments');
    return await collection.find({ status: 'active' }).toArray();
  }

  static async createShipment(shipment: Omit<Shipment, '_id' | 'createdAt' | 'updatedAt'>): Promise<Shipment> {
    const collection = await this.getCollection('shipments');
    const now = new Date();
    const newShipment = {
      ...shipment,
      createdAt: now,
      updatedAt: now,
    };
    const result = await collection.insertOne(newShipment);
    return { ...newShipment, _id: result.insertedId.toString() };
  }
}

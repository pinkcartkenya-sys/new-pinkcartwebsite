import { Database as MongoDatabase, Product, Category, Shipment } from './models';

// Re-export the Database class and types
export { Database, Product, Category, Shipment } from './models';

// Database functions using real MongoDB connection
export class Database {
  // Get all categories
  static async getCategories(): Promise<Category[]> {
    return await MongoDatabase.getCategories();
  }

  // Get category by slug
  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    return await MongoDatabase.getCategoryBySlug(slug);
  }

  // Get all products
  static async getProducts(filters: {
    categoryId?: string;
    search?: string;
    featured?: boolean;
    active?: boolean;
  } = {}): Promise<Product[]> {
    return await MongoDatabase.getProducts(filters);
  }

  // Get product by ID
  static async getProductById(id: string): Promise<Product | null> {
    return await MongoDatabase.getProductById(id);
  }

  // Get featured products
  static async getFeaturedProducts(): Promise<Product[]> {
    return await MongoDatabase.getProducts({ featured: true });
  }

  // Get active products
  static async getActiveProducts(): Promise<Product[]> {
    return await MongoDatabase.getProducts({ active: true });
  }

  // Search products
  static async searchProducts(query: string): Promise<Product[]> {
    return await MongoDatabase.getProducts({ search: query });
  }
}

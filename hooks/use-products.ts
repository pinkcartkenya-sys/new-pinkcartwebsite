import { useState, useEffect } from 'react';
import { Product, Category } from '@/lib/models';

interface UseProductsOptions {
  categoryId?: string;
  search?: string;
  featured?: boolean;
  active?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('useProducts - options received:', options);

      // Build query parameters
      const params = new URLSearchParams();
      
      if (options.categoryId) {
        params.append('categoryId', options.categoryId);
      }
      
      // Only add search parameter if there's actual text
      if (options.search && options.search.trim() !== '') {
        params.append('search', options.search.trim());
      }
      
      if (options.featured !== undefined) {
        params.append('featured', options.featured.toString());
      }
      
      if (options.active !== undefined) {
        params.append('active', options.active.toString());
      }

      // Fetch products with query parameters
      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      console.log('API Response:', data); // Debug log
      console.log('API Response data:', data.data); // Debug log - show actual data
      console.log('Query params:', params.toString()); // Debug log - show what we're querying

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch products');
      }

      console.log('Products received:', data.data.length); // Debug log
      setProducts(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [options.categoryId, options.search, options.featured, options.active]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch product');
        }

        setProduct(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simply fetch all categories from the API
        const response = await fetch('/api/categories');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch categories');
        }

        setCategories(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock?: number;
  brand?: string;
  sku?: string;
  thumbnail?: string;
  description?: string;
  images?: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

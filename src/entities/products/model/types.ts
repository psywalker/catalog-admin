export type NewProductPayload = {
  id?: number;
  title: string;
  category?: string;
  price: number;
  rating: number;
  brand?: string;
  sku?: string;
  thumbnail?: string;
};

export type BuildFetchProductsParamsArgs = {
  limit: number;
  page?: number;
  q: string;
};

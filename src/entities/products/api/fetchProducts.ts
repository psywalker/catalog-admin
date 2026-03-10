import type { ProductsResponse } from './types';

export type FetchProductsParams = {
  limit: number;
  skip: number;
  q?: string;
};

export async function fetchProducts(params: FetchProductsParams): Promise<ProductsResponse> {
  const { limit, skip, q } = params;

  const base = q?.trim()
    ? 'https://dummyjson.com/products/search'
    : 'https://dummyjson.com/products';

  const url = new URL(base);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('skip', String(skip));
  if (q?.trim()) url.searchParams.set('q', q.trim());

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch products (${res.status}): ${text || res.statusText}`);
  }

  return res.json();
}

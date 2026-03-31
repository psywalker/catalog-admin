import type { FetchProductsParams, ProductsResponse } from './types';
import { getProductsErrorMessage, parseProductsResponse } from './lib/parseProductsResponse';

export async function fetchProducts(params: FetchProductsParams): Promise<ProductsResponse> {
  const { limit, skip, q } = params;

  const base = q?.trim()
    ? 'https://dummyjson.com/products/search'
    : 'https://dummyjson.com/products';

  const url = new URL(base);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('skip', String(skip));

  if (q?.trim()) {
    url.searchParams.set('q', q.trim());
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const fallback = res.statusText || `HTTP ${res.status}`;
    throw new Error(
      `Failed to fetch products (${res.status}): ${getProductsErrorMessage(data, fallback)}`,
    );
  }

  return parseProductsResponse(data);
}

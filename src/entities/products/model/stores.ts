import { createEffect, createEvent, createStore, combine } from 'effector';
import type { Product } from '../api/types';

export const pageChanged = createEvent<number>();
export const searchInputChanged = createEvent<string>();
export const searchCommitted = createEvent<string>();
export const refreshRequested = createEvent();

export type NewProductPayload = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  brand?: string;
  sku?: string;
  thumbnail?: string;
};

export const addProductFx = createEffect<NewProductPayload, NewProductPayload>(async (p) => {
  await new Promise((r) => setTimeout(r, 500));
  return p;
});

export const $isAdding = addProductFx.pending;
export const productAdded = createEvent<NewProductPayload>();
export const initialLoadStarted = createEvent();
export const $isGateLoaded = createStore(false).on(initialLoadStarted, () => true);
export const $limit = createStore(20);
export const $page = createStore(1).on(pageChanged, (_, page) => page);
export const $searchInput = createStore('').on(searchInputChanged, (_, v) => v);
export const $query = createStore('');
export const $apiProducts = createStore<Product[]>([]);
export const $apiTotal = createStore(0);
export const $localAdded = createStore<Product[]>([]).on(productAdded, (list, p) => {
  const localProduct: Product = {
    id: p.id ?? Date.now(),
    title: p.title,
    brand: p.brand,
    sku: p.sku,
    price: p.price,
    rating: p.rating,
    category: p.category ?? 'No category',
    thumbnail: p.thumbnail ?? '',
  };

  return [localProduct, ...list];
});
export const $products = combine(
  $apiProducts,
  $localAdded,
  $query,
  $page,
  $limit,
  (api, local, q, page, limit) => {
    const hasSearch = q.trim().length > 0;

    if (!hasSearch && page === 1 && local.length) {
      return [...local, ...api].slice(0, limit);
    }
    return api;
  },
);
export const $total = combine($apiTotal, $localAdded, $query, (apiTotal, local, q) => {
  const hasSearch = q.trim().length > 0;
  return hasSearch ? apiTotal : apiTotal + local.length;
});
export const $isLoading = createStore(false);
export const $isLoaded = createStore(false);
export const $error = createStore<Error | null>(null);

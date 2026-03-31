import { createEffect, createEvent, createStore, combine } from 'effector';

import type { Product } from '../api/types';
import { mapNewProductPayloadToProduct } from '../lib/mapNewProductPayloadToProduct';
import type { NewProductPayload } from './types';
import { fetchProductsFx } from './effects';

export const pageChanged = createEvent<number>();
export const searchInputChanged = createEvent<string>();
export const searchCommitted = createEvent<string>();
export const refreshRequested = createEvent();

export const queryChanged = createEvent<string>();
export const apiProductsReceived = createEvent<Product[]>();
export const apiTotalReceived = createEvent<number>();

export const addProductFx = createEffect<NewProductPayload, NewProductPayload>(async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return payload;
});

export const $isAdding = addProductFx.pending;
export const productAdded = createEvent<NewProductPayload>();
export const initialLoadStarted = createEvent();

export const $isGateLoaded = createStore(false).on(initialLoadStarted, () => true);
export const $limit = createStore(20);
export const $page = createStore(1).on(pageChanged, (_, page) => page);
export const $searchInput = createStore('').on(searchInputChanged, (_, value) => value);
export const $query = createStore('').on(queryChanged, (_, value) => value);
export const $apiProducts = createStore<Product[]>([]).on(
  apiProductsReceived,
  (_, products) => products,
);
export const $apiTotal = createStore(0).on(apiTotalReceived, (_, total) => total);

export const $localAdded = createStore<Product[]>([]).on(productAdded, (list, payload) => {
  return [mapNewProductPayloadToProduct(payload), ...list];
});

export const $products = combine(
  $apiProducts,
  $localAdded,
  $query,
  $page,
  $limit,
  (apiProducts, localAdded, query, page, limit) => {
    const hasSearch = query.trim().length > 0;

    if (!hasSearch && page === 1 && localAdded.length) {
      return [...localAdded, ...apiProducts].slice(0, limit);
    }

    return apiProducts;
  },
);

export const $total = combine($apiTotal, $localAdded, $query, (apiTotal, localAdded, query) => {
  const hasSearch = query.trim().length > 0;
  return hasSearch ? apiTotal : apiTotal + localAdded.length;
});

export const $isLoading = createStore(false).on(fetchProductsFx.pending, (_, pending) => pending);
export const $isLoaded = createStore(false).on(fetchProductsFx.doneData, () => true);

export const $error = createStore<Error | null>(null)
  .on(fetchProductsFx.failData, (_, error) => error)
  .reset(fetchProductsFx, fetchProductsFx.doneData);

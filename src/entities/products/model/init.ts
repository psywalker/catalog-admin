import { sample } from 'effector';
import { debounce } from 'patronum/debounce';
import { delay } from 'patronum/delay';

import { fetchProductsFx } from './effects';
import { ProductsPageGate } from './gates';
import {
  $limit,
  $page,
  $query,
  $apiProducts,
  $apiTotal,
  $error,
  $isGateLoaded,
  $isLoading,
  initialLoadStarted,
  pageChanged,
  refreshRequested,
  searchInputChanged,
  searchCommitted,
  productAdded,
  addProductFx,
} from './stores';

const debouncedSearch = debounce({
  source: searchInputChanged,
  timeout: 400,
});

sample({
  clock: debouncedSearch,
  fn: (q) => q.trim(),
  target: searchCommitted,
});

const delayedOpen = delay({
  source: ProductsPageGate.open,
  timeout: 300,
});

sample({
  clock: delayedOpen,
  source: $isGateLoaded,
  filter: (loaded) => !loaded,
  target: initialLoadStarted,
});

sample({
  clock: initialLoadStarted,
  source: { limit: $limit, q: $query },
  fn: ({ limit, q }) => ({
    limit,
    skip: 0,
    q: q.trim() ? q : undefined,
  }),
  target: fetchProductsFx,
});

sample({
  clock: searchCommitted,
  source: { limit: $limit },
  fn: ({ limit }, q) => ({
    limit,
    skip: 0,
    q: q ? q : undefined,
  }),
  target: fetchProductsFx,
});

sample({
  clock: searchCommitted,
  fn: () => 1,
  target: pageChanged,
});

sample({
  clock: searchCommitted,
  target: $query,
});

sample({
  clock: [pageChanged, refreshRequested],
  source: { limit: $limit, page: $page, q: $query },
  fn: ({ limit, page, q }) => ({
    limit,
    skip: (page - 1) * limit,
    q: q.trim() ? q : undefined,
  }),
  target: fetchProductsFx,
});

sample({
  clock: addProductFx.doneData,
  target: productAdded,
});

sample({
  clock: addProductFx.doneData,
  fn: () => 1,
  target: pageChanged,
});

sample({
  clock: fetchProductsFx.doneData,
  fn: (res) => res.products,
  target: $apiProducts,
});

sample({
  clock: fetchProductsFx.doneData,
  fn: (res) => res.total,
  target: $apiTotal,
});

sample({
  clock: fetchProductsFx.failData,
  fn: (err) => err,
  target: $error,
});

$isLoading.on(fetchProductsFx.pending, (_, pending) => pending);

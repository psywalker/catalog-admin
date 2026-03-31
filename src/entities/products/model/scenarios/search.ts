import { sample } from 'effector';
import { debounce } from 'patronum/debounce';

import { fetchProductsFx } from '../effects';
import { buildFetchProductsParams } from '../lib/buildFetchProductsParams';
import {
  $limit,
  $page,
  $query,
  pageChanged,
  queryChanged,
  searchCommitted,
  searchInputChanged,
} from '../stores';

const debouncedSearch = debounce({
  source: searchInputChanged,
  timeout: 400,
});

sample({
  clock: debouncedSearch,
  fn: (query) => query.trim(),
  target: searchCommitted,
});

sample({
  clock: searchCommitted,
  target: queryChanged,
});

sample({
  clock: $query.updates,
  source: $page,
  filter: (page) => page !== 1,
  fn: () => 1,
  target: pageChanged,
});

sample({
  clock: $query.updates,
  source: { limit: $limit, page: $page },
  filter: ({ page }) => page === 1,
  fn: ({ limit }, q) =>
    buildFetchProductsParams({
      limit,
      q,
    }),
  target: fetchProductsFx,
});

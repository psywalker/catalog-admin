import { sample } from 'effector';

import { fetchProductsFx } from '../effects';
import { buildFetchProductsParams } from '../lib/buildFetchProductsParams';
import { $limit, $page, $query, refreshRequested } from '../stores';

sample({
  clock: refreshRequested,
  source: { limit: $limit, page: $page, q: $query },
  fn: ({ limit, page, q }) =>
    buildFetchProductsParams({
      limit,
      page,
      q,
    }),
  target: fetchProductsFx,
});

import { sample } from 'effector';

import { fetchProductsFx } from '../effects';
import { buildFetchProductsParams } from '../lib/buildFetchProductsParams';
import { $limit, $page, $query, pageChanged } from '../stores';

sample({
  clock: pageChanged,
  source: { limit: $limit, page: $page, q: $query },
  fn: ({ limit, page, q }) =>
    buildFetchProductsParams({
      limit,
      page,
      q,
    }),
  target: fetchProductsFx,
});

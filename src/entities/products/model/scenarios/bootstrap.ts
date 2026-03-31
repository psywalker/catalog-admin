import { sample } from 'effector';
import { delay } from 'patronum/delay';

import { ProductsPageGate } from '../gates';
import { fetchProductsFx } from '../effects';
import { buildFetchProductsParams } from '../lib/buildFetchProductsParams';
import { $isGateLoaded, $limit, $query, initialLoadStarted } from '../stores';

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
  fn: ({ limit, q }) =>
    buildFetchProductsParams({
      limit,
      q,
    }),
  target: fetchProductsFx,
});

import { sample } from 'effector';

import { fetchProductsFx } from '../effects';
import { apiProductsReceived, apiTotalReceived } from '../stores';

sample({
  clock: fetchProductsFx.doneData,
  fn: (response) => response.products,
  target: apiProductsReceived,
});

sample({
  clock: fetchProductsFx.doneData,
  fn: (response) => response.total,
  target: apiTotalReceived,
});

import { sample } from 'effector';

import { addProductFx, pageChanged, productAdded } from '../stores';

sample({
  clock: addProductFx.doneData,
  target: productAdded,
});

sample({
  clock: addProductFx.doneData,
  fn: () => 1,
  target: pageChanged,
});

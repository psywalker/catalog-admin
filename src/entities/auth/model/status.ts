import { combine, sample } from 'effector';
import { status } from 'patronum/status';
import { loginFx } from './effects';
import { $error, $isLoaded, $isLoading } from './stores';

export const $effectsStatus = combine(
  status({ effect: loginFx }),
  (...args: ('initial' | 'pending' | 'done' | 'fail')[]) => args,
);

sample({
  clock: $effectsStatus.updates,
  fn: (statuses) => statuses.some((s) => s === 'pending'),
  target: $isLoading,
});

sample({
  clock: $effectsStatus.updates,
  fn: (statuses) => statuses.every((s) => s === 'done' || s === 'initial'),
  target: $isLoaded,
});

sample({
  clock: $effectsStatus.updates,
  fn: (statuses) => (statuses.some((s) => s === 'fail') ? new Error('Auth request failed') : null),
  target: $error,
});

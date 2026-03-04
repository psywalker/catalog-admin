import { sample } from 'effector';
import { loginFx, persistTokenFx, clearTokenFx } from './effects';
import { $token, $error, logout } from './stores';

sample({
  clock: loginFx.doneData,
  fn: (res) => res.accessToken,
  target: $token,
});

sample({
  clock: loginFx.done,
  fn: ({ params, result }) => ({ token: result.accessToken, remember: params.remember }),
  target: persistTokenFx,
});

sample({
  clock: loginFx.failData,
  fn: (err) => err,
  target: $error,
});

sample({
  clock: logout,
  target: clearTokenFx,
});

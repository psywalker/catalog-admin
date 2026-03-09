import { sample } from 'effector';
import { loginFx, saveTokenFx, clearTokenFx } from './effects';
import { $token, logout } from './stores';

const pickToken = (res: { token?: string; accessToken?: string }) =>
  res.accessToken ?? res.token ?? null;

sample({
  clock: loginFx.done,
  fn: ({ params, result }) => {
    const token = pickToken(result);
    if (!token) throw new Error('Token is missing in login response');
    return { token, remember: params.remember };
  },
  target: saveTokenFx,
});

sample({
  clock: loginFx.doneData,
  fn: (res) => pickToken(res),
  target: $token,
});

sample({
  clock: logout,
  target: clearTokenFx,
});

sample({
  clock: clearTokenFx.done,
  fn: () => null,
  target: $token,
});

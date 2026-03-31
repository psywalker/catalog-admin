import { sample } from 'effector';

import { pickToken } from '../lib/pickToken';
import { loginFx, saveTokenFx, clearTokenFx } from './effects';
import { $token, logout } from './stores';

sample({
  clock: loginFx.done,
  fn: ({ params, result }) => {
    const token = pickToken(result);

    if (!token) {
      throw new Error('Token is missing in login response');
    }

    return { token, remember: params.remember };
  },
  target: saveTokenFx,
});

sample({
  clock: loginFx.doneData,
  fn: (result) => pickToken(result),
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

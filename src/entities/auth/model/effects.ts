import { createEffect } from 'effector';
import { fetchLogin } from '../api/fetchLogin';
import { setToken, clearToken } from '@/shared/lib/storage';

export const loginFx = createEffect(fetchLogin);

export const saveTokenFx = createEffect(
  async ({ token, remember }: { token: string; remember: boolean }) => {
    setToken(token, remember);
  },
);

export const clearTokenFx = createEffect(async () => {
  clearToken();
});

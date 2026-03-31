import { createEffect } from 'effector';

import { fetchLogin, type LoginResponse } from '../api';
import type { LoginCommand } from './types';
import { clearToken, setToken } from '@/shared/lib/storage';

export const loginFx = createEffect<LoginCommand, LoginResponse>(async ({ username, password }) => {
  return fetchLogin({ username, password });
});

export const saveTokenFx = createEffect(
  async ({ token, remember }: { token: string; remember: boolean }) => {
    setToken(token, remember);
  },
);

export const clearTokenFx = createEffect(async () => {
  clearToken();
});

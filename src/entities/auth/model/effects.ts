import { createEffect } from 'effector';
import { login } from '../api/login';
import type { LoginApiResponse } from '../api/types';
import { setToken, clearToken } from '@/shared/lib/storage';

export type LoginParams = {
  username: string;
  password: string;
  remember: boolean;
};

export const loginFx = createEffect<LoginParams, LoginApiResponse, Error>(
  async ({ username, password }) => {
    return login({ username, password });
  },
);

export const persistTokenFx = createEffect<{ token: string; remember: boolean }, void>(
  ({ token, remember }) => {
    setToken(token, remember);
  },
);

export const clearTokenFx = createEffect<void, void>(() => {
  clearToken();
});

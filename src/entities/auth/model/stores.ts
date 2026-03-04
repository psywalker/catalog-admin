import { createEvent, createStore } from 'effector';
import { getToken } from '@/shared/lib/storage';
import { loginFx } from './effects';

export const logout = createEvent();

export const $token = createStore<string | null>(getToken())
  .on(loginFx.doneData, (_, res) => res.accessToken)
  .on(logout, () => null);

export const $isAuth = $token.map(Boolean);

export const $isLoading = createStore(false);
export const $isLoaded = createStore(false);
export const $error = createStore<Error | null>(null);

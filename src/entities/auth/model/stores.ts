import { createEvent, createStore } from 'effector';
import { getToken } from '@/shared/lib/storage';

export const logout = createEvent();

export const $token = createStore<string | null>(getToken());

export const $isAuth = $token.map((t) => Boolean(t));

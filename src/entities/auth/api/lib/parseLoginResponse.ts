import type { LoginResponse } from '../types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const getLoginErrorMessage = (value: unknown, fallback: string): string => {
  if (isRecord(value) && typeof value.message === 'string') {
    return value.message;
  }

  return fallback;
};

export const parseLoginResponse = (value: unknown): LoginResponse => {
  if (!isRecord(value)) {
    throw new Error('Invalid login response: root value must be an object');
  }

  const hasToken = typeof value.accessToken === 'string' || typeof value.token === 'string';

  if (!hasToken) {
    throw new Error('Invalid login response: token field is missing');
  }

  return {
    accessToken: typeof value.accessToken === 'string' ? value.accessToken : undefined,
    token: typeof value.token === 'string' ? value.token : undefined,
    refreshToken: typeof value.refreshToken === 'string' ? value.refreshToken : undefined,
    id: typeof value.id === 'number' ? value.id : undefined,
    username: typeof value.username === 'string' ? value.username : undefined,
  };
};

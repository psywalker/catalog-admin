import type { LoginApiRequest, LoginApiResponse } from './types';

export const login = async (payload: LoginApiRequest): Promise<LoginApiResponse> => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = typeof data?.message === 'string' ? data.message : 'Login failed';
    throw new Error(message);
  }

  return data as LoginApiResponse;
};

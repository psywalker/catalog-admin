import type { LoginParams, LoginResponse } from './types';

export async function fetchLogin(params: LoginParams): Promise<LoginResponse> {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: params.username,
      password: params.password,
    }),
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      msg = data?.message || msg;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }

  return (await res.json()) as LoginResponse;
}

import type { LoginRequest, LoginResponse } from './types';
import { getLoginErrorMessage, parseLoginResponse } from './lib/parseLoginResponse';

export async function fetchLogin(params: LoginRequest): Promise<LoginResponse> {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: params.username,
      password: params.password,
    }),
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(getLoginErrorMessage(data, `HTTP ${res.status}`));
  }

  return parseLoginResponse(data);
}

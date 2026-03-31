import type { LoginResponse } from '../api/types';

export const pickToken = (response: LoginResponse): string | null => {
  return response.accessToken ?? response.token ?? null;
};

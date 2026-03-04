const TOKEN_KEY = 'auth_token';
const REMEMBER_KEY = 'auth_remember';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, remember: boolean) {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);

  localStorage.setItem(REMEMBER_KEY, remember ? '1' : '0');
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
}

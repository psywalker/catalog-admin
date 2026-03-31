export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  id?: number;
  username?: string;
};

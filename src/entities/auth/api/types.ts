export type LoginParams = {
  username: string;
  password: string;
  remember: boolean;
};

export type LoginResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  id?: number;
  username?: string;
};

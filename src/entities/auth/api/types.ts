export type LoginApiRequest = {
  username: string;
  password: string;
};

export type LoginApiResponse = {
  id: number;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

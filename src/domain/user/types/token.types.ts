export type RequestToken = {
  authCode: string;
  redirectUrl: string;
};

export type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

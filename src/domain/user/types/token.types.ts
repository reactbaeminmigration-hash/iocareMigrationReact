export interface RequestToken {
  authCode: string;
  redirectUrl: string;
}

export interface ResponseToken {
  accessToken: string;
  refreshToken: string;
}

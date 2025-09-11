export interface RequestToken {
  authCode: string;
  redirectUrl: string;
}

export interface ResponseToken {
  accessToken: string;
  refreshToken: string;
}

export interface RequestRefreshToken {
  accessToken: string;
  refreshToken: string;
}

export interface ResponseRefreshToken {
  accessToken: string;
}

export interface RequestPostLogout {
  deviceUUID: string;
  type: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface ResponsePostLogout {}

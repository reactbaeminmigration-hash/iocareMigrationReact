import { getRefreshToken } from '@/domain/user/api';
import { useUserStore } from '@/domain/user/stores/useUserStore';
import axios from 'axios';
import { decodeToken } from '../auth/utils/jwtDecode';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshApiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken, setAuthTokens, resetUser } =
      useUserStore.getState();
    try {
      if (!accessToken || !refreshToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        setAuthTokens({ accessToken: accessToken });
        return config;
      }

      const { exp } = decodeToken(accessToken);
      const currentTime = Date.now() / 1000;
      const isTokenExpired = exp! < currentTime;

      if (isTokenExpired) {
        try {
          const { accessToken: newAccessToken } = await getRefreshToken({
            accessToken,
            refreshToken,
          });
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          setAuthTokens({ accessToken: newAccessToken });
        } catch (refreshError) {
          resetUser();
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      resetUser();
      window.location.href = '/';
      return Promise.reject(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

refreshApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { resetUser } = useUserStore.getState();
    resetUser();
    window.location.href = '/';
    return Promise.reject(error);
  },
);

export { axiosInstance, refreshApiClient };

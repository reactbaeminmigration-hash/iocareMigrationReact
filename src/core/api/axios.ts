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
    const { accessToken, refreshToken, setAuthTokens } =
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
          // logout();
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      // logout();
      window.location.href = '/';
      return Promise.reject(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401 || error.response?.status === 400) {
//       const { logout } = useUserStore.getState();
//       logout();
//       // window.location.href = '/';
//     }
//     return Promise.reject(error);
//   },
// );

export { axiosInstance, refreshApiClient };

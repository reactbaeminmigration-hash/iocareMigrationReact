import axiosInstance from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import type { RequestToken, ResponseToken } from '../types/token.types';

const getToken = async ({
  authCode,
  redirectUrl,
}: RequestToken): Promise<ResponseToken> => {
  const { data } = await axiosInstance.post<ApiResponse<ResponseToken>>(
    '/v1/com/token',
    {
      authCode,
      redirectUrl,
    },
  );

  return data.data;
};

export { getToken };

import axiosInstance from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import buildGenericQueryString from '@/shared/utils/queryString';
import type {
  RequestAppSetting,
  ResponseAppSetting,
} from '../types/appSetting.types';
import type {
  RequestDeviceInfos,
  ResponseDeviceInfos,
} from '../types/deviceInfos.types';
import type { RequestLogin, ResponseLogin } from '../types/login.types';
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

const postLogin = async (params: RequestLogin): Promise<ResponseLogin> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseLogin>>(
    `/v1/com/login-info?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

const getAppSetting = async (
  params: RequestAppSetting,
): Promise<ResponseAppSetting> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseAppSetting>>(
    `/v1/com/app-setting?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

const getDeviceInfos = async (
  params: RequestDeviceInfos,
): Promise<ResponseDeviceInfos> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseDeviceInfos>>(
    `/v1/com/user-devices?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

export { getAppSetting, getDeviceInfos, getToken, postLogin };

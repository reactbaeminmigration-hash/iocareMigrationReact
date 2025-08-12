import axiosInstance from '@/core/api/axios';
import type {
  RequestDeviceInfos,
  ResponseDeviceInfos,
} from '@/domain/user/types/deviceInfos.types';
import type { ApiResponse } from '@/shared/types/common';
import buildGenericQueryString from '@/shared/utils/queryString';

const getDeviceInfos = async (
  params: RequestDeviceInfos,
): Promise<ResponseDeviceInfos> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseDeviceInfos>>(
    `/v1/com/user-devices?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

export { getDeviceInfos };

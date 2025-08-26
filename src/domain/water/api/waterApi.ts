import axiosInstance from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import buildGenericQueryString from '@/shared/utils/queryString';
import type {
  RequestWaterHome,
  ResponseWaterHome,
} from '../types/waterHome.types';

const getWaterHomeInfos = async (
  params: RequestWaterHome,
): Promise<ResponseWaterHome> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseWaterHome>>(
    `/v1/water/home?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

export { getWaterHomeInfos };

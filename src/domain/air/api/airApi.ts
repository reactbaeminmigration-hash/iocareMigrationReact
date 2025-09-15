import { axiosInstance } from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import buildGenericQueryString from '@/shared/utils/queryString';
import type {
  RequestAirDeviceHome,
  ResponseAirDeviceHome,
} from '../types/airDeviceHome.types';

// AirHome 조회
const getAirDeviceHome = async (
  params: RequestAirDeviceHome,
): Promise<ResponseAirDeviceHome> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseAirDeviceHome>>(
    `/v1/air/devices/${params.barcode}/home?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

export { getAirDeviceHome };

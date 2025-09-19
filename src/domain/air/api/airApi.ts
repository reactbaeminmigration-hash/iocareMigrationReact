import { axiosInstance } from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import buildGenericQueryString from '@/shared/utils/queryString';
import type {
  RequestAirDeviceHome,
  ResponseAirDeviceHome,
} from '../types/airDeviceHome.types';
import type {
  RequestAirIaqDetail,
  ResponseAirIaqDetail,
} from '../types/airIaqDetail.types';

// AirHome 조회
const getAirDeviceHome = async (
  params: RequestAirDeviceHome,
): Promise<ResponseAirDeviceHome> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseAirDeviceHome>>(
    `/v1/air/devices/${params.barcode}/home?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

// AirIapDetail 조회
const getAirIaqDetail = async (
  params: RequestAirIaqDetail,
): Promise<ResponseAirIaqDetail> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseAirIaqDetail>>(
    `/v1/air/devices/${params.serNr}/iaq-detail?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

export { getAirDeviceHome, getAirIaqDetail };

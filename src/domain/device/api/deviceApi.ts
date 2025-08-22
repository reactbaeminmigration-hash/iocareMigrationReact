import axiosInstance from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import buildGenericQueryString from '@/shared/utils/queryString';
import type {
  RequestDeviceInfos,
  ResponseDeviceInfos,
} from '../types/deviceInfos.types';
import type {
  RequestLatestUpdated,
  ResponseLatestUpdated,
} from '../types/latestUpdate.types';
import type {
  RequestProdStandInfo,
  ResponseProdStandInfo,
} from '../types/prodStandInfo.types';
import type {
  RequestDeviceConn,
  ResponseDeviceConn,
} from '../types/deviceConn.types';

// DeviceInfos 조회
const getDeviceInfos = async (
  params: RequestDeviceInfos,
): Promise<ResponseDeviceInfos> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseDeviceInfos>>(
    `/v1/com/user-devices?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

// 기준정보 마지막 업데이트 일자 조회
const getLatestUpdated = async (
  params: RequestLatestUpdated,
): Promise<ResponseLatestUpdated> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseLatestUpdated>>(
    `/v1/com/dev-code-updated-time?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

// 기준정보 마지막 업데이트 일자 조회
const getProdStandInfo = async (
  params: RequestProdStandInfo,
): Promise<ResponseProdStandInfo> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseProdStandInfo>>(
    `/v1/com/dev-code-list?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

// 제품 연결 조회
const getDeviceConnection = async (
  params: RequestDeviceConn,
): Promise<ResponseDeviceConn> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseDeviceConn>>(
    `/v1/com/devices-conn?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

export {
  getDeviceInfos,
  getLatestUpdated,
  getProdStandInfo,
  getDeviceConnection,
};

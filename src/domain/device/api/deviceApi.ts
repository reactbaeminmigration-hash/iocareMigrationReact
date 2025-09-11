import { axiosInstance } from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import buildGenericQueryString from '@/shared/utils/queryString';
import type {
  RequestDeviceConn,
  ResponseDeviceConn,
} from '../types/deviceConn.types';
import type {
  RequestDeviceInfos,
  ResponseDeviceInfos,
} from '../types/deviceInfos.types';
import type {
  RequestLatestUpdated,
  ResponseLatestUpdated,
} from '../types/latestUpdate.types';
import type {
  RequestOtaStatus,
  ResponseOtaStatus,
} from '../types/otaStatus.types';
import type {
  RequestProdStandInfo,
  ResponseProdStandInfo,
} from '../types/prodStandInfo.types';

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

// 디바이스 연결 정보 조회
const getDeviceConn = async (
  params: RequestDeviceConn,
): Promise<ResponseDeviceConn> => {
  let strArr = [];
  for (let item of params.deviceList) {
    strArr.push(item.devIds);
  }
  const { data } = await axiosInstance.get<ApiResponse<ResponseDeviceConn>>(
    `/v1/com/devices-conn?devIds=${strArr}`,
  );
  return data.data;
};

// OTA 연결 정보 조회
const getOtaStatus = async (
  params: RequestOtaStatus,
): Promise<ResponseOtaStatus> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseOtaStatus>>(
    `/v1/com/ota?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

export {
  getDeviceConn,
  getDeviceInfos,
  getLatestUpdated,
  getOtaStatus,
  getProdStandInfo,
};

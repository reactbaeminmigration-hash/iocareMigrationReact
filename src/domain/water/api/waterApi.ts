import { axiosInstance } from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import buildGenericQueryString from '@/shared/utils/queryString';
import type {
  RequestWaterHome,
  ResponseWaterHome,
} from '../types/waterHome.types';
import type {
  RequestWaterReportPublished,
  ResponseWaterReportPublished,
} from '../types/waterReportPublished.types';
import type {
  RequestWaterReport,
  ResponseWaterReport,
} from '../types/waterReport.types';
import type {
  RequestWaterDailyAmt,
  ResponseWaterDailyAmt,
} from '../types/waterDailyAmt.types';
import type {
  RequestWaterMonthAmt,
  ResponseWaterMonthAmt,
} from '../types/waterMonthAmt.types';
import type {
  RequestWaterControlStatus,
  ResponseWaterControlStatus,
} from '../types/waterControlStatus.types';
import type {
  RequestWaterControl,
  ResponseWaterControl,
} from '../types/waterControl.types';

const getWaterHomeInfos = async (
  params: RequestWaterHome,
): Promise<ResponseWaterHome> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseWaterHome>>(
    `/v1/water/home?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

const getWaterReportPublished = async (
  params: RequestWaterReportPublished,
): Promise<ResponseWaterReportPublished> => {
  const { data } = await axiosInstance.get<
    ApiResponse<ResponseWaterReportPublished>
  >(`/v1/water/report-published?${buildGenericQueryString(params)}`);
  return data.data;
};

const getWaterReport = async (
  params: RequestWaterReport,
): Promise<ResponseWaterReport> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseWaterReport>>(
    `/v1/water/report?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

const getWaterDailyAmt = async (
  params: RequestWaterDailyAmt,
): Promise<ResponseWaterDailyAmt> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseWaterDailyAmt>>(
    `/v1/water/daily-amt?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

const getWaterMonthAmt = async (
  params: RequestWaterMonthAmt,
): Promise<ResponseWaterMonthAmt> => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseWaterMonthAmt>>(
    `/v1/water/monthly-amt?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

const getWaterControlStatus = async (
  params: RequestWaterControlStatus,
): Promise<ResponseWaterControlStatus> => {
  const { data } = await axiosInstance.get<
    ApiResponse<ResponseWaterControlStatus>
  >(
    `/v1/com/devices/${params.devId}/control?${buildGenericQueryString(params)}`,
  );
  return data.data;
};

const getWaterControl = async (
  params: RequestWaterControl,
): Promise<ResponseWaterControl> => {
  const { data } = await axiosInstance.post<ApiResponse<ResponseWaterControl>>(
    '/v1/com/control-device',
    params,
  );
  return data.data;
};

export {
  getWaterHomeInfos,
  getWaterReportPublished,
  getWaterReport,
  getWaterDailyAmt,
  getWaterMonthAmt,
  getWaterControlStatus,
  getWaterControl,
};

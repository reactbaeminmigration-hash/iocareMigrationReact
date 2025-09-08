import axiosInstance from '@/core/api/axios';
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

export { getWaterHomeInfos, getWaterReportPublished, getWaterReport };

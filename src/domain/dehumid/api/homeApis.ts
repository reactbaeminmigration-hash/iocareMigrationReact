import axiosInstance from '@/core/api/axios';
import type { ApiResponse } from '@/shared/types/common';
import type {
  RequestDehumidHome,
  ResponseDehumidHome,
} from '../types/deHumidHome.types';

const getDehumidHomeData = async (params: RequestDehumidHome) => {
  const { data } = await axiosInstance.get<ApiResponse<ResponseDehumidHome>>(
    `/v1/air/devices/${params}/home`,
  );
  return data.data;
};

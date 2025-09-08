import type {
  ResponseError,
  UseQueryCustomOptions,
} from '@/shared/types/common';
import type {
  RequestWaterReport,
  ResponseWaterReport,
} from '../types/waterReport.types';
import { useQuery } from '@tanstack/react-query';
import { getWaterReport } from '../api/waterApi';
import { queryKeys } from '../constants/queryKey';

function useGetWaterTotalReport(
  params: RequestWaterReport,
  queryOptions?: UseQueryCustomOptions<ResponseWaterReport>,
) {
  return useQuery<ResponseWaterReport, ResponseError>({
    queryKey: [queryKeys.WATER, queryKeys.GET_WATER_REPORT_PUBLISHED, params],
    queryFn: () => getWaterReport(params),
    ...queryOptions,
  });
}

export default useGetWaterTotalReport;

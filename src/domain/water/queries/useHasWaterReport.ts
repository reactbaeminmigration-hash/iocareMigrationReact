import type {
  ResponseError,
  UseQueryCustomOptions,
} from '@/shared/types/common';
import type {
  RequestWaterReportPublished,
  ResponseWaterReportPublished,
} from '../types/waterReportPublished.types';
import { useQuery } from '@tanstack/react-query';
import { getWaterReportPublished } from '../api/waterApi';
import { queryKeys } from '../constants/queryKey';

function useHasWaterReport(
  params: RequestWaterReportPublished,
  queryOptions?: UseQueryCustomOptions<ResponseWaterReportPublished>,
) {
  return useQuery<ResponseWaterReportPublished, ResponseError>({
    queryKey: [queryKeys.WATER, queryKeys.GET_WATER_REPORT_PUBLISHED, params],
    queryFn: () => getWaterReportPublished(params),
    ...queryOptions,
  });
}

export default useHasWaterReport;

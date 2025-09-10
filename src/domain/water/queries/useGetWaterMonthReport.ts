import type {
  ResponseError,
  UseQueryCustomOptions,
} from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getWaterMonthAmt } from '../api/waterApi';
import { queryKeys } from '../constants/queryKey';
import type {
  RequestWaterMonthAmt,
  ResponseWaterMonthAmt,
} from '../types/waterMonthAmt.types';

function useGetWaterMonthReport(
  params: RequestWaterMonthAmt,
  queryOptions?: UseQueryCustomOptions<ResponseWaterMonthAmt>,
) {
  return useQuery<ResponseWaterMonthAmt, ResponseError>({
    queryKey: [queryKeys.WATER, queryKeys.GET_WATER_REPORT_MONTH, params],
    queryFn: () => getWaterMonthAmt(params),
    ...queryOptions,
  });
}

export default useGetWaterMonthReport;

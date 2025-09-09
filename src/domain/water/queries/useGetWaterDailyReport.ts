import type {
  ResponseError,
  UseQueryCustomOptions,
} from '@/shared/types/common';
import type {
  RequestWaterDailyAmt,
  ResponseWaterDailyAmt,
} from '../types/waterDailyAmt.types';
import { useQuery } from '@tanstack/react-query';
import { getWaterDailyAmt } from '../api/waterApi';
import { queryKeys } from '../constants/queryKey';

function useGetWaterDailyReport(
  params: RequestWaterDailyAmt,
  queryOptions?: UseQueryCustomOptions<ResponseWaterDailyAmt>,
) {
  return useQuery<ResponseWaterDailyAmt, ResponseError>({
    queryKey: [queryKeys.WATER, queryKeys.GET_WATER_REPORT_DAILY, params],
    queryFn: () => getWaterDailyAmt(params),
    ...queryOptions,
  });
}

export default useGetWaterDailyReport;

import type { UseQueryCustomOptions } from '@/shared/types/common';
import type {
  RequestWaterHome,
  ResponseWaterHome,
} from '../types/waterHome.types';
import { useQuery } from '@tanstack/react-query';
import { getWaterHomeInfos } from '../api/waterApi';
import { queryKeys } from '../constants/queryKey';

function useGetWaterHomeInfos(
  params: RequestWaterHome,
  queryOptions?: UseQueryCustomOptions<ResponseWaterHome>,
) {
  return useQuery({
    queryKey: [queryKeys.WATER, queryKeys.GET_WATER_HOME_INFOS, params],
    queryFn: () => getWaterHomeInfos(params),
    ...queryOptions,
  });
}

export default useGetWaterHomeInfos;

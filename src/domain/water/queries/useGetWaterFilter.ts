import type {
  RequestWaterHome,
  ResponseWaterHome,
} from '../types/waterHome.types';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../constants/queryKey';
import { getWaterHomeInfos } from '../api/waterApi';
import type {
  ResponseError,
  UseQueryCustomOptions,
} from '@/shared/types/common';

type WaterFilterType = Pick<ResponseWaterHome, 'filterList'>;

function useGetWaterFilter(
  params: RequestWaterHome,
  queryOptions?: UseQueryCustomOptions<ResponseWaterHome, WaterFilterType>,
) {
  return useQuery<ResponseWaterHome, ResponseError, WaterFilterType>({
    queryKey: [queryKeys.WATER, queryKeys.GET_WATER_HOME, params],
    queryFn: () => getWaterHomeInfos(params),
    select(data) {
      return {
        filterList: data.filterList ?? [],
      };
    },
    ...queryOptions,
  });
}

export default useGetWaterFilter;

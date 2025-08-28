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

type WaterSterType = Pick<
  ResponseWaterHome,
  | 'euroList'
  | 'fausetList'
  | 'icePsList'
  | 'iceTankList'
  | 'iceTankUvList'
  | 'iceTrayList'
>;

function useGetWaterSter(
  params: RequestWaterHome,
  queryOptions?: UseQueryCustomOptions<ResponseWaterHome, WaterSterType>,
) {
  return useQuery<ResponseWaterHome, ResponseError, WaterSterType>({
    queryKey: [queryKeys.WATER, queryKeys.GET_WATER_STER, params],
    queryFn: () => getWaterHomeInfos(params),
    select(data) {
      return {
        fausetList: data.fausetList ?? [],
        euroList: data.euroList ?? [],
        icePsList: data.icePsList ?? [],
        iceTankList: data.iceTankList ?? [],
        iceTankUvList: data.iceTankUvList ?? [],
        iceTrayList: data.iceTrayList ?? [],
      };
    },
    ...queryOptions,
  });
}

export default useGetWaterSter;

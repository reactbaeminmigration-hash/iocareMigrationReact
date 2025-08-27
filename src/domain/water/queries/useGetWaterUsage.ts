import type {
  ResponseError,
  UseQueryCustomOptions,
} from '@/shared/types/common';
import type {
  RequestWaterHome,
  ResponseWaterHome,
} from '../types/waterHome.types';
import { useQuery } from '@tanstack/react-query';
import { getWaterHomeInfos } from '../api/waterApi';
import { queryKeys } from '../constants/queryKey';

type WaterUsageDailySelected = {
  dayList: string[];
  coldWatList: number[];
  cleanWatList: number[];
  hotWatList: number[];
  sumWatList: number[];
  usageToday: number;
};

function useGetWaterUsage(
  params: RequestWaterHome,
  queryOptions?: UseQueryCustomOptions<
    ResponseWaterHome,
    WaterUsageDailySelected
  >,
) {
  return useQuery<ResponseWaterHome, ResponseError, WaterUsageDailySelected>({
    queryKey: [queryKeys.WATER, queryKeys.GET_WATER_USAGE, params],
    queryFn: () => getWaterHomeInfos(params),
    select(data) {
      const usageDaily = data.watUsageDaily?.[0];
      const usageToday = data.watUsageToday;
      return {
        dayList: (usageDaily.dayList ?? []).map(
          (day) => `${Number(day.slice(6, 8))}일`,
        ),
        coldWatList: (usageDaily.coldWatList ?? []).map(Number),
        cleanWatList: (usageDaily.cleanWatList ?? []).map(Number),
        hotWatList: (usageDaily.hotWatList ?? []).map(Number),
        sumWatList: (usageDaily.sumWatList ?? []).map(Number),
        usageToday,
      };
    },
    ...queryOptions,
  });
}

export default useGetWaterUsage;

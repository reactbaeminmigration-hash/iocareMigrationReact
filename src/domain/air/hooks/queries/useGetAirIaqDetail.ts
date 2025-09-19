import type { DeviceInfo } from '@/domain/device/types/device.types';
import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getAirIaqDetail } from '../../api/airApi';
import { queryKeys } from '../../constants/queryKey';
import { toAirIaqDetailRequest } from '../../mapper';
import type {
  RequestAirIaqDetail,
  ResponseAirIaqDetail,
} from '../../types/airIaqDetail.types';

function useGetAirIaqDetail(
  deviceInfo: DeviceInfo,
  type: number,
  localLoadingKey?: string[],
  queryOptions?: UseQueryCustomOptions<ResponseAirIaqDetail>,
) {
  const params: RequestAirIaqDetail = toAirIaqDetailRequest(deviceInfo, type);
  const effectiveLocalKey = localLoadingKey ?? [];
  return useQuery({
    queryKey: [
      ...effectiveLocalKey,
      queryKeys.AIR,
      queryKeys.GET_AIR_DEVICE_HOME,
      params,
    ],
    meta: {
      showGlobalSpinner: effectiveLocalKey.length === 0, // scopeKey가 없을 때만 글로벌 스피너 표시
    },
    queryFn: () => getAirIaqDetail(params),
    staleTime: 2000,
    ...queryOptions,
  });
}

export default useGetAirIaqDetail;

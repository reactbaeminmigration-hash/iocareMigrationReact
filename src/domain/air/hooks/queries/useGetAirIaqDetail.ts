import type { DeviceInfo } from '@/domain/device/types/device.types';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import type { UseQueryCustomOptions } from '@/shared/types/common';
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
  return useAppQuery({
    localLoadingKey,
    queryKey: [queryKeys.AIR, queryKeys.GET_AIR_DEVICE_HOME, params],
    queryFn: () => getAirIaqDetail(params),
    staleTime: 2000,
    ...queryOptions,
  });
}

export default useGetAirIaqDetail;

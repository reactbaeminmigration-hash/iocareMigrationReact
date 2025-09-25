import type { DeviceInfo } from '@/domain/device/types/device.types';
import { useAppQuery } from '@/shared/hooks/useAppQuery';
import type { UseQueryCustomOptions } from '@/shared/types/common';
import { getAirDeviceHome } from '../../api/airApi';
import { queryKeys } from '../../constants/queryKey';
import { toAirDeivceHomeRequest } from '../../mapper';
import type {
  RequestAirDeviceHome,
  ResponseAirDeviceHome,
} from '../../types/airDeviceHome.types';

function useGetAirDeviceHome(
  deviceInfo: DeviceInfo,
  localLoadingKey?: string[],
  queryOptions?: UseQueryCustomOptions<ResponseAirDeviceHome>,
) {
  const params: RequestAirDeviceHome = toAirDeivceHomeRequest(deviceInfo);
  return useAppQuery({
    localLoadingKey,
    queryKey: [queryKeys.AIR, queryKeys.GET_AIR_DEVICE_HOME, params],
    queryFn: () => getAirDeviceHome(params),
    staleTime: 2000,
    ...queryOptions,
  });
}

export default useGetAirDeviceHome;

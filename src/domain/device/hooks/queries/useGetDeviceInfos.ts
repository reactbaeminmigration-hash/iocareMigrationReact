import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getDeviceInfos } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import type {
  RequestDeviceInfos,
  ResponseDeviceInfos,
} from '../../types/deviceInfos.types';

function useGetDeviceInfos(
  params: RequestDeviceInfos,
  queryOptions?: UseQueryCustomOptions<ResponseDeviceInfos>,
) {
  return useQuery({
    queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_INFOS, params],
    queryFn: () => getDeviceInfos(params),
    // staleTime: 60 * 1000,
    ...queryOptions,
  });
}

export default useGetDeviceInfos;

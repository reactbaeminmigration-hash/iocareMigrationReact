import type {
  RequestDeviceInfos,
  ResponseDeviceInfos,
} from '@/domain/user/types/deviceInfos.types';
import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getDeviceInfos } from '../../api';
import { queryKeys } from '../../constants/queryKey';

function useGetDeviceInfos(
  params: RequestDeviceInfos,
  queryOptions?: UseQueryCustomOptions<ResponseDeviceInfos>,
) {
  return useQuery({
    queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_INFOS, params],
    queryFn: () => getDeviceInfos(params),
    ...queryOptions,
  });
}

export default useGetDeviceInfos;

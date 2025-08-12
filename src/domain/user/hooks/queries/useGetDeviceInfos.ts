import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getDeviceInfos } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import type { RequestDeviceInfos } from '../../types/deviceInfos.types';

function useGetDeviceInfos(
  params: RequestDeviceInfos,
  queryOptions?: UseQueryCustomOptions,
) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_APP_SETTING, params],
    queryFn: () => getDeviceInfos(params),
    ...queryOptions,
  });
}

export default useGetDeviceInfos;

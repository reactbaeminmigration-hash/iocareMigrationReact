import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getDeviceConn } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import type {
  RequestDeviceConn,
  ResponseDeviceConn,
} from '../../types/deviceConn.types';

function useGetDeviceConn(
  params: RequestDeviceConn,
  queryOptions?: UseQueryCustomOptions<ResponseDeviceConn>,
) {
  return useQuery({
    queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_CONN, params],
    queryFn: () => getDeviceConn(params),
    meta: {
      showGlobalSpinner: false,
    },
    ...queryOptions,
  });
}

export default useGetDeviceConn;

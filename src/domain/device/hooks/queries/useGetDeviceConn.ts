import type { UseQueryCustomOptions } from '@/shared/types/common';
import type {
  RequestDeviceConn,
  ResponseDeviceConn,
} from '../../types/deviceConn.types';
import { useQuery } from '@tanstack/react-query';
import { getDeviceConnection } from '../../api';
import { queryKeys } from '../../constants/queryKey';

function useGetDeviceConn(
  params: RequestDeviceConn,
  queryOptions?: UseQueryCustomOptions<ResponseDeviceConn>,
) {
  return useQuery({
    queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_CONN, params],
    queryFn: () => getDeviceConnection(params),
    ...queryOptions,
  });
}

export default useGetDeviceConn;

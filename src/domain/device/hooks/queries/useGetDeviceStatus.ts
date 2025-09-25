import { useAppQuery } from '@/shared/hooks/useAppQuery';
import type { UseQueryCustomOptions } from '@/shared/types/common';
import { getDeviceConn } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import type {
  RequestDeviceConn,
  ResponseDeviceConn,
} from '../../types/deviceConn.types';

type DeviceConnParams = RequestDeviceConn & {
  localLoadingKey?: string[];
};

function useGetDeviceStatus(
  params: DeviceConnParams,
  queryOptions?: UseQueryCustomOptions<ResponseDeviceConn>,
) {
  const { localLoadingKey = [], ...apiParams } = params;

  return useAppQuery({
    localLoadingKey,
    queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_CONN, apiParams],
    queryFn: () => getDeviceConn(apiParams),

    // 1. 데이터를 영원히 fresh 상태로 설정하여 자동 재요청 방지
    staleTime: 2 * 1000, // 2초 동안 fresh 상태 유지

    // 2. 다른 모든 자동 재요청 기능 비활성화
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchOnMount: false, // 이 옵션도 false로 하여 마운트 시 자동 재요청을 막습니다.

    ...queryOptions,
  });
}

export default useGetDeviceStatus;

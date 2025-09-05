import type { UseQueryCustomOptions } from "@/shared/types/common";
import type { RequestDeviceConn, ResponseDeviceConn } from "../../types/deviceConn.types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKey";
import { getDeviceConn } from "../../api";

function useGetDeviceStatus(
    params: RequestDeviceConn,
    queryOptions?: UseQueryCustomOptions<ResponseDeviceConn>,
    ) {
    return useQuery({
        queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_CONN, params],
        queryFn: () => getDeviceConn(params),
        meta: {
        showGlobalSpinner: false,
        },

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
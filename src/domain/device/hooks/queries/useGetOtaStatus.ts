import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { getOtaStatus } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import {
  OtaUpdateState,
  type RequestOtaStatus,
  type ResponseOtaStatus,
} from '../../types/otaStatus.types';

const UPDATE_WAIT_POLLING_INTERVAL = 2 * 1000; // 2초 마다 폴링
const UPDATING_POLLING_INTERVAL = 60 * 1000; // 1분 마다 폴링

type OtaStatusparams = RequestOtaStatus & {
  scopeKey?: string[];
};

function useGetOtaStatus(
  params: OtaStatusparams,
  queryOptions?: UseQueryCustomOptions<ResponseOtaStatus>,
) {
  const pollCountRef = useRef(0);
  const { scopeKey = [], ...apiParams } = params;
  return useQuery({
    meta: {
      showGlobalSpinner: !scopeKey,
    },
    queryKey: [
      ...scopeKey,
      queryKeys.DEVICE,
      queryKeys.GET_OTA_STATUS,
      apiParams,
    ],
    queryFn: () => getOtaStatus(params),
    staleTime: 2000,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (
        data?.updateState === OtaUpdateState.UPDATE_WAIT &&
        pollCountRef.current < 3
      ) {
        pollCountRef.current++;
        return UPDATE_WAIT_POLLING_INTERVAL;
      } else if (data?.updateState === OtaUpdateState.UPDATING) {
        return UPDATING_POLLING_INTERVAL;
      }
      pollCountRef.current = 0;
      return false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...queryOptions,
  });
}

export default useGetOtaStatus;

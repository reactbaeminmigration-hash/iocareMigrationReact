import type {
  ResponseError,
  UseQueryCustomOptions,
} from '@/shared/types/common';
import type {
  RequestWaterControlStatus,
  ResponseWaterControlStatus,
} from '../types/waterControlStatus.types';
import { useQuery } from '@tanstack/react-query';
import { getWaterControlStatus } from '../api/waterApi';
import { queryKeys } from '../constants/queryKey';

function useGetWaterControlStatus(
  params: RequestWaterControlStatus,
  queryOptions?: UseQueryCustomOptions<ResponseWaterControlStatus>,
) {
  return useQuery<ResponseWaterControlStatus, ResponseError>({
    queryKey: [queryKeys.WATER, queryKeys.GET_CONTROL_STATUS, params],
    queryFn: () => getWaterControlStatus(params),
    ...queryOptions,
  });
}

export default useGetWaterControlStatus;

import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getLatestUpdated } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import type {
  RequestLatestUpdated,
  ResponseLatestUpdated,
} from '../../types/latestUpdate.types';

function useGetLatestupdated(
  params: RequestLatestUpdated,
  queryOptions?: UseQueryCustomOptions<ResponseLatestUpdated>,
) {
  return useQuery({
    staleTime: 60 * 1000,
    queryKey: [queryKeys.DEVICE, queryKeys.GET_LATEST_UPDATED, params],
    queryFn: () => getLatestUpdated(params),
    ...queryOptions,
  });
}

export default useGetLatestupdated;

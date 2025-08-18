import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getProdStandInfo } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import type {
  RequestProdStandInfo,
  ResponseProdStandInfo,
} from '../../types/prodStandInfo.types';

function useGetProdStandInfo(
  params: RequestProdStandInfo,
  queryOptions?: UseQueryCustomOptions<ResponseProdStandInfo>,
) {
  return useQuery({
    queryKey: [queryKeys.DEVICE, queryKeys.GET_PROD_STAND_INFO, params],
    queryFn: () => getProdStandInfo(params),
    ...queryOptions,
  });
}

export default useGetProdStandInfo;

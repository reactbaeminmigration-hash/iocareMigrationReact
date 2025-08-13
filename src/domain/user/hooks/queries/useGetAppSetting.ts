import type { UseQueryCustomOptions } from '@/shared/types/common';
import { useQuery } from '@tanstack/react-query';
import { getAppSetting } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import type {
  RequestAppSetting,
  ResponseAppSetting,
} from '../../types/appSetting.types';

function useGetAppSetting(
  params: RequestAppSetting,
  queryOptions?: UseQueryCustomOptions<ResponseAppSetting>,
) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_APP_SETTING, params],
    queryFn: () => getAppSetting(params),
    ...queryOptions,
  });
}

export default useGetAppSetting;

import type { UseInfiniteQueryCustomOptions } from '@/shared/types/common';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { getDeviceInfos } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import type {
  RequestDeviceInfos,
  ResponseDeviceInfos,
} from '../../types/deviceInfos.types';

function useGetDeviceInfosPaging(
  initialParams: RequestDeviceInfos,
  queryOptions?: UseInfiniteQueryCustomOptions<
    ResponseDeviceInfos,
    InfiniteData<ResponseDeviceInfos['deviceInfos']>,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam = initialParams.pageIndex }) => {
      const params = {
        ...initialParams,
        pageIndex: pageParam.toString(), // 0-indexed로 변환
      };
      return getDeviceInfos(params);
    },
    queryKey: [
      queryKeys.DEVICE,
      queryKeys.GET_DEVICE_INFOS_PAGING,
      initialParams,
    ],
    initialPageParam: parseInt(initialParams.pageIndex),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.deviceInfos.length < parseInt(initialParams.pageSize)) {
        return undefined;
      }
      return allPages.length;
    },
    select: (data) => {
      console.log(data);

      return {
        ...data,
        pages: data.pages.map((page) => page.deviceInfos),
      };
    },
    ...queryOptions,
  });
}

export default useGetDeviceInfosPaging;

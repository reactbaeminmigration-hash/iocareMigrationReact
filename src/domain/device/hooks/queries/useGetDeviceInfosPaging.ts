import { useUserStore } from '@/domain/user/stores/useUserStore';
import type { UseInfiniteQueryCustomOptions } from '@/shared/types/common';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { getDeviceInfos } from '../../api';
import { queryKeys } from '../../constants/queryKey';
import { useDeviceStore } from '../../stores/useDeviceStore';
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
  const { deviceInfos } = useDeviceStore();
  const { isStartingStep } = useUserStore();
  return useInfiniteQuery({
    enabled: isStartingStep, // 최초 진입 플래그
    initialData: {
      pages: [
        {
          deviceInfos, // 기존 데이터
          isInitialData: true, // 초기 데이터 플래그
        },
      ],
      pageParams: [parseInt(initialParams.pageIndex)],
    },
    queryFn: ({ pageParam = initialParams.pageIndex }) => {
      const params = {
        ...initialParams,
        pageIndex: pageParam.toString(), // 0-indexed로 변환
      };
      return getDeviceInfos(params);
    },
    meta: {
      // 이 쿼리는 전역 스피너를 표시하지 않겠다는 의미의 꼬리표입니다.
      showGlobalSpinner: false,
    },
    queryKey: [
      queryKeys.DEVICE,
      queryKeys.GET_DEVICE_INFOS_PAGING,
      initialParams,
    ],
    initialPageParam: parseInt(initialParams.pageIndex),
    getNextPageParam: (lastPage, allPages) => {
      // 최초 진입시 getNextPageParam을 실행하지 않음
      if (lastPage.isInitialData) {
        return undefined;
      }

      if (lastPage.deviceInfos.length < parseInt(initialParams.pageSize)) {
        return undefined;
      }
      return allPages.length;
    },
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => page.deviceInfos),
      };
    },
    ...queryOptions,
  });
}

export default useGetDeviceInfosPaging;

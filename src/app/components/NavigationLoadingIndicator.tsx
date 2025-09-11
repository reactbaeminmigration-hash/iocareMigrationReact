import { useSpinner } from '@/shared/hooks/useSpinner';
import { useIsFetching } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const NavigationLoadingIndicator = () => {
  // const navigation = useNavigation();
  // useIsFetching에 predicate 필터를 추가합니다.
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isFetching = useIsFetching({
    predicate: (query) => {
      // 쿼리에 설정된 메타데이터를 확인합니다.
      // meta.showGlobalSpinner가 false인 쿼리는 계산에서 제외합니다.
      return query.meta?.showGlobalSpinner !== false;
    },
  });
  const { showSpinner, hideSpinner } = useSpinner();

  // const isRouterLoading = navigation.state === 'loading';
  const isQueryFetching = isFetching > 0;

  // 최종 로딩 상태
  const isLoading = isQueryFetching;

  useEffect(() => {
    if (isLoading) {
      timerRef.current = setTimeout(() => {
        showSpinner();
      }, 200);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      hideSpinner();
    }
    // 컴포넌트가 사라질 때(unmount) 예약된 타이머가 있다면 정리해줍니다. (메모리 누수 방지)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // 이 effect는 오직 최종 로딩 상태인 'isLoading'이 변할 때만 실행됩니다.
  }, [isLoading]);

  return null;
};

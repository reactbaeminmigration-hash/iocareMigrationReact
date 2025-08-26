import { useSpinner } from '@/shared/hooks/useSpinner';
import { useIsFetching } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useNavigation } from 'react-router-dom';

export const NavigationLoadingIndicator = () => {
  const navigation = useNavigation();
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

  const isRouterLoading = navigation.state === 'loading';
  const isQueryFetching = isFetching > 0;

  // 최종 로딩 상태
  const isLoading = isRouterLoading || isQueryFetching;

  useEffect(() => {
    // 로딩이 시작되면
    if (isLoading) {
      // 만약 '스피너 끄기' 타이머가 예약되어 있었다면, 즉시 취소합니다.
      // (로딩이 끝난 줄 알고 끄려고 했는데, 다른 로딩이 바로 시작된 경우)
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      // 스피너를 켭니다.
      showSpinner();
    } else {
      // 바로 끄지 않고, 150ms 후에 끄도록 예약합니다.
      timerRef.current = setTimeout(() => {
        hideSpinner();
      }, 200); // 150ms(0.15초) 정도면 깜빡임을 충분히 방지할 수 있습니다.
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

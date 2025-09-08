import { useIsFetching } from '@tanstack/react-query';

interface UseLoadingClassOptions {
  scopeKey: string[];
  baseClassName?: string;
  loadingClassName?: string;
}

/**
 * scopeKey를 감지하여 로딩 상태일 때 loadingClassName을 추가해주는 훅
 * @param scopeKey - useIsFetching에 전달할 queryKey
 * @param baseClassName - 기본적으로 적용될 클래스 이름
 * @param loadingClassName - 로딩 시 추가될 클래스 이름 (기본값: 'cw_cont_loading')
 * @returns 최종 클래스 이름 문자열
 */
export const useLoadingClass = ({
  scopeKey,
  baseClassName = '',
  loadingClassName = 'cw_cont_loading',
}: UseLoadingClassOptions) => {
  const isAnythingLoading = useIsFetching({ queryKey: scopeKey }) > 0;

  return `${baseClassName} ${
    isAnythingLoading ? loadingClassName : ''
  }`.trim();
};
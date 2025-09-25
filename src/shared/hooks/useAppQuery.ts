import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export type UseAppQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
> = UseQueryOptions<TQueryFnData, TError, TData> & {
  localLoadingKey?: string[];
};

export function useAppQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({
  localLoadingKey,
  ...options
}: UseAppQueryOptions<TQueryFnData, TError, TData>) {
  const effectiveLocalKey = localLoadingKey ?? [];

  // 수동으로 전달된 showGlobalSpinner 값 확인
  const manualShowGlobalSpinner = options.meta?.showGlobalSpinner;

  // localLoadingKey 기반의 자동 설정 값
  const autoShowGlobalSpinner =
    !localLoadingKey || localLoadingKey.length === 0;

  return useQuery({
    ...options,
    queryKey: [...effectiveLocalKey, ...options.queryKey],
    meta: {
      ...options.meta,
      // 수동 설정(manual)이 있으면 그 값을 우선하고, 없으면 자동(auto) 설정 값을 사용
      showGlobalSpinner: manualShowGlobalSpinner ?? autoShowGlobalSpinner,
    },
  });
}

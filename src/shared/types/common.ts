import type { resources } from '@/core/i18n/i18n';
import {
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ApiResponse<T> = {
  code: string;
  message: string;
  traceId: string;
  data: T;
};

type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;

// 1. 중첩된 객체에서 최종 값(leaf)에 해당하는 경로만 추출하는 헬퍼 타입입니다.
type DotSeparatedLeafKeys<T> = {
  // T의 모든 키(K)에 대해 반복합니다.
  [K in keyof T]: T[K] extends object
    ? // 값이 객체이면, 현재 키와 하위 경로를 점(.)으로 연결하여 재귀 호출합니다.
      `${K & string}.${DotSeparatedLeafKeys<T[K]>}`
    : // 값이 객체가 아니면(최종 값이면), 현재 키를 반환합니다.
      `${K & string}`;
}[keyof T];

// 2. 위 헬퍼 타입을 사용해 최종 TranslationKey 타입을 만듭니다.
type TranslationKey = DotSeparatedLeafKeys<typeof resources.ko.translation>;

export type {
  ApiResponse,
  ResponseError,
  TranslationKey,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
};

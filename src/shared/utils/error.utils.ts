import type { ResponseError } from '../types/common';

export function isResponseError(error: unknown): error is ResponseError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error && // AxiosError인지 확인
    (error as ResponseError).response?.data?.message !== undefined
  );
}

import type { ResponseError } from '@/shared/types/common';
import type {
  RequestWaterControl,
  ResponseWaterControl,
} from '../types/waterControl.types';
import { useMutation } from '@tanstack/react-query';
import { getWaterControl } from '../api/waterApi';
import { queryKeys } from '../constants/queryKey';

function useGetWaterControl() {
  return useMutation<ResponseWaterControl, ResponseError, RequestWaterControl>({
    mutationKey: [queryKeys.WATER, queryKeys.GET_CONTROL],
    mutationFn: getWaterControl,
  });
}

export default useGetWaterControl;

import queryClient from '@/core/api/queryClient';
import { queryKeys } from '../constants/queryKey';
import { getDeviceInfos } from './deviceApi';

export async function deviceLoader() {
  try {
    // 완전 새로고침
    // queryClient.invalidateQueries({
    //   queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_INFOS],
    // });
    // 1분위 만료
    const initialParams = { pageIndex: '0', pageSize: '100' };
    const data = await queryClient.fetchQuery({
      queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_INFOS, initialParams],
      queryFn: () => getDeviceInfos(initialParams),
      staleTime: 60 * 1000, // 1분 (60000ms)
    });
    return data;
  } catch (error) {
    console.error('refetchDeviceData Error', error);
    throw error;
  }
}

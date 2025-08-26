import qureyClient from '@/core/api/queryClient';
import { queryKeys } from '../constants/queryKey';

export async function deviceLoader() {
  try {
    qureyClient.invalidateQueries({
      queryKey: [queryKeys.DEVICE, queryKeys.GET_DEVICE_INFOS],
    });
    console.log('refetchDeviceData Success');
    return { success: true };
  } catch (error) {
    console.error('refetchDeviceData Error', error);
    throw error;
  }
}

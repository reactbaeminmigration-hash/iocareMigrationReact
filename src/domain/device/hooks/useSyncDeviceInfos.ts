import { useUserStore } from '@/domain/user/stores/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants/queryKey';
import { useDeviceStore } from '../stores/useDeviceStore';
import type { ResponseDeviceInfos } from '../types/deviceInfos.types';

function useSyncDeviceInfos() {
  const queryClient = useQueryClient();
  const { userInfo } = useUserStore();
  const { setDeviceInfos } = useDeviceStore();
  const getSyncedDeviceInfos = async (): Promise<
    ResponseDeviceInfos | undefined
  > => {
    const deviceQueryKey = [
      queryKeys.DEVICE,
      queryKeys.GET_DEVICE_INFOS,
      { pageIndex: '0', pageSize: '100', mbrSeq: userInfo?.seqNum },
    ];

    try {
      await queryClient.refetchQueries({ queryKey: deviceQueryKey });

      const newData =
        queryClient.getQueryData<ResponseDeviceInfos>(deviceQueryKey);

      if (newData) {
        console.log(
          '데이터 가져오기 성공! Zustand 스토어를 업데이트합니다.',
          newData.deviceInfos,
        );
        setDeviceInfos(newData.deviceInfos);
        return newData;
      }
    } catch (error) {
      console.error('디바이스 정보 갱신 및 저장 중 오류 발생:', error);
    }
    return undefined;
  };

  return {
    getSyncedDeviceInfos,
  };
}

export default useSyncDeviceInfos;

import useGetDeviceInfos from '@/domain/device/hooks/queries/useGetDeviceInfos';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import useGetAppSetting from '@/domain/user/hooks/queries/useGetAppSetting';
import { useUserStore } from '@/domain/user/stores/useUserStore';
import { useEffect } from 'react';

export const DataSyncManager = () => {
  const { setDeviceInfos } = useDeviceStore();
  const { userInfo, isAuthenticated, setInitialDataLoaded } = useUserStore();
  // AppSetting 조회
  const {
    data: ResponseAppSetting,
    isPending: isAppSettingPending,
    isError: isAppSettingError,
    isSuccess: isAppSettingSuccess,
  } = useGetAppSetting(
    { mbrSeq: userInfo?.seqNum! },
    { enabled: isAuthenticated },
  );

  // DeviceInfos 조회
  const {
    data: ResponseDeviceInfos,
    isPending: isDeviceInfosPending,
    isError: isDeviceInfosError,
    isSuccess: isDeviceInfosSuccess,
  } = useGetDeviceInfos(
    { pageIndex: '0', pageSize: '100' },
    { enabled: isAuthenticated },
  );

  useEffect(() => {
    if (!isAppSettingPending && ResponseAppSetting) {
      console.log('ResponseAppSetting 패칭 완료:', ResponseAppSetting);
    }
    if (isAppSettingError) {
      console.error('ResponseAppSetting 패칭 오류:', isAppSettingError);
    }
  }, [ResponseAppSetting, isAppSettingPending, isAppSettingError]);

  useEffect(() => {
    if (!isDeviceInfosPending && ResponseDeviceInfos) {
      console.log('ResponseDeviceInfos 패칭 완료:', ResponseDeviceInfos);
      setDeviceInfos(ResponseDeviceInfos.deviceInfos);
    }
    if (isDeviceInfosError) {
      console.error('ResponseDeviceInfos 패칭 오류:', isDeviceInfosError);
    }
  }, [ResponseDeviceInfos, isDeviceInfosPending, isDeviceInfosError]);

  useEffect(() => {
    // 로그인 상태이고, 두 쿼리가 모두 로딩 중이 아니며, 모두 성공했을 때
    if (isAuthenticated && isAppSettingSuccess && isDeviceInfosSuccess) {
      console.log('DataSyncManager: 모든 초기 데이터 로딩 완료!');
      setInitialDataLoaded(true);
    } else if (!isAuthenticated) {
      // 로그아웃 상태이거나, 아직 로그인 전이면 로딩 상태 초기화
      setInitialDataLoaded(false);
    }
  }, [
    isAuthenticated,
    isAppSettingSuccess, // ✨ isSuccess로 변경
    isDeviceInfosSuccess, // ✨ isSuccess로 변경
    setInitialDataLoaded,
  ]);

  useEffect(() => {}, []);
  return null;
};

import useGetDeviceInfos from '@/domain/device/hooks/queries/useGetDeviceInfos';
import useGetLatestupdated from '@/domain/device/hooks/queries/useGetLatestupdated';
import useGetProdStandInfo from '@/domain/device/hooks/queries/useGetProdStandInfo';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import useGetAppSetting from '@/domain/user/hooks/queries/useGetAppSetting';
import { useUserStore } from '@/domain/user/stores/useUserStore';
import { useEffect } from 'react';

export const DataSyncManager = () => {
  const {
    setDeviceInfos,
    setProdStandDeviceInfo,
    setCategoryInfo,
    setRegionInfos,
    latestUpdatedAt,
    setLatestUpdatedAt,
    setLastSelectedDeviceInfos,
    lastSelectedDeviceInfos,
  } = useDeviceStore();
  // user스토어 조회
  const { userInfo, isAuthenticated, setInitialDataLoaded, setError } =
    useUserStore();
  // AppSetting 조회
  const {
    data: ResponseAppSetting,
    error: appSettingError,
    isSuccess: isAppSettingSuccess,
  } = useGetAppSetting(
    { mbrSeq: userInfo?.seqNum! },
    { enabled: isAuthenticated },
  );

  // DeviceInfos 조회
  const {
    data: ResponseDeviceInfos,
    error: deviceInfosError,
    isSuccess: isDeviceInfosSuccess,
  } = useGetDeviceInfos(
    { pageIndex: '0', pageSize: '100' },
    { enabled: isAuthenticated },
  );

  // SetLatestUpdated 조회
  const {
    data: ResponseGetLatestUpdated,
    error: getLatestUpdatedError,
    isSuccess: isGetLatestUpdatedSuccess,
  } = useGetLatestupdated(
    { appVersion: 'v1', langCd: 'ko' },
    { enabled: isAuthenticated },
  );

  // prodStandInfo 조회
  const {
    data: ResponseGetProdStandInfo,
    error: getProdStandInfoError,
    isSuccess: isGetProdStandInfoSuccess,
  } = useGetProdStandInfo(
    { appVersion: 'v1', langCd: 'ko' },
    { enabled: isAuthenticated },
  );
  // AppSetting 데이터 패칭 성공 시 처리
  useEffect(() => {
    if (isAppSettingSuccess && ResponseAppSetting) {
      console.log('ResponseAppSetting 패칭 완료:', ResponseAppSetting);
    }
  }, [ResponseAppSetting, isAppSettingSuccess]);
  // DeviceInfos 데이터 패칭 성공 시 처리
  useEffect(() => {
    if (ResponseDeviceInfos && isDeviceInfosSuccess) {
      console.log('ResponseDeviceInfos 패칭 완료:', ResponseDeviceInfos);
      setDeviceInfos(ResponseDeviceInfos.deviceInfos);
      if (!lastSelectedDeviceInfos?.barcode) {
        setLastSelectedDeviceInfos(ResponseDeviceInfos.deviceInfos[0]);
      }
    }
  }, [ResponseDeviceInfos, isDeviceInfosSuccess]);
  // LatestUpdated 데이터 패칭 성공 시 처리
  useEffect(() => {
    if (isGetLatestUpdatedSuccess && ResponseGetLatestUpdated) {
      console.log('ResponseDeviceInfos 패칭 완료:', ResponseGetLatestUpdated);
      const prevUpdatedAt = latestUpdatedAt ?? '';
      if (
        Number(prevUpdatedAt) != ResponseGetLatestUpdated.updatedAt ||
        prevUpdatedAt
      ) {
        setLatestUpdatedAt(ResponseGetLatestUpdated.updatedAt.toString());
      }
    }
  }, [
    isGetLatestUpdatedSuccess,
    ResponseGetLatestUpdated,
    latestUpdatedAt,
    setLatestUpdatedAt,
  ]);
  // ProdStandInfo 데이터 패칭 성공 시 처리
  useEffect(() => {
    if (isGetProdStandInfoSuccess && ResponseGetProdStandInfo) {
      setProdStandDeviceInfo(ResponseGetProdStandInfo.deviceInfos);
      setCategoryInfo(ResponseGetProdStandInfo.category);
      setRegionInfos(ResponseGetProdStandInfo.regionInfos);
    }
  }, [isGetProdStandInfoSuccess, ResponseGetProdStandInfo]);

  // 데이터 패칭 에러 통합처리
  useEffect(() => {
    const firstError =
      appSettingError ||
      deviceInfosError ||
      getLatestUpdatedError ||
      getProdStandInfoError;

    if (firstError) {
      setError(firstError);
    }
  }, [
    appSettingError,
    deviceInfosError,
    getLatestUpdatedError,
    getProdStandInfoError,
    setError,
  ]);
  // 데이터 패칭 성공 처리
  useEffect(() => {
    // 로그인 상태이고, 두 쿼리가 모두 로딩 중이 아니며, 모두 성공했을 때
    if (
      isAuthenticated &&
      isAppSettingSuccess &&
      isDeviceInfosSuccess &&
      isGetProdStandInfoSuccess
    ) {
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
    isGetProdStandInfoSuccess,
    setInitialDataLoaded,
  ]);
  return null;
};

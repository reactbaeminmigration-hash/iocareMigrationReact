import { NoNetStatusScreen } from '@/shared/components/FullScreenOverlay/NoNetStatusScreen';
import type { ReactNode } from 'react';
import { OtaFailComponent } from '../components/OtaFailComponent';
import { OtaUpdatingComponent } from '../components/OtaUpdatingComponent';
import { useDeviceStore } from '../stores/useDeviceStore';
import { OtaUpdateState } from '../types/otaStatus.types';
import useGetOtaStatus from './queries/useGetOtaStatus';
import { useDeviceStatus } from './useDeviceStatus';

interface useOtaStatusLogicProps {
  // 훅의 props이므로 이름 변경 제안
  scopeKey?: string[];
  enabled?: boolean;
}

// 로직 훅이므로 Overlay보다는 Logic을 이름에 사용하는 것을 제안
export const useOtaStatusLogic = ({
  scopeKey,
  enabled,
}: useOtaStatusLogicProps) => {
  const { lastSelectedDeviceInfos } = useDeviceStore();
  const devId = lastSelectedDeviceInfos.barcode;
  const {
    isPending: deviceStatusIsPending,
    isFetching: deviceStatusIsFetching,
    isOnline,
  } = useDeviceStatus({ scopeKey, enabled });

  const deviceStatusIsLoading = deviceStatusIsPending || deviceStatusIsFetching;

  const {
    data: otaData,
    isLoading: otaIsLoading,
    isError: otaIsError,
  } = useGetOtaStatus({ scopeKey, devId }, { enabled: enabled && isOnline });

  const isLoading = deviceStatusIsLoading || otaIsLoading;

  const getFinalNode = (): ReactNode => {
    if (isLoading) {
      return <div>로딩중</div>;
    }
    if (!isOnline) {
      return <NoNetStatusScreen />;
    }

    if (otaIsError) {
      return <div>에러</div>;
    }

    if (!otaData) {
      return null;
    }

    const handleGoToServiceCenter = () => {
      // navigate('/gnb/service');
    };
    switch (otaData.updateState) {
      case OtaUpdateState.UPDATING:
        return <OtaUpdatingComponent />;
      case OtaUpdateState.NONE:
        return null;
      default:
        return (
          <OtaFailComponent
            barcode={devId}
            handleGoToServiceCenter={handleGoToServiceCenter}
          />
        );
    }
  };

  return {
    isLoading,
    node: getFinalNode(),
  };
};

import { NoNetStatusScreen } from '@/shared/components/FullScreenOverlay/NoNetStatusScreen';
import type { ReactNode } from 'react';
import { Trans } from 'react-i18next';
import useGetOtaStatus from '../hooks/queries/useGetOtaStatus';
import { useDeviceStatus } from '../hooks/useDeviceStatus';
import { useDeviceStore } from '../stores/useDeviceStore';

interface OtaBeforeNoticeComponentProp {
  localLoadingKey?: string[];
}

export const OtaBeforeNoticeComponent = ({
  localLoadingKey,
}: OtaBeforeNoticeComponentProp) => {
  const { lastSelectedDeviceInfos } = useDeviceStore();
  const { isOnline } = useDeviceStatus({ localLoadingKey });

  if (!isOnline) {
    return <NoNetStatusScreen />;
  }

  const { data: otaData, isError: otaIsError } = useGetOtaStatus(
    { localLoadingKey, devId: lastSelectedDeviceInfos.barcode },
    { enabled: isOnline },
  );

  if (!otaData || otaIsError) {
    return null;
  }

  if (otaData.updateState === 'UPDATE_WAIT') {
    let noticeContent: ReactNode = null;
    if (otaData.isShowResveUpdateMessage) {
      noticeContent = (
        <p>
          <Trans i18nKey="CON.PROD_UPDATE_GUIDE" components={[<br />]} />
        </p>
      );
    } else if (
      (otaData.newestMcuVer !== '' || otaData.newestWifiVer !== '') &&
      otaData.resveUpdateDate == 0
    ) {
      noticeContent = (
        <p>
          <Trans i18nKey="CON.PROD_UPDATE_GUIDE_IMIT" components={[<br />]} />
        </p>
      );
    }

    if (noticeContent) {
      return (
        <>
          <div className="OTA_msgbox">
            <h1 className="tit"></h1>
            {noticeContent}
            <button type="button" className="cw_btn_popclose w">
              <span>Close</span>
            </button>
          </div>
        </>
      );
    }
  }
  return null;
};

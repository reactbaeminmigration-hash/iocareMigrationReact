import { NoNetStatusScreen } from '@/shared/components/FullScreenOverlay/NoNetStatusScreen';
import type { ReactNode } from 'react';
import { Trans } from 'react-i18next';
import useGetDeviceStatus from '../hooks/queries/useGetDeviceStatus';
import useGetOtaStatus from '../hooks/queries/useGetOtaStatus';
import { useDeviceStore } from '../stores/useDeviceStore';

interface OtaBeforeNoticeComponentProp {
  scopeKey?: string[];
}

export const OtaBeforeNoticeComponent = ({
  scopeKey,
}: OtaBeforeNoticeComponentProp) => {
  const { lastSelectedDeviceInfos } = useDeviceStore();
  const { data: deviceStatusData, isSuccess: deviceStatusIsSuccess } =
    useGetDeviceStatus({
      scopeKey,
      deviceList: [{ devIds: lastSelectedDeviceInfos.barcode }],
    });

  const isOnline = !!deviceStatusData?.[0]?.netStatus;
  if (!isOnline) {
    return <NoNetStatusScreen />;
  }

  const { data: otaData, isError: otaIsError } = useGetOtaStatus(
    { scopeKey, devId: lastSelectedDeviceInfos.barcode },
    { enabled: deviceStatusIsSuccess },
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
        <div className="cw_tab_cont cw_container01">
          <h2 className="cw_hide">홈</h2>
          <div className="OTA_msgbox">
            <h1 className="tit"></h1>
            {noticeContent}
            <button type="button" className="cw_btn_popclose w">
              <span>Close</span>
            </button>
          </div>
        </div>
      );
    }
  }
  return null;
};

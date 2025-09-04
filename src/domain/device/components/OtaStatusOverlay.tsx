import { Trans, useTranslation } from 'react-i18next';
import useGetOtaStatus from '../hooks/queries/useGetOtaStatus';
import { useDeviceStore } from '../stores/useDeviceStore';
import {
  OtaUpdateState,
  type ResponseOtaStatus,
} from '../types/otaStatus.types';

interface OtaStatusOverlayProps {
  scopeKey?: string[];
}

export const OtaStatusOverlay = ({ scopeKey }: OtaStatusOverlayProps) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { lastSelectedDeviceInfos } = useDeviceStore();
  const { data, isLoading, isError, error } = useGetOtaStatus({
    scopeKey,
    devId: lastSelectedDeviceInfos.barcode,
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (!data) {
    return null;
  }
  if (isError) {
    return <div>에러</div>;
    console.error('OTA 상태 조회 실패:', error);
  }

  const handleGoToServiceCenter = () => {
    // navigate('/gnb/service');
  };

  const renderStatus = (otaData: ResponseOtaStatus) => {
    switch (otaData.updateState) {
      case OtaUpdateState.UPDATING:
        return (
          <>
            <div className="cw_system_update">
              <div className="cw_msgbox">
                <p>
                  <Trans
                    i18nKey="CON.PROD_UPDATE_ING"
                    // values={{ name }}
                    // components={{ strong: <strong /> }}
                  />
                  {/* {t('CON.PROD_UPDATE_ING')} */}
                </p>
              </div>
            </div>
          </>
        );
      case OtaUpdateState.NONE:
        return <></>;
      case OtaUpdateState.UPDATE_ERROR:
      case OtaUpdateState.UPDATE_FAIL:
      default:
        return (
          <>
            <div className="cw_system_update fail">
              <div className="cw_msgbox">
                <p className="tit">{t('CON.PROD_UPDATE_FAIL')}</p>
                <p>{t('CON.PROD_FAIL_EXPLAIN_01')}</p>
                <ol>
                  <li>{t('CON.PROD_FAIL_EXPLAIN_02')}</li>
                  <li>{t('CON.PROD_FAIL_EXPLAIN_03')}</li>
                  <p> - {t('CON.ERROR_CODE')} : 10</p>
                  <p>
                    {' '}
                    - {t('CON.ERROR_CODE')} : {lastSelectedDeviceInfos.barcode}
                  </p>
                </ol>
                <div className="cw_btn_area">
                  <button
                    type="button"
                    className="cw_btn_goCS"
                    onClick={handleGoToServiceCenter}
                  >
                    <span>{t('PAIRING.GO_SERVICE_CENTER')}</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return <>{renderStatus(data)}</>;
};

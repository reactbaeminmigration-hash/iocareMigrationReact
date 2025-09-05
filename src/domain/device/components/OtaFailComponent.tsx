import { t } from 'i18next';

interface OtaFailComponentProps {
  barcode: String;
  handleGoToServiceCenter: () => void;
}

export const OtaFailComponent = ({
  barcode,
  handleGoToServiceCenter,
}: OtaFailComponentProps) => {
  return (
    <>
      <div className="cw_system_update fail">
        <div className="cw_msgbox">
          <p className="tit">{t('CON.PROD_UPDATE_FAIL')}</p>
          <p>{t('CON.PROD_FAIL_EXPLAIN_01')}</p>
          <ol>
            <li>{t('CON.PROD_FAIL_EXPLAIN_02')}</li>
            <li>{t('CON.PROD_FAIL_EXPLAIN_03')}</li>
            <p> - {t('CON.ERROR_CODE')} : 104</p>
            <p>
              - {t('CON.ERROR_CODE')} : {barcode}
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
};

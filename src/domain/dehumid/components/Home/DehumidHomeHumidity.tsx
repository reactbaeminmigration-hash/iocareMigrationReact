import { useTranslation, Trans } from 'react-i18next';

export type NobleDehumidifierProps = {
  isNobleAD?: boolean;
  isNobleAM?: boolean;
  adTemperature?: number;
  adHumidity?: number;
  unit?: string;
  adChartDataExist?: boolean;
  adUpdateDttm?: string;
};

export const DehumidHomeHumidity = ({
  isNobleAD = false,
  isNobleAM = false,
  adTemperature,
  adHumidity,
  unit = '',
  adChartDataExist,
  adUpdateDttm,
}: NobleDehumidifierProps) => {
  const { t } = useTranslation();

  const isNoHumidity = adHumidity === 65535;
  const showGraph = adChartDataExist === false;
  const showNoData =
    adChartDataExist === undefined || adChartDataExist === true;

  return (
    <div className="cw_contbox02">
      <div className="cw_tit">
        <h3>{t('NOBLE_AD.CURRENT_HUMIDITY')}</h3>
        <button type="button" className="cw_btn_more01" onClick={() => {}}>
          <span>{t('AIR.AIR_MORE_SEE')}</span>
        </button>
      </div>

      {/* card contents */}
      <div className="cw_cont cw_cont_pd02">
        {/* 현재 온/습도 */}
        <div className="tit_area01">
          {isNobleAD && adTemperature !== undefined && (
            <div>
              {t('NOBLE_AD.IN_TEMPERATURE')} {adTemperature}
              {unit}
            </div>
          )}

          {isNobleAM && adHumidity !== undefined && (
            <div>{t('NOBLE_AD.CURRENT_HUMIDITY')}</div>
          )}

          {adHumidity !== undefined && (
            <div className="tit_humidity">
              <strong className="tit_ico">{t('AIR_REPORT.HUMIDITY')}</strong>
              <strong className="value">
                {isNoHumidity ? '--' : adHumidity}
              </strong>
              {!isNoHumidity && <span className="unit">%</span>}
            </div>
          )}

          {isNoHumidity && (
            <p
              className="cw_txtc02 cw_txt_fs02 cw_cen"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '100px',
                color: '#fff',
                padding: '5px 0',
                maxWidth: '230px',
                margin: 'auto',
              }}
            >
              <Trans i18nKey="NOBLE_AD.CANT_RECV_CUR_HUMIDITY" />
            </p>
          )}
        </div>

        {/* 습도 graph */}
        <div
          className={`humidity_graph_area humidity_graph ${showGraph ? '' : 'cw_none'}`}
          id="humidity_graph"
        />

        <div
          className={`humidity_graph_area ${
            showNoData || isNoHumidity ? 'cw_none' : ''
          }`}
          style={{ height: '133px', paddingTop: '50px' }}
        >
          <p
            className="cw_txtc02 cw_txt_fs02 cw_cen"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '100px',
              color: '#fff',
              padding: '5px 0',
              maxWidth: '230px',
              margin: 'auto',
            }}
          >
            <Trans i18nKey="NOBLE_AD.AD_DETAIL_NO_DATA" />
          </p>
        </div>
        {/* //습도 graph */}

        <p className="cw_txtc02 cw_txt_fs02 cw_cen">
          {t('NOBLE_AD.LATELY_24_HOUR_HUMIDITY')}
        </p>

        {/* update info */}
        {adUpdateDttm && (
          <div className="info_update">Update {adUpdateDttm}</div>
        )}
      </div>
      {/* //card contents */}
    </div>
  );
};

import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { useTooltip } from '@/shared/hooks/useTooltip';
import cx from 'classnames';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import useGetAirDeviceHome from '../../hooks/queries/useGetAirDeviceHome';

export const AirHomeQualityStatus = () => {
  const { deviceState } = useDeviceContext();
  const { data } = useGetAirDeviceHome(deviceState);
  const airStateTooltip = useTooltip<HTMLDListElement>();
  const inAirStatus = cx('cw_txt incwTxt', {
    cw_good:
      0 <= parseInt(data?.IAQ.dustpm25!) && parseInt(data?.IAQ.dustpm25!) <= 15,
  });
  return (
    <>
      <dl className="cw_todaystatus cw_air ultradust">
        <dt>
          <Trans i18nKey={'AIR.ULTRAFINEDUST'} />
          <sub>
            <Trans i18nKey={'AIR_SET_MARKET.AIR_PM25'} />
          </sub>
        </dt>
        <dd>
          <div className="cw_aircondition">
            <strong className={inAirStatus}>
              <span className="good">{t('WEATHER.GOOD')}</span>
              <span className="normal">{t('WEATHER.NORMAL')}</span>
              <span className="bad">{t('WEATHER.BAD')}</span>
              <span className="verybad">{t('WEATHER.VERY_BAD')}</span>
              <div className="value">25 μg/m³</div>
            </strong>
            <dl
              ref={airStateTooltip.containerRef}
              className={`cw_air_status cw_st02 cw_help_tooltipWrap ${airStateTooltip.isOpen ? 'cw_open' : ''}`}
            >
              <dt className="cw_temp">
                <Trans i18nKey={'AIR.AIR_CURRENT_TEMPERATURE'} />
              </dt>
              <dd>
                <strong>
                  24
                  {/* {{ currentTemp }} */}
                </strong>
                <span className="cw_unit">
                  °F
                  {/* {{ unit }} */}
                </span>
              </dd>
              <dt className="cw_humidity">
                <Trans i18nKey={'AIR.AIR_CURRENT_HUMIDITY'} />
              </dt>
              <dd>
                <strong>
                  59
                  {/* {{ currentHumid }} */}
                </strong>
                <span className="cw_unit">%</span>
              </dd>
              <dd className="tooltip">
                <button
                  type="button"
                  className="cw_btn_help type02 only_icon"
                  onClick={airStateTooltip.toggle}
                >
                  <span className="cw_hide">온도/습도 정보</span>
                </button>
                <div className="cw_tooltip_box">
                  <p>
                    <Trans i18nKey={'AIR.TEMP_HUMID_EXPLAIN_TXT'} />
                  </p>
                </div>
              </dd>
            </dl>
          </div>
        </dd>
      </dl>
    </>
  );
};

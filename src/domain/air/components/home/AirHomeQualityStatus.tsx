import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { getIaqStatus } from '@/domain/air/helpers/airQuality.helpers';
import useGetAirDeviceHome from '@/domain/air/hooks/queries/useGetAirDeviceHome';
import type { AirFeatures } from '@/domain/air/types/features.types';
import { useTooltip } from '@/shared/hooks/useTooltip';
import cx from 'classnames';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

export const AirHomeQualityStatus = () => {
  const { deviceState, deviceUISpec } = useDeviceContext();
  const features = deviceUISpec.model.features as AirFeatures;
  const { data, isLoading } = useGetAirDeviceHome(deviceState);
  const airStateTooltip = useTooltip<HTMLDListElement>();

  if (isLoading || !data) {
    return null; // Or a loading skeleton
  }

  // 이제 이 함수 한번만 호출하면 상태, 값, 단위 모두를 얻을 수 있습니다.
  const iaqDisplay = getIaqStatus(features, {
    iaq: data.IAQ,
    prodStatus: data.prodStatus,
  });

  return (
    <>
      <dl className="cw_todaystatus cw_air ultradust">
        <dt>
          <Trans i18nKey={'AIR.ULTRAFINEDUST'} />
          <sub>
            {/* TODO: mainIndicator에 따라 동적으로 변경되도록 수정 필요 */}
            <Trans i18nKey={'AIR_SET_MARKET.AIR_PM25'} />
          </sub>
        </dt>
        <dd>
          <div className="cw_aircondition">
            <strong className={cx('cw_txt incwTxt', iaqDisplay.className)}>
              <span>{t(iaqDisplay.i18nKey)}</span>
              <div className="value">
                {iaqDisplay.value} {iaqDisplay.unit}
              </div>
            </strong>
            <dl
              ref={airStateTooltip.containerRef}
              className={`cw_air_status cw_st02 cw_help_tooltipWrap ${
                airStateTooltip.isOpen ? 'cw_open' : ''
              }`}
            >
              <dt className="cw_temp">
                <Trans i18nKey={'AIR.AIR_CURRENT_TEMPERATURE'} />
              </dt>
              <dd>
                <strong>{data.IAQ?.temperature ?? '--'}</strong>
                <span className="cw_unit">
                  {/* TODO: 섭씨/화씨(unit) 설정에 따라 동적으로 변경 필요 */}
                  °F
                </span>
              </dd>
              <dt className="cw_humidity">
                <Trans i18nKey={'AIR.AIR_CURRENT_HUMIDITY'} />
              </dt>
              <dd>
                <strong>{data.IAQ?.humidity ?? '--'}</strong>
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

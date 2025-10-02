import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { getIaqStatus } from '@/domain/air/helpers/airQuality.helpers';
import useGetAirDeviceHome from '@/domain/air/hooks/queries/useGetAirDeviceHome';
import { useDeviceUISpecByFamily } from '@/domain/device/hooks/useDeviceUISpecByFamily';
import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';
import { useTooltip } from '@/shared/hooks/useTooltip';
import cx from 'classnames';
import { Trans } from 'react-i18next';
import type { AirFeatures } from '../../types/features.types';

const AIR_QUALITY_LOADING = ['airGetAirDeviceHomeLoading'];

export const AirHomeMainQualityStatus = () => {
  const { deviceState, deviceCategory } = useDeviceContext();
  const airUISpec = useDeviceUISpecByFamily<AirFeatures>(
    deviceState?.prodCd,
    deviceCategory?.familyId,
  );

  // deviceUISpec이 undefined인 경우를 처리하는 가드 절 추가
  if (!airUISpec) {
    return; // 또는 null, 로딩 스켈레톤 등
  }

  const features = airUISpec.features;
  const { data, isLoading } = useGetAirDeviceHome(
    deviceState,
    AIR_QUALITY_LOADING,
  );
  const airStateTooltip = useTooltip<HTMLDListElement>();

  if (isLoading || !data) {
    return null; // Or a loading skeleton
  }

  const iaqStatus = getIaqStatus(features, {
    iaq: data.IAQ,
    prodStatus: data.prodStatus,
  });

  return (
    <>
      <LoadingLocalSpinner
        localLoadingKey={AIR_QUALITY_LOADING}
        as={'dl'}
        className="cw_todaystatus cw_air ultradust"
      >
        <dt>
          <Trans i18nKey={'AIR.ULTRAFINEDUST'} />
          <sub>
            {/* TODO: mainIndicator에 따라 동적으로 변경되도록 수정 필요 */}
            <Trans i18nKey={'AIR_SET_MARKET.AIR_PM25'} />
          </sub>
        </dt>
        <dd>
          <div className="cw_aircondition">
            <strong
              className={cx('cw_txt incwTxt', `cw_${iaqStatus.className}`)}
            >
              <span className={cx(iaqStatus.className)}>
                <Trans i18nKey={iaqStatus.i18nKey} />
              </span>
              <div className="value">
                {iaqStatus.value} {iaqStatus.unit}
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
      </LoadingLocalSpinner>
    </>
  );
};

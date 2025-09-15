import { useTooltip } from '@/shared/hooks/useTooltip';
import { Trans } from 'react-i18next';

export const AirHomeComponent = () => {
  const onClickHandlerAirGrapDetil = () => {};

  const airStateTooltip = useTooltip<HTMLDListElement>();

  return (
    <div className="cw_contbox02">
      <div className="cw_tit">
        <h3>
          <Trans i18nKey={'AIR.AIR_QUALITY'}></Trans>
        </h3>
        <button
          type="button"
          className="cw_btn_more01"
          onClick={onClickHandlerAirGrapDetil}
        >
          <span>
            <Trans i18nKey={'AIR.AIR_MORE_SEE'} />
          </span>
        </button>
      </div>
      <div className="cw_cont">
        <dl className="cw_todaystatus cw_air ultradust">
          <dt>
            <Trans i18nKey={'AIR.ULTRAFINEDUST'} />
            <sub>
              <Trans i18nKey={'AIR_SET_MARKET.AIR_PM25'} />
            </sub>
          </dt>
          <dd>
            <div className="cw_aircondition">
              <strong className="cw_txt incwTxt cw_good">
                <span className="good">
                  <Trans i18nKey={'WEATHER.GOOD'} />
                </span>
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
      </div>
    </div>
  );
};

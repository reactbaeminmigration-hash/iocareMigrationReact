import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';
import { useState } from 'react';
import { Trans } from 'react-i18next';
import useGetAirDeviceHome from '../../hooks/queries/useGetAirDeviceHome';
import { getDustPm10Info } from '../../utils/getDustPm10Data';

const AIR_IAQ_GRAPH_DETAIL_LOADING = ['airGetAirDeviceHomeLoading'];

export const AirHomeSubIaqPm10Gragh = () => {
  const { deviceState } = useDeviceContext();

  // dustpm10
  const { data: getDeviceData } = useGetAirDeviceHome(
    deviceState,
    AIR_IAQ_GRAPH_DETAIL_LOADING,
  );
  const { dustpm10, dustpm10Status, dustpm10StatusClass } = getDustPm10Info({
    IAQData: getDeviceData?.IAQ,
  });

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenToggleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <li className={isOpen ? 'cw_open' : ''}>
      <div
        // (click)="getAirqualityTime(2, 'fineDust');
        // helpPopUpControl('OFF', 'pm10')"
        className="cw_acc_tit"
      >
        <dl className="cw_dlist01">
          <div>
            <dt>
              <Trans i18nKey={'AIR.AIR_FINE_DUST'} />
              <sub>PM 10</sub>
            </dt>
          </div>
          <dd className={dustpm10StatusClass}>
            <strong>{dustpm10Status}</strong>
            <span className="cw_numvalue">
              {dustpm10}
              μg/m³
            </span>
          </dd>
        </dl>
        <button
          type="button"
          className="cw_btn_acc"
          onClick={handleOpenToggleClick}
        >
          <span>detail contents show/hide</span>
        </button>
      </div>
      <div className="cw_acc_cont">
        <div className="cw_graphtype_view">
          <LoadingLocalSpinner
            localLoadingKey={AIR_IAQ_GRAPH_DETAIL_LOADING}
            className="cw_graph02 fineDust"
          >
            <div className="cw_txt06">
              <span></span>
            </div>
            <div className="cw_graph_area">
              <div className="cw_legend cw_air01 cw_help_ui">
                <div>
                  <strong className="cw_max">
                    <span>
                      <Trans i18nKey={'AIR.INDOOR_MAX'} />
                    </span>
                  </strong>
                  <strong className="cw_legend_indoor">
                    <span>
                      <Trans i18nKey={'AIR.INDOOR_AVG'} />
                    </span>
                  </strong>
                  <strong className="cw_legend_outdoor">
                    <span>
                      <Trans i18nKey={'AIR.OUTDOOR_AVG'} />
                    </span>
                  </strong>
                  <button className="cw_btn_help02">
                    <span>Help</span>
                  </button>
                  <div className="cw_helpWrap cw_open">
                    <div className="cw_tt">
                      <h5>
                        <span>
                          <Trans i18nKey={'AIR.AIR_SHOW_TREND'} />
                        </span>
                      </h5>
                      <button type="button" className="cw_btn_popclose cw_st02">
                        <span>close</span>
                      </button>
                    </div>
                    <div className="cw_help_cont cw_breakword">
                      <dl>
                        <dt>
                          <Trans i18nKey={'AIR.INDOOR_MAX'} /> :{' '}
                        </dt>
                        <dd>
                          <Trans i18nKey={'AIR.HELP_MINUTE_IN_MAX'} />
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          <Trans i18nKey={'AIR.INDOOR_AVG'} /> :{' '}
                        </dt>
                        <dd>
                          <Trans i18nKey={'AIR.HELP_MINUTE_IN_AVG'} />
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          <Trans i18nKey={'AIR.OUTDOOR_AVG'} /> :{' '}
                        </dt>
                        <dd>
                          <Trans i18nKey={'AIR.HELP_MINUTE_OUT_AVG'} />
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cw_air_graph cw_noval">
                <div className="cw_y_axis">
                  <div>
                    <span className="cw_val">100</span>
                    <strong className="cw_txt_verybad">
                      <Trans i18nKey={'WEATHER.VERY_BAD'} />
                    </strong>
                  </div>
                  <div>
                    <span className="cw_val">75</span>
                    <strong className="cw_txt_bad">
                      <Trans i18nKey={'WEATHER.BAD'} />
                    </strong>
                  </div>
                  <div>
                    <span className="cw_val">50</span>
                    <strong className="cw_txt_normal">
                      <Trans i18nKey={'WEATHER.NORMAL'} />
                    </strong>
                  </div>
                  <div>
                    <span className="cw_val">25</span>
                    <strong className="cw_txt_good">
                      <Trans i18nKey={'WEATHER.GOOD'} />
                    </strong>
                  </div>
                </div>
                <div className="cw_graph_data">
                  <div id="fine_dust_time" style={{ minHeight: '133px' }}></div>
                  <div className="cw_x_axis">
                    <span className="cw_unit">
                      <Trans i18nKey={'AIR_REPORT.HOUR_DETAIL'} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </LoadingLocalSpinner>
          <p className="cw_txt06">
            <span>
              <Trans i18nKey={'AIR.AGGREGATION_TIME'} />
              <br />
              {/* {{ pm10Range }} */}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

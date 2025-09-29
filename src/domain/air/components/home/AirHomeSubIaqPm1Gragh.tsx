import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';
import { useTooltip } from '@/shared/hooks/useTooltip';
import cx from 'classnames';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import {
  getIaqPm25ConvertList,
  getOaqPm25ConvertList,
} from '../../helpers/iaqValueConverter.helper';
import useGetAirDeviceHome from '../../hooks/queries/useGetAirDeviceHome';
import useGetAirIaqDetail from '../../hooks/queries/useGetAirIaqDetail';
import { useAirChartOptions } from '../../hooks/useAirChartOptions';
import { useIaqGraphData } from '../../hooks/useIaqGraphHook';
import { getDustPm1State } from '../../utils/getAirQualityStatus';

const AIR_IAQ_GRAPH_DETAIL_LOADING = ['airGetAirDeviceHomeLoading'];

export const AirHomeSubIaqPm1Gragh = () => {
  const { deviceState } = useDeviceContext();

  // dustpm1
  const pm1GraghTooltip = useTooltip<HTMLDivElement>();
  const { data: getDeviceData } = useGetAirDeviceHome(
    deviceState,
    AIR_IAQ_GRAPH_DETAIL_LOADING,
    { enabled: true },
  );
  const { dustpm1, dustpm1Status, dustpm1StatusClass } = getDustPm1State({
    IAQData: getDeviceData?.IAQ,
  });
  const { data: iaqDetailData } = useGetAirIaqDetail(
    deviceState,
    6,
    AIR_IAQ_GRAPH_DETAIL_LOADING,
  );

  const { xAxisTime, inGraphData, outGraphData, inMaxGraphData, dateRange } =
    useIaqGraphData(
      iaqDetailData
        ? {
            list: iaqDetailData.list,
            rangeValue: 6,
            timeFlag: 'hour',
          }
        : undefined,
    );

  const seriesData = useMemo(() => {
    return [
      {
        name: 'maximum',
        type: 'scatter',
        color: '#ffa0a0',
        marker: {
          radius: 1,
          symbol: 'circle',
        },
        data: getOaqPm25ConvertList(inMaxGraphData),
      },
      {
        name: '실외',
        type: 'spline',
        color: '#c8c8c8',
        dashStyle: 'ShortDot',
        yAxis: 1,
        data: getOaqPm25ConvertList(outGraphData),
        _symbolIndex: 0,
      },
      {
        name: '실내',
        type: 'spline',
        color: '#2baaf2',
        data: getIaqPm25ConvertList(inGraphData),
        _symbolIndex: 1,
      },
    ];
  }, [inMaxGraphData, outGraphData, inGraphData]);
  console.log('mhlee132');
  console.log(seriesData);
  const chartOptions = useAirChartOptions({
    series: seriesData,
    xAxisTime,
    renderTo: 'fine_dust_time',
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
              <Trans i18nKey={'AIR.SUPERFINEDUST'} />
              <sub>PM 10</sub>
            </dt>
          </div>
          <dd className={dustpm1StatusClass}>
            <strong>{dustpm1Status}</strong>
            <span className="cw_numvalue">
              {dustpm1}
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
              <div
                ref={pm1GraghTooltip.containerRef}
                className={cx(
                  'cw_legend cw_air01 cw_help_ui',
                  pm1GraghTooltip.isOpen ? 'cw_help_open' : '',
                )}
              >
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
                  <button
                    className="cw_btn_help02"
                    onClick={pm1GraghTooltip.toggle}
                  >
                    <span>Help</span>
                  </button>
                  <div className="cw_helpWrap cw_open">
                    <div className="cw_tt">
                      <h5>
                        <span>
                          <Trans i18nKey={'AIR.AIR_SHOW_TREND'} />
                        </span>
                      </h5>
                      <button
                        type="button"
                        className="cw_btn_popclose cw_st02"
                        onClick={pm1GraghTooltip.toggle}
                      >
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
                  <div id="fine_dust_time" style={{ minHeight: '133px' }}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                    />
                  </div>
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
              {dateRange}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

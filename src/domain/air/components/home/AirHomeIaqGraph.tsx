import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';
import { useTooltip } from '@/shared/hooks/useTooltip';
import cx from 'classnames';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Trans } from 'react-i18next';
import useGetAirIaqDetail from '../../hooks/queries/useGetAirIaqDetail';
import { useIaqGraphData } from '../../hooks/useIaqGraphHook';

const AIR_IAQ_GRAPG_DETAIL_LOADING = ['airIaqGrapgDetailLoading'];

export const AirHomeIaqGraph = () => {
  const pm25GraghTooltip = useTooltip<HTMLDivElement>();
  const { deviceState } = useDeviceContext();
  let LocalLoadingKey = AIR_IAQ_GRAPG_DETAIL_LOADING;
  const { data: iaqDetailData, isLoading: isIaqDetailLoading } =
    useGetAirIaqDetail(deviceState, 3, LocalLoadingKey);

  const { xAxisTime, inGraphData, outGraphData, inMaxGraphData } =
    useIaqGraphData(
      iaqDetailData && {
        list: iaqDetailData.list,
        rangeValue: 6,
        timeFlag: 'hour',
      },
    );

  if (isIaqDetailLoading || !iaqDetailData) {
    return null; // Or a loading skeleton
  }

  console.log(xAxisTime);
  console.log(inGraphData);
  console.log(outGraphData);
  console.log(inMaxGraphData);

  const data = [
    {
      name: 'maximum',
      type: 'scatter',
      color: '#ffa0a0',
      marker: {
        radius: 1,
        symbol: 'circle',
      },
      data: [],
    },
    {
      name: '실외',
      type: 'spline',
      color: '#c8c8c8',
      dashStyle: 'ShortDot',
      yAxis: 1,
      data: [
        6,
        6,
        6,
        6,
        6,
        6,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        6,
        6,
        6,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
      ],
      _symbolIndex: 0,
    },
    {
      name: '실내',
      type: 'spline',
      color: '#2baaf2',
      data: [],
      _symbolIndex: 1,
    },
  ];

  const options = {
    chart: {
      renderTo: 'all_air_time',
      type: 'spline',
      height: 133,
      margin: [0, 10, 20, 0],
    },
    title: {
      text: '',
    },
    xAxis: {
      tickInterval: 6,
      categories: xAxisTime,
      lineColor: '#616161',
      lineWidth: 2,
      tickWidth: 0,
      showFirstLabel: true,
      labels: {
        y: 16,
        style: {
          color: '#616161',
          fontFamily: 'NanumSquareBold',
          fontSize: 12,
        },
      },
    },
    yAxis: [
      {
        title: {
          enabled: false,
        },
        labels: {
          enabled: false,
        },
        gridLineColor: '#eeeeee',
        tickPositions: [0, 25, 50, 75, 100],
        tickInterval: 25,
        max: 100,
        showFirstLabel: false,
      },
      {
        title: {
          enabled: false,
        },
        tickPositions: [0, 25, 50, 75, 100],
        tickInterval: 25,
        max: 100,
        opposite: true,
      },
    ],
    plotOptions: {
      spline: {
        lineWidth: 2,
        label: {
          enabled: true,
          connectorAllowed: false,
        },
        marker: {
          enabled: false,
        },
        color: 'red',
        enableMouseTracking: false,
      },
      scatter: {
        enableMouseTracking: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: data,
    legend: {
      enabled: false,
      align: 'right',
      y: 20,
    },
    exporting: {
      enabled: false,
    },
  };

  return (
    <div className="cw_accWrap02">
      <ul>
        <li>
          <LoadingLocalSpinner
            localLoadingKey={AIR_IAQ_GRAPG_DETAIL_LOADING}
            className="cw_graph02"
          >
            <div className="cw_txt06">
              <span></span>
            </div>
            <div className="cw_graph_area">
              <div
                ref={pm25GraghTooltip.containerRef}
                className={cx(
                  'cw_legend cw_air01 cw_help_ui',
                  pm25GraghTooltip.isOpen ? 'cw_help_open' : '',
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
                    onClick={pm25GraghTooltip.toggle}
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
                        onClick={pm25GraghTooltip.toggle}
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
                  <div id="all_air_time" style={{ minHeight: '133px' }}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options}
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
            </span>
          </p>
          <div className="cw_acc_cont">
            <div className="cw_graphtype_view"></div>
          </div>
          {/* 여기부 부터 시작 */}
        </li>
      </ul>
    </div>
  );
};

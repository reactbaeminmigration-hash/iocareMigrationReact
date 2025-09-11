import { t } from 'i18next';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { type AxisLabelsFormatterContextObject } from 'highcharts';
import useGetWaterDailyReport from '../queries/useGetWaterDailyReport';
import type { WaterReportParams } from '../types/waterReportPublished.types';

type Props = { params: WaterReportParams };

export default function WaterDailyReportCard({ params }: Props) {
  const { devId, reportDate, resetDttm, isNoDate } = params;
  const { data: dailyAmt } = useGetWaterDailyReport(
    {
      devId,
      reportDate,
      resetDttm,
    },
    { enabled: isNoDate === false },
  );

  const dayList: number[] = Array.from(
    { length: Number(dailyAmt?.dailyLastDay) || 0 },
    (_, i) => i + 1,
  );

  const getMax = (numArr: number[] | undefined, lineCnt: number) => {
    const n = Math.max(1, lineCnt);
    const m = Math.max(...(numArr?.length ? numArr : [0]));
    return Math.ceil(Math.ceil(m) / n) * n;
  };

  const dayAvgUse = (arr: number[] | undefined) => {
    const index = (arr ?? []).filter((v) => v > 0);
    if (index.length === 0) return 0; // 모두 0이면 0으로
    const sum = index.reduce((a, b) => a + b, 0);
    const avg = sum / index.length;
    return Math.ceil(avg * 10) / 10;
  };

  // HighChart Options
  const options = {
    chart: {
      type: 'areaspline',
      margin: [20, 10, 20, 30],
      height: 150,
    },
    title: {
      text: '',
    },
    xAxis: {
      title: {
        enabled: false,
      },
      lineColor: '#616161',
      lineWidth: 2,
      tickWidth: 0,
      labels: {
        y: 16,
        style: {
          color: '#616161',
          fontFamily: 'NanumSquareBold',
          fontSize: 12,
        },
      },
      max: dayList.length,
      categories: dayList,
      tickInterval: 6,
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        x: -8,
        y: 3,
        formatter: function (this: AxisLabelsFormatterContextObject) {
          return Number(this.value) + 'ℓ';
        },
        style: {
          color: '#bdbdbd',
          fontFamily: 'NanumSquareBold',
          fontSize: 12,
        },
      },
      max: getMax(dailyAmt?.dailyWatQntList, 2),
      tickAmount: 3,
      zIndex: 50,
      gridLineColor: '#eeeeee',
    },
    plotOptions: {
      areaspline: {
        lineWidth: 0,
        label: {
          enabled: false,
          connectorAllowed: false,
        },
        marker: {
          enabled: false,
        },
        color: '#2baaf2',
        fillOpacity: 0.3,
        enableMouseTracking: false,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        data: Array.isArray(dailyAmt?.dailyWatQntList)
          ? dailyAmt!.dailyWatQntList
          : [],
        showInLegend: false,
      },
    ],
  };

  return (
    <li className="cw_overall cw_open">
      {/* title */}
      <div className="cw_acc_tit">
        <h4 className="cw_tt">
          <span>{t('WATER_DETAIL.WATER_DETAIL_MONTHLY_USE')}</span>
        </h4>
        <button type="button" className="cw_btn_acc"></button>
      </div>
      {/* contents */}
      <div className="cw_acc_cont dailyUse">
        <div className="cw_graphWrap">
          <dl>
            <dt>
              <span>{t('WATER_DETAIL.WATER_DETAIL_DAILY_AVERAGE')}</span>
            </dt>
            <dd>
              <span>{dayAvgUse(dailyAmt?.dailyWatQntList)} </span>
              <span className="cw_unit">ℓ</span>
            </dd>
          </dl>
          <div className="cw_graph_area" id="day_use_graph">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </li>
  );
}

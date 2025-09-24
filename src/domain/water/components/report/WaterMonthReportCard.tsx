import { t } from 'i18next';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { type AxisLabelsFormatterContextObject } from 'highcharts';
import type { WaterReportParams } from '../../types/waterReportPublished.types';
import { Button } from '@/shared/components/Button';
import useGetWaterMonthReport from '../../queries/useGetWaterMonthReport';

type Props = { params: WaterReportParams };

export default function WaterMonthReportCard({ params }: Props) {
  const { devId, reportDate, resetDttm, isNoDate } = params;
  const { data: monthQnt } = useGetWaterMonthReport(
    {
      devId,
      reportDate,
      resetDttm,
      drinkUnit: 'ml',
    },
    { enabled: isNoDate === false },
  );

  const converMilL = (liters: number) => {
    return Math.ceil((liters / 1000) * 10) / 10;
  };

  // HighChart Options
  const options = {
    chart: {
      type: 'column',
      margin: [10, 20, 20, 35],
      height: 140,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: monthQnt?.monthList?.map((m) => `${Number(m)}월`) ?? [],
      title: {
        enabled: false,
      },
      lineColor: '#616161',
      lineWidth: 2,
      labels: {
        y: 16,
        style: {
          color: '#616161',
          fontFamily: 'NanumSquareBold',
          fontSize: 12,
        },
        autoRotation: false,
      },

      gridLineWidth: 0,
      gridLineColor: '#eeeeee',
      tickWidth: 0,
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        x: -8,
        y: 3,
        formatter: function (this: AxisLabelsFormatterContextObject) {
          return Number(this.value) / 1000 + 'ℓ';
        },
        style: {
          color: '#bdbdbd',
          fontFamily: 'NanumSquareBold',
          fontSize: 10,
          width: '50px',
        },
      },
      tickAmount: 6,
      stackLabels: {
        enabled: true,
        formatter: function (this: Highcharts.StackItemObject) {
          return converMilL(this.total) + 'ℓ';
        },
        style: {
          color: '#616161',
          fontFamily: 'NanumSquareBold',
          fontSize: 10,
        },
      },
      lineWidth: 0,
      lineColor: '#fff',
      gridLineColor: '#eeeeee',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
      },
      y: 52,
    },
    legend: {
      itemDistance: 10,
      enabled: false,
      itemStyle: {
        color: '#8e8e93',
        fontSize: '10px',
      },
      align: 'right',
      verticalAlign: 'top',
      floating: false,
      y: -10,
      x: 10,
      symbolRadius: 0,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        type: 'column',
        name: '냉수',
        data: monthQnt?.coldWatList ?? [],
        color: '#6bc5f8',
      },
      {
        type: 'column',
        name: '정수',
        data: monthQnt?.cleanWatList ?? [],
        color: '#7adfcd',
      },
      {
        type: 'column',
        name: '온수',
        data: monthQnt?.hotWatList ?? [],
        color: '#ffcc89',
      },
    ],
  };

  return (
    <li className="cw_overall cw_open">
      {/* title */}
      <div className="cw_acc_tit">
        <h4 className="cw_tt">
          <span>{t('WATER_DETAIL.WATER_DETAIL_6MONTHLY_USE')}</span>
        </h4>
        <Button className="cw_btn_acc" children />
      </div>
      {/* contents */}
      <div className="cw_acc_cont monthlyUse">
        <div className="cw_column cw_st02">
          <dl>
            <dt>
              <span>
                {monthQnt?.monthList?.at(-1)}
                {t('WATER_DETAIL.WATER_DETAIL_MONTH_WATUSE')}
              </span>
            </dt>
            <dd>
              <span>{converMilL(monthQnt?.thisMonthQnt ?? 0)}</span>
              <span className="cw_unit"> ℓ</span>
            </dd>
          </dl>
          <dl>
            <dt>
              <span>
                {t('WATER_DETAIL.WATER_DETAIL_MONTH_AVERAGE')}
                <br />
                {t('WATER_DETAIL.WATER_DETAIL_6MONTHLY_WATUSE')}
              </span>
            </dt>
            <dd>
              <span>{converMilL(monthQnt?.avgMonthQnt ?? 0)}</span>
              <span className="cw_unit"> ℓ</span>
            </dd>
          </dl>
        </div>
        <div className="cw_graph_area">
          <div id="month_use_wgraph">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div className="cw_legend cw_water01">
            <strong className="cw_legend_cold">
              <span>{t('CON.FILTER_TERM.len2')}</span>
            </strong>
            <strong className="cw_legend_normal">
              <span>{t('CON.FILTER_TERM.len3')}</span>
            </strong>
            <strong className="cw_legend_hot">
              <span>{t('CON.FILTER_TERM.len4')}</span>
            </strong>
          </div>
          <div className="cw_r_btn">
            <a className="cw_btn_more01"></a>
          </div>
        </div>
      </div>
    </li>
  );
}

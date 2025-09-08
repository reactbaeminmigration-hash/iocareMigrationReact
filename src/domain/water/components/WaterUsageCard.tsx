import { t } from 'i18next';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { type AxisLabelsFormatterContextObject } from 'highcharts';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import useGetWaterUsage from '../queries/useGetWaterUsage';

export default function WaterUsageCard() {
  const waterHomeInfos = useDeviceStore((s) => s.lastSelectedDeviceInfos);
  const { data: waterUsage } = useGetWaterUsage(
    {
      devId: waterHomeInfos.barcode,
      comType: waterHomeInfos.comType,
      orderNo: waterHomeInfos.ordNo,
      prodName: waterHomeInfos.prodName,
      resetDttm: waterHomeInfos.resetDttm,
      sellType: waterHomeInfos.sellTypeCd,
      membershipYn: waterHomeInfos.membershipYn,
      selfYn: waterHomeInfos.selfManageYn,
    },
    { enabled: !!waterHomeInfos },
  );

  let totalWat = waterUsage?.sumWatList.reduce((pre, value) => pre + value, 0);
  let yLableVal = 3;
  let yStcLabelVal = 0;
  let yGridLineWidth = 1;
  if (totalWat == 0) {
    yLableVal = 63;
    yStcLabelVal = 62;
    yGridLineWidth = 0;
  }

  // HighChart Options
  const options = {
    chart: {
      type: 'column',
      margin: [10, 20, 20, 52],
      height: 150,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: waterUsage?.dayList,
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
      stackLabels: {
        style: {
          color: '#52535a',
          fontSize: 10,
        },
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
        y: yLableVal,
        formatter: function (this: AxisLabelsFormatterContextObject) {
          return Number(this.value).toFixed(1) + 'ℓ';
        },
        style: {
          color: '#bdbdbd',
          fontFamily: 'NanumSquareBold',
          fontSize: 10,
        },
      },
      stackLabels: {
        enabled: true,
        format: '{total:.1f}ℓ',
        style: {
          color: '#616161',
          fontFamily: 'NanumSquareBold',
          fontSize: 10,
        },
        y: yStcLabelVal,
      },
      lineColor: '#fff',
      gridLineColor: '#eeeeee',
      gridLineWidth: yGridLineWidth,
    },
    plotOptions: {
      series: {
        animation: false,
      },
      column: {
        stacking: 'normal',
        borderWidth: 0,
        dataLabels: {
          enabled: false,
          format: '{y:.1f}ℓ',
          style: {
            color: '#616161',
            fontFamily: 'NanumSquareBold',
            fontSize: 10,
          },
        },
      },
      y: 52,
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
        type: 'column',
        name: '냉수',
        data: waterUsage?.coldWatList,
        color: '#6bc5f8',
      },
      {
        type: 'column',
        name: '정수',
        data: waterUsage?.cleanWatList,
        color: '#7adfcd',
      },
      {
        type: 'column',
        name: '온수',
        data: waterUsage?.hotWatList,
        color: '#ffcc89',
      },
    ],
  };

  return (
    <div className="cw_contbox02">
      <div className="cw_tit">
        <h3>{t('TIT.WATER_USE')}</h3>
      </div>
      <div className="cw_cont waterLoad">
        <div>
          <dl className="cw_todaystatus cw_water">
            <dt>{t('CON.TODAY_WATUSE')}</dt>
            <dd>
              <span>{waterUsage?.usageToday}</span>{' '}
              <span className="unit">ℓ</span>
            </dd>
          </dl>
          <div className="cw_tit01">
            <h3 className="cw_tt">{t('CON.WATTYPE_OF_USE')}</h3>
          </div>
          <div className="cw_graph_area" id="cw_graph_area">
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
        </div>
        <p className="cw_txt06">{t('HIDDEN.GRAPH_INFO')}</p>
        <p className="cw_subtxt01 cw_hide">{t('HIDDEN.DATA_FAIL')}</p>
      </div>
    </div>
  );
}

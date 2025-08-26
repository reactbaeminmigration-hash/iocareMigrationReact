import Highcharts, {
  type Options,
  type AxisLabelsFormatterContextObject,
  type SeriesColumnOptions,
} from 'highcharts';
import type { watUsageDaily } from '../types/watUsageDaily';

export function useWaterUsageChart(d: watUsageDaily) {
  const series: SeriesColumnOptions[] = [
    { type: 'column', name: '냉수', data: d.coldWatList, color: '#6bc5f8' },
    { type: 'column', name: '정수', data: d.cleanWatList, color: '#7adfcd' },
    { type: 'column', name: '온수', data: d.hotWatList, color: '#ffcc89' },
  ];

  // stackLabels formatter 컨텍스트용 로컬 타입 (total 사용)
  type StackCtx = { total?: number };

  const options: Options = {
    chart: {
      type: 'column',
      margin: [10, 20, 20, 40],
      backgroundColor: '#ffffff',
    },
    title: { text: '' },
    xAxis: {
      categories: d.dayList,
      title: { text: undefined }, // enabled 대신 text: undefined
      lineColor: '#616161',
      lineWidth: 2,
      labels: {
        y: 16,
        style: {
          color: '#616161',
          fontFamily: 'NanumSquareBold',
          fontSize: 12,
        },
        autoRotation: [], // boolean X, number[] 또는 생략
      },
      gridLineWidth: 0,
      gridLineColor: '#eeeeee',
      tickWidth: 0,
    },
    yAxis: {
      title: { text: undefined },
      labels: {
        x: -8,
        y: 3,
        formatter(this: AxisLabelsFormatterContextObject) {
          const v = Number(this.value as number);
          // ✅ string만 반환
          return v >= 10 ? String(Math.floor(v)) : v.toFixed(1);
        },
        style: {
          color: '#bdbdbd',
          fontFamily: 'NanumSquareBold',
          fontSize: 10,
        },
      },
      tickInterval: 1,
      stackLabels: {
        enabled: true,
        formatter(this: StackCtx) {
          const total = Number(this.total ?? 0);
          // ✅ string 반환
          return total.toFixed(1);
        },
        style: {
          color: '#616161',
          fontFamily: 'NanumSquareBold',
          fontSize: 10,
        },
        y: 52,
      },
      lineWidth: 0,
      lineColor: '#fff',
      gridLineColor: '#eeeeee',
      gridLineWidth: 1,
    },
    plotOptions: {
      column: { stacking: 'normal', borderWidth: 0 },
    },
    tooltip: { enabled: false },
    credits: { enabled: false },
    // ✅ 타입 만족
    series: series as Highcharts.SeriesOptionsType[],
    legend: { enabled: false },
  };

  // renderTo 없이 두-인자 오버로드 사용
  Highcharts.chart('waterAmount', options);
}
